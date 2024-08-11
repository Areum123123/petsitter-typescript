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
exports.ReservationRepository = void 0;
const prisma_util_1 = require("../utils/prisma.util");
class ReservationRepository {
    constructor() {
        this.createBooking = (userId, pet_sitter_id, dog_name, dog_breed, dog_age, dog_weight, request_details, booking_date) => __awaiter(this, void 0, void 0, function* () {
            // const reservation =
            return yield prisma_util_1.prisma.reservations.create({
                data: {
                    user_id: +userId,
                    pet_sitter_id: +pet_sitter_id,
                    dog_name,
                    dog_breed,
                    dog_age,
                    dog_weight,
                    request_details,
                    booking_date: new Date(booking_date),
                },
                include: {
                    petsitters: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            });
        });
        this.findReservations = (whereObject) => __awaiter(this, void 0, void 0, function* () {
            return yield prisma_util_1.prisma.reservations.findMany({
                where: whereObject,
                orderBy: {
                    created_at: "desc",
                },
                include: {
                    petsitters: {
                        select: { name: true, region: true },
                    },
                    users: {
                        select: { name: true, phone_number: true, address: true },
                    },
                },
            });
        });
        this.findReservationById = (whereObject) => __awaiter(this, void 0, void 0, function* () {
            return yield prisma_util_1.prisma.reservations.findFirst({
                where: whereObject,
                include: {
                    petsitters: {
                        select: { name: true, region: true },
                    },
                    users: {
                        select: { name: true, phone_number: true, address: true },
                    },
                },
            });
        });
        // 예약 찾기
        this.findReservationByIdAndUser = (reservationId, userId) => __awaiter(this, void 0, void 0, function* () {
            return prisma_util_1.prisma.reservations.findFirst({
                where: {
                    id: +reservationId, // 변환 확인
                    user_id: +userId, // 변환 확인
                },
                include: {
                    users: true,
                    petsitters: true,
                },
            });
        });
        // 예약 날짜 찾기
        this.findExistingReservationByDate = (petSitterId, bookingDate, reservationId) => __awaiter(this, void 0, void 0, function* () {
            return prisma_util_1.prisma.reservations.findFirst({
                where: {
                    pet_sitter_id: +petSitterId, // 변환 확인
                    booking_date: new Date(bookingDate),
                    id: +reservationId, // 변환 확인
                },
            });
        });
        // 예약 날짜 변경
        this.updateReservationData = (reservationId, updateData) => __awaiter(this, void 0, void 0, function* () {
            return prisma_util_1.prisma.reservations.update({
                where: { id: +reservationId }, // 변환 확인
                data: updateData,
                include: {
                    users: true,
                    petsitters: true,
                },
            });
        });
        //예약취소 [service에 정리하기]
        this.cancelReservation = (userId, reservationId, reason) => __awaiter(this, void 0, void 0, function* () {
            // 트랜잭션으로 예약 삭제 및 로그 기록
            return yield prisma_util_1.prisma.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                // 예약 정보 조회
                const reservation = yield tx.reservations.findUnique({
                    where: {
                        id: +reservationId,
                        user_id: +userId,
                    },
                    include: {
                        users: true, // 예약 정보에 사용자 정보 포함
                        petsitters: true, // 예약 정보에 펫시터 정보 포함
                    },
                });
                if (!reservation) {
                    // 응답을 보내고 트랜잭션을 종료
                    throw new Error("예약 정보가 존재하지 않습니다.");
                }
                // 예약 로그 기록
                console.log({ reason });
                const result = yield tx.reservation_logs.create({
                    data: {
                        reservation_id: +reservationId,
                        user_id: +userId,
                        old_status: reservation.status,
                        new_status: "CANCELED",
                        reason: reason,
                    },
                });
                console.log({ result });
                const cancellationDate = new Date("1900-01-01"); // 기본 과거 날짜
                cancellationDate.setDate(cancellationDate.getDate() + reservationId); // 예약 ID를 날짜에 추가
                // Soft delete
                yield tx.reservations.update({
                    where: { id: +reservationId, user_id: +userId },
                    data: {
                        status: "CANCELED",
                        booking_date: cancellationDate,
                        deleted_at: new Date(),
                    },
                });
            }));
        });
        //예약상태변경
        this.updateStatus = (userId, reservationId, new_status, reason) => __awaiter(this, void 0, void 0, function* () {
            return yield prisma_util_1.prisma.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
                // 예약 정보 조회
                const reservation = yield prisma.reservations.findFirst({
                    where: { id: +reservationId },
                });
                if (!reservation) {
                    throw new Error("예약 정보가 존재하지 않습니다.");
                }
                // 예약 상태 업데이트
                const updatedReservation = yield prisma.reservations.update({
                    where: { id: +reservationId },
                    data: { status: new_status },
                });
                // 예약 로그 기록
                yield prisma.reservation_logs.create({
                    data: {
                        reservation_id: +reservationId,
                        user_id: +userId, // 상태 변경을 수행한 사용자 ID 기록
                        old_status: reservation.status,
                        new_status: new_status,
                        reason: reason, // 상태 변경 사유 기록
                    },
                });
                return {
                    reservation_id: +reservationId,
                    user_id: +userId,
                    petsitter_id: updatedReservation.pet_sitter_id,
                    updated_status: {
                        old_status: reservation.status,
                        new_status: new_status,
                        reason: reason,
                    },
                    booking_date: updatedReservation.booking_date,
                };
            }));
        });
    }
}
exports.ReservationRepository = ReservationRepository;
