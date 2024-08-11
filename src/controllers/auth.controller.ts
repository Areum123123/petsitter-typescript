import { Request, Response, NextFunction } from "express";
//import { AuthRepository } from '../repositories/auth.repository';
import { AuthService } from "../services/auth.service";
import { login, SingupResponse } from "../models/auth";

export class AuthController {
  private authService = new AuthService(); // AuthService 클래스 타입

  //   private authService: AuthService; // AuthService 클래스 타입

  //   constructor() {
  //     this.authService = new AuthService();
  //   }

  // 회원가입 API
  register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { email, password, name, phone_number, address }: SingupResponse =
        req.body;

      // AuthService의 register 메소드 호출
      const registered = await this.authService.register(
        email,
        password,
        name,
        phone_number,
        address
      );

      // 성공적인 회원가입 응답 반환
      return res.status(201).json({
        status: 201,
        message: "회원 가입이 성공적으로 완료되었습니다.",
      });
    } catch (err) {
      // 에러 핸들링 미들웨어로 전달
      next(err);
    }
  };

  //로그인
  login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { email, password }: login = req.body;
      const { accessToken, refreshToken } = await this.authService.login(
        email,
        password
      );

      return res.status(200).json({
        status: 200,
        message: "로그인 성공했습니다.",
        accessToken,
        refreshToken,
      });
    } catch (err) {
      next(err);
    }
  };

  //토큰재발급
  refreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    // req.user가 undefined인지 확인
    if (!req.user) {
      return res.status(401).json({
        status: 401,
        message: "사용자 정보가 없습니다.",
      });
    }

    const userId = req.user.id;
    try {
      const tokens = await this.authService.refreshToken(+userId);

      return res.status(200).json({
        status: 200,
        message: "토큰 재발급에 성공했습니다.",
        ...tokens,
      });
    } catch (err) {
      next(err);
    }
  };
  //로그아웃
  logout = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    // req.user가 undefined인지 확인
    if (!req.user) {
      return res.status(401).json({
        status: 401,
        message: "사용자 정보가 없습니다.",
      });
    }

    const userId = req.user.id;
    try {
      const logout = await this.authService.logout(userId);

      return res.status(200).json({
        status: 200,
        message: "로그아웃 되었습니다.",
        ID: `${userId}`,
      });
    } catch (err) {
      next(err);
    }
  };
}
