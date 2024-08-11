import { LogService } from "../services/reservation-logs.service";
import { Request, Response, NextFunction } from "express";

export class LogController {
  private logService = new LogService();

  getLogs = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const reservationLogs = await this.logService.getLogs();

      return res.status(200).json({
        status: 200,
        message: "예약 로그 목록 조회 성공!",
        data: reservationLogs,
      });
    } catch (err) {
      next(err);
    }
  };
}
