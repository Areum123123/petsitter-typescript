import { User } from "../models/auth";
import { prisma } from "../utils/prisma.util";

export class AuthRepository {
  // 회원가입
  register = async (
    email: string,
    hashedPassword: string,
    name: string,
    phone_number: string,
    address: string
  ): Promise<User> => {
    const registered = await prisma.users.create({
      data: {
        email,
        password: hashedPassword,
        name,
        phone_number,
        address,
      },
    });
    return registered;
  };

  // 이메일로 사용자 조회
  findUserByEmail = async (email: string): Promise<User | null> => {
    const user = await prisma.users.findFirst({
      where: { email },
    });
    return user;
  };

  //토큰 재발급
  upsertRefreshToken = async (
    userId: number,
    hashedRefreshToken: string
  ): Promise<void> => {
    await prisma.refresh_tokens.upsert({
      where: { user_id: +userId },
      update: {
        refresh_token: hashedRefreshToken,
      },
      create: {
        user_id: +userId,
        refresh_token: hashedRefreshToken,
      },
    });
  };

  //로그아웃
  logout = async (userId: Number): Promise<void> => {
    await prisma.refresh_tokens.delete({
      where: { user_id: +userId },
    });
  };
}
