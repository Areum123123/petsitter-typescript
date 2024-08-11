import { TokenResponse } from "../models/auth";
import { AuthRepository } from "../repositories/auth.repository";
import {
  ACCESS_TOKEN_SECRET_KEY,
  REFRESH_TOKEN_SECRET_KEY,
} from "../constant/env.constant";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../utils/prisma.util";
import { SingupResponse } from "../models/auth";

export class AuthService {
  private authRepository = new AuthRepository();

  //   private authRepository: AuthRepository;

  //   constructor() {
  //     this.authRepository = new AuthRepository();
  //   }

  // 회원가입
  register = async (
    email: string,
    password: string,
    name: string,
    phone_number: string,
    address: string
  ): Promise<SingupResponse> => {
    try {
      const isExistUser = await this.authRepository.findUserByEmail(email);

      if (isExistUser) {
        throw new Error("이미 가입 된 사용자입니다.");
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const registered = await this.authRepository.register(
        email,
        hashedPassword,
        name,
        phone_number,
        address
      );

      return registered;
    } catch (err) {
      throw err;
    }
  };

  //로그인
  login = async (email: string, password: string): Promise<TokenResponse> => {
    try {
      const user = await this.authRepository.findUserByEmail(email);

      if (!user) {
        throw new Error("사용자를 찾을 수 없습니다.");
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new Error("비밀번호가 일치하지 않습니다.");
      }
      //사용자에게 access token 발급
      const accessToken = jwt.sign(
        {
          id: user.id,
        },
        ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: "12h" }
      );

      //refresh토큰  발급
      const refreshToken = jwt.sign(
        {
          id: user.id,
        },

        REFRESH_TOKEN_SECRET_KEY,
        { expiresIn: "7d" }
      );

      //refresh 토큰 저장(hash 값으로 저장)
      const hashedRefreshToken = bcrypt.hashSync(refreshToken, 10);

      //refresh 토큰 생성 또는 갱신 upsert() 있으면 update 없으면 create
      await prisma.refresh_tokens.upsert({
        where: {
          user_id: user.id,
        },
        update: {
          refresh_token: hashedRefreshToken,
        },
        create: {
          user_id: user.id,
          refresh_token: hashedRefreshToken,
        },
      });

      return { accessToken, refreshToken };
    } catch (err) {
      throw err;
    }
  };

  //토큰 재발급

  refreshToken = async (userId: number): Promise<TokenResponse> => {
    const payload = { id: userId };

    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET_KEY, {
      expiresIn: "12h",
    });

    const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET_KEY, {
      expiresIn: "7d",
    });

    const hashedRefreshToken = bcrypt.hashSync(refreshToken, 10);

    await this.authRepository.upsertRefreshToken(+userId, hashedRefreshToken);

    return {
      accessToken,
      refreshToken,
    };
  };

  //로그아웃
  logout = async (userId: Number): Promise<void> => {
    await this.authRepository.logout(userId);
  };
}
