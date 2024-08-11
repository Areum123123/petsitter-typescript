import { Request, Response, NextFunction } from "express";
import { prisma } from "../utils/prisma.util"; // 경로 확인 필요
import { Role } from "@prisma/client"; // Prisma에서 정의된 Role 타입 가져오기

export const adminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?.id;

  try {
    if (!userId) {
      return res
        .status(401)
        .json({ status: 401, message: "사용자 ID가 없습니다." });
    }
    const user = await prisma.users.findFirst({
      where: { id: userId },
    });

    if (!user || user.role !== Role.ADMIN) {
      return res.status(403).json({
        status: 403,
        message: "해당 작업에 대한 권한이 없습니다.",
      });
    }

    next();
  } catch (err) {
    next(err);
  }
};
