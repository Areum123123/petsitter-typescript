import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: Error & { status?: number; code?: string },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  // JSON 파싱 오류 처리
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      status: 400,
      message: "별점을 입력해주세요.",
    });
  }

  // Joi에서 발생한 에러 처리
  switch (err.message) {
    case "이미 가입 된 사용자입니다.":
      return res.status(409).json({
        status: 409,
        message: err.message,
      });
    case "비밀번호가 일치하지 않습니다.":
      return res.status(401).json({
        status: 401,
        message: err.message,
      });
    case "사용자를 찾을 수 없습니다.":
    case "예약 정보가 존재하지 않습니다.":
    case "펫시터를 찾을 수 없습니다":
    case "리뷰가 존재하지 않습니다.":
      return res.status(404).json({
        status: 404,
        message: err.message,
      });
    case "해당 날짜는 이미 예약되어 있습니다.":
      return res.status(400).json({
        status: 400,
        message: err.message,
      });
    case "예약 상태를 변경할 권한이 없습니다.":
      return res.status(403).json({
        status: 403,
        message: err.message,
      });
  }

  // Prisma의 P2002 오류 처리
  if (err.code === "P2002") {
    return res.status(400).json({
      status: 400,
      message: "이미 같은 날짜에 해당 펫시터에 대한 예약이 존재합니다.",
    });
  }

  // Prisma의 P2025 오류 처리
  if (err.code === "P2025") {
    return res.status(404).json({
      status: 404,
      message: `해당 사용자의 refresh_token을 찾을 수 없습니다.`,
    });
  }

  // 그 밖의 예상치 못한 에러 처리
  return res.status(500).json({
    status: 500,
    message: "예상치 못한 에러가 발생했습니다. 관리자에게 문의해 주세요.",
  });
};
