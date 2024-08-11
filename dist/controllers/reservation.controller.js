"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationController = void 0;
const reservation_service_1 = require("../services/reservation.service");
const client_1 = require("@prisma/client");
class ReservationController {
    constructor() {
        this.reservationService = new reservation_service_1.ReservationService();
        this.createBooking = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    return res
                        .status(401)
                        .json({ status: 401, message: "사용자 ID가 없습니다." });
                }
                const { pet_sitter_id, dog_name, dog_breed, dog_age, dog_weight, request_details, booking_date, } = req.body;
                const createdBooking = yield this.reservationService.createBooking(userId, pet_sitter_id, dog_name, dog_breed, dog_age, dog_weight, request_details, booking_date);
                return res.status(201).json({
                    status: 201,
                    message: "예약이 접수 되었습니다. 펫시터의 승인을 기다리고 있습니다.",
                    data: createdBooking,
                });
            }
            catch (err) {
                next(err);
            }
        });
        //예약목록 조회
        this.getReservations = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const role = (_c = (_b = req.user) === null || _b === void 0 ? void 0 : _b.role) !== null && _c !== void 0 ? _c : client_1.Role.USER;
                if (!userId) {
                    return res
                        .status(401)
                        .json({ status: 401, message: "사용자가 존재하지 않습니다. " });
                }
                const reservations = yield this.reservationService.getReservations(userId, role);
                return res.status(200).json({
                    status: 200,
                    message: "예약 조회에 성공했습니다.",
                    data: reservations,
                });
            }
            catch (err) {
                next(err);
            }
        });
        //예약상세조회
        this.getReservationById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                const { reservationId } = req.params;
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const role = (_c = (_b = req.user) === null || _b === void 0 ? void 0 : _b.role) !== null && _c !== void 0 ? _c : client_1.Role.USER;
                if (!userId) {
                    return res
                        .status(401)
                        .json({ status: 401, message: "사용자가 존재하지 않습니다. " });
                }
                const reservation = yield this.reservationService.getReservationById(+reservationId, userId, role);
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
            }
            catch (err) {
                next(err);
            }
        });
        //예약변경
        this.updateReservation = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const { reservationId } = req.params;
                const { dog_name, dog_breed, dog_age, dog_weight, request_details, booking_date, } = req.body;
                if (!userId) {
                    return res
                        .status(401)
                        .json({ status: 401, message: "사용자가 존재하지 않습니다. " });
                }
                // 서비스 호출
                const updatedReservation = yield this.reservationService.updateReservation(+userId, // 변환 확인
                +reservationId, // 변환 확인
                dog_name, dog_breed, dog_age, dog_weight, request_details, booking_date);
                return res.status(200).json({
                    status: 200,
                    message: "예약 수정에 성공했습니다.",
                    data: updatedReservation,
                });
            }
            catch (err) {
                next(err); // 오류를 다음 미들웨어로 전달
            }
        });
        //예약취소
        this.cancelReservation = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
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
                const result = yield this.reservationService.cancelReservation(+userId, +reservationId, reason);
                return res.status(200).json({
                    status: 200,
                    message: "예약이 성공적으로 취소되었습니다.",
                    reservationId: `${reservationId}`,
                });
            }
            catch (err) {
                next(err);
            }
        });
        //예약 상태(status) 변경
        this.updateStatus = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { reservationId } = req.params;
            const { new_status, reason } = req.body;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            try {
                if (!userId) {
                    return res
                        .status(401)
                        .json({ status: 401, message: "사용자가 존재하지 않습니다. " });
                }
                const updatedReservation = yield this.reservationService.updateStatus(+userId, +reservationId, new_status, reason);
                return res.status(200).json({
                    status: 200,
                    message: "예약 상태가 성공적으로 변경되었습니다.",
                    data: updatedReservation,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.ReservationController = ReservationController;
