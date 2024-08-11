"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const reservation_controller_1 = require("../controllers/reservation.controller");
const reservation_validator_1 = require("../validators/reservation.validator");
const update_reservation_validator_1 = require("../validators/update-reservation.validator");
const admin_middleware_1 = require("../middlewares/admin.middleware");
const update_status_validator_1 = require("../validators/update-status.validator");
const reservationRouter = express_1.default.Router();
const reservationController = new reservation_controller_1.ReservationController();
//예약생성 API
reservationRouter.post("/", auth_middleware_1.default, reservation_validator_1.reservationValidator, reservationController.createBooking);
//예약 목록 조회 API
reservationRouter.get("/", auth_middleware_1.default, reservationController.getReservations);
//예약 상세 조회 API
reservationRouter.get("/:reservationId", auth_middleware_1.default, reservationController.getReservationById);
//예약변경API
reservationRouter.patch("/:reservationId", auth_middleware_1.default, update_reservation_validator_1.updateReservationValidator, reservationController.updateReservation);
//예약취소 - 취소시 log 기록 트랜잭션
reservationRouter.delete("/:reservationId", auth_middleware_1.default, reservationController.cancelReservation);
//예약상태변경 API[  PENDING ,CONFIRMED ,COMPLETED ,CANCELED   ]
reservationRouter.patch("/:reservationId/status", auth_middleware_1.default, admin_middleware_1.adminMiddleware, update_status_validator_1.updateStatusValidator, reservationController.updateStatus);
exports.default = reservationRouter;
