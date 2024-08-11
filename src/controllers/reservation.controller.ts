import { Request, Response, NextFunction } from "express-serve-static-core";
import { ReservationService } from "../services/reservation.service";
import { Role } from "@prisma/client";

export class ReservationController {
  private reservationService = new ReservationService();

  createBooking = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res
          .status(401)
          .json({ status: 401, message: "사용자 ID가 없습니다." });
      }
      const {
        pet_sitter_id,
        dog_name,
        dog_breed,
        dog_age,
        dog_weight,
        request_details,
        booking_date,
      } = req.body;

      const createdBooking = await this.reservationService.createBooking(
        userId,
        pet_sitter_id,
        dog_name,
        dog_breed,
        dog_age,
        dog_weight,
        request_details,
        booking_date
      );

      return res.status(201).json({
        status: 201,
        message: "예약이 접수 되었습니다. 펫시터의 승인을 기다리고 있습니다.",
        data: createdBooking,
      });
    } catch (err) {
      next(err);
    }
  };

  //예약목록 조회
  getReservations = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const userId = req.user?.id;
      const role = req.user?.role ?? Role.USER;

      if (!userId) {
        return res
          .status(401)
          .json({ status: 401, message: "사용자가 존재하지 않습니다. " });
      }

      const reservations = await this.reservationService.getReservations(
        userId,
        role
      );

      return res.status(200).json({
        status: 200,
        message: "예약 조회에 성공했습니다.",
        data: reservations,
      });
    } catch (err) {
      next(err);
    }
  };

  //예약상세조회
  getReservationById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { reservationId } = req.params;
      const userId = req.user?.id;
      const role = req.user?.role ?? Role.USER;

      if (!userId) {
        return res
          .status(401)
          .json({ status: 401, message: "사용자가 존재하지 않습니다. " });
      }
      const reservation = await this.reservationService.getReservationById(
        +reservationId,
        userId,
        role
      );

      if (!reservation) {
        return res.status(404).json({
          status: 404,
          message: "해당 예약 ID가 존재하지 않습니다.",
          data: [],
        });
      }

      return res.status(200).json({
        status: 200,
        message: "예약 상세조회에 성공했습니다.",
        data: reservation,
      });
    } catch (err) {
      next(err);
    }
  };

  //예약변경
  updateReservation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const userId = req.user?.id;
      const { reservationId } = req.params;
      const {
        dog_name,
        dog_breed,
        dog_age,
        dog_weight,
        request_details,
        booking_date,
      } = req.body;

      if (!userId) {
        return res
          .status(401)
          .json({ status: 401, message: "사용자가 존재하지 않습니다. " });
      }
      // 서비스 호출
      const updatedReservation =
        await this.reservationService.updateReservation(
          +userId, // 변환 확인
          +reservationId, // 변환 확인
          dog_name,
          dog_breed,
          dog_age,
          dog_weight,
          request_details,
          booking_date
        );

      return res.status(200).json({
        status: 200,
        message: "예약 수정에 성공했습니다.",
        data: updatedReservation,
      });
    } catch (err) {
      next(err); // 오류를 다음 미들웨어로 전달
    }
  };

  //예약취소
  cancelReservation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const userId = req.user?.id;
      const { reservationId } = req.params;
      const { reason } = req.body;

      if (!userId) {
        return res
          .status(401)
          .json({ status: 401, message: "사용자가 존재하지 않습니다. " });
      }
      //정리하기
      if (!reason || typeof reason !== "string" || reason.trim() === "") {
        return res.status(400).json({
          status: 400,
          message: "취소 사유는 필수 입력 항목입니다.",
        });
      }

      const result = await this.reservationService.cancelReservation(
        +userId,
        +reservationId,
        reason
      );

      return res.status(200).json({
        status: 200,
        message: "예약이 성공적으로 취소되었습니다.",
        reservationId: `${reservationId}`,
      });
    } catch (err) {
      next(err);
    }
  };

  //예약 상태(status) 변경
  updateStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const { reservationId } = req.params;
    const { new_status, reason } = req.body;
    const userId = req.user?.id;
    try {
      if (!userId) {
        return res
          .status(401)
          .json({ status: 401, message: "사용자가 존재하지 않습니다. " });
      }
      const updatedReservation = await this.reservationService.updateStatus(
        +userId,
        +reservationId,
        new_status,
        reason
      );
      return res.status(200).json({
        status: 200,
        message: "예약 상태가 성공적으로 변경되었습니다.",
        data: updatedReservation,
      });
    } catch (err) {
      next(err);
    }
  };
}
