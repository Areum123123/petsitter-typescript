import express from "express";
import authMiddleware from "../middlewares/auth.middleware";
import { ReservationController } from "../controllers/reservation.controller";
import { reservationValidator } from "../validators/reservation.validator";
import { updateReservationValidator } from "../validators/update-reservation.validator";
import { adminMiddleware } from "../middlewares/admin.middleware";
import { updateStatusValidator } from "../validators/update-status.validator";

const reservationRouter = express.Router();
const reservationController = new ReservationController();

//예약생성 API
reservationRouter.post(
  "/",
  authMiddleware,
  reservationValidator,
  reservationController.createBooking
);

//예약 목록 조회 API
reservationRouter.get(
  "/",
  authMiddleware,
  reservationController.getReservations
);

//예약 상세 조회 API
reservationRouter.get(
  "/:reservationId",
  authMiddleware,
  reservationController.getReservationById
);

//예약변경API
reservationRouter.patch(
  "/:reservationId",
  authMiddleware,
  updateReservationValidator,
  reservationController.updateReservation
);

//예약취소 - 취소시 log 기록 트랜잭션
reservationRouter.delete(
  "/:reservationId",
  authMiddleware,
  reservationController.cancelReservation
);

//예약상태변경 API[  PENDING ,CONFIRMED ,COMPLETED ,CANCELED   ]
reservationRouter.patch(
  "/:reservationId/status",
  authMiddleware,
  adminMiddleware,
  updateStatusValidator,
  reservationController.updateStatus
);

export default reservationRouter;
