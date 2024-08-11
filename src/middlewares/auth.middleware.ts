import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "../utils/prisma.util.js";
import { Request, Response, NextFunction } from "express";

// 타입 선언: jwt.verify로 반환되는 decodedToken의 타입을 정의
interface DecodedToken extends JwtPayload {
  id: number; // jwt payload에서 id는 숫자 타입이라고 가정
}

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authorization = req.headers["authorization"];
    if (!authorization) throw new Error("인증 정보가 없습니다.");

    const [tokenType, token] = authorization.split(" ");
    if (tokenType !== "Bearer")
      throw new Error("지원하지 않는 인증 방식입니다.");

    // JwtPayload를 extends한 DecodedToken 타입을 사용
    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET_KEY as string
    ) as DecodedToken;
    const userId = decodedToken.id;

    const user = await prisma.users.findFirst({
      where: { id: +userId },
    });

    if (!user) {
      throw new Error("인증 정보와 일치하는 사용자가 없습니다.");
    }

    req.user = user;

    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "인증 정보가 만료되었습니다." });
    } else if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "인증정보가 유효하지 않습니다." });
    } else {
      return res.status(401).json({
        message: (err as Error).message ?? "인증 정보가 유효하지 않습니다.",
      });
    }
  }
}
