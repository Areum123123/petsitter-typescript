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
exports.ReservationService = void 0;
const reservation_repository_1 = require("../repositories/reservation.repository");
class ReservationService {
    constructor() {
        this.reservationRepository = new reservation_repository_1.ReservationRepository();
        this.createBooking = (userId, pet_sitter_id, dog_name, dog_breed, dog_age, dog_weight, request_details, booking_date) => __awaiter(this, void 0, void 0, function* () {
            const booking = yield this.reservationRepository.createBooking(userId, pet_sitter_id, dog_name, dog_breed, dog_age, dog_weight, request_details, booking_date);
            return {
                reservation_id: booking.id,
                user_id: +userId,
                pet_details: {
                    dog_name: booking.dog_name,
                    dog_breed: booking.dog_breed,
                    dog_age: booking.dog_age,
                    dog_weight: booking.dog_weight,
                    request_details: booking.request_details,
                },
                pet_sitter: {
                    pet_sitter_id: booking.petsitters.id,
                    name: booking.petsitters.name,
                    booking_date: booking.booking_date,
                },
                created_at: booking.created_at,
            };
        });
        //예약목록조회
        this.getReservations = (userId, role) => __awaiter(this, void 0, void 0, function* () {
            const whereObject = {};
            if (role === "USER") {
                whereObject.user_id = userId;
            }
            const reservations = yield this.reservationRepository.findReservations(whereObject);
            return reservations.map((reservation) => ({
                reservation_id: reservation.id,
                status: reservation.status,
                pet_details: {
                    name: reservation.dog_name,
                    breed: reservation.dog_breed,
                    age: reservation.dog_age,
                    weight: reservation.dog_weight,
                    request_details: reservation.request_details,
                },
                reservation_details: {
                    user_name: reservation.users.name,
                    phone_number: reservation.users.phone_number,
                    address: reservation.users.address,
                },
                petsitter_details: {
                    name: reservation.petsitters.name,
                    region: reservation.petsitters.region,
                    booking_date: reservation.booking_date,
                },
                created_at: reservation.created_at,
                updated_at: reservation.updated_at,
            }));
        });
        //예약상세조회API
        this.getReservationById = (reservationId, userId, role) => __awaiter(this, void 0, void 0, function* () {
            const whereObject = { id: +reservationId };
            if (role === "USER") {
                whereObject.user_id = +userId;
            }
            const reservation = yield this.reservationRepository.findReservationById(whereObject);
            if (!reservation) {
                throw new Error("예약 정보가 존재하지 않습니다."); //error-handler로 관리하기
            }
            return {
                reservation_id: reservation.id,
                status: reservation.status,
                pet_details: {
                    name: reservation.dog_name,
                    breed: reservation.dog_breed,
                    age: reservation.dog_age,
                    weight: reservation.dog_weight,
                    request_details: reservation.request_details,
                },
                reservation_details: {
                    user_name: reservation.users.name,
                    phone_number: reservation.users.phone_number,
                    address: reservation.users.address,
                },
                petsitter_details: {
                    name: reservation.petsitters.name,
                    region: reservation.petsitters.region,
                    booking_date: reservation.booking_date,
                },
                created_at: reservation.created_at,
                updated_at: reservation.updated_at,
            };
        });
        //예약변경
        this.updateReservation = (userId, reservationId, dog_name, dog_breed, dog_age, dog_weight, request_details, booking_date) => __awaiter(this, void 0, void 0, function* () {
            if (isNaN(userId) || isNaN(reservationId)) {
                throw new Error("유효하지 않은 ID가 전달되었습니다.");
            }
            // 예약 정보 조회
            const reservation = yield this.reservationRepository.findReservationByIdAndUser(+reservationId, // 변환 확인
            +userId // 변환 확인
            );
            if (!reservation) {
                throw new Error("예약 정보가 존재하지 않습니다.");
            }
            // 현재 예약 날짜가 다른 예약에서 사용 중인지 확인
            if (booking_date) {
                const existingReservation = yield this.reservationRepository.findExistingReservationByDate(reservation.pet_sitter_id, // 변수명 확인
                booking_date, +reservationId // 변환 확인
                );
                if (existingReservation) {
                    throw new Error("해당 날짜는 이미 예약되어 있습니다.");
                }
            }
            // 업데이트할 데이터 구성
            const updateData = {
                dog_name: dog_name || reservation.dog_name,
                dog_breed: dog_breed || reservation.dog_breed,
                dog_age: dog_age || reservation.dog_age,
                dog_weight: dog_weight || reservation.dog_weight,
                request_details: request_details || reservation.request_details,
                booking_date: booking_date
                    ? new Date(booking_date)
                    : reservation.booking_date,
                updated_at: new Date(),
            };
            // 예약 정보 업데이트
            const updatedReservation = yield this.reservationRepository.updateReservationData(+reservationId, // 변환 확인
            updateData);
            return {
                reservation_id: updatedReservation.id,
                status: updatedReservation.status,
                pet_details: {
                    name: updatedReservation.dog_name,
                    breed: updatedReservation.dog_breed,
                    age: updatedReservation.dog_age,
                    weight: updatedReservation.dog_weight,
                    request_details: updatedReservation.request_details,
                },
                reservation_details: {
                    user_name: updatedReservation.users.name,
                    phone_number: updatedReservation.users.phone_number,
                    address: updatedReservation.users.address,
                },
                petsitter_details: {
                    name: updatedReservation.petsitters.name,
                    region: updatedReservation.petsitters.region,
                    booking_date: updatedReservation.booking_date,
                },
                created_at: updatedReservation.created_at,
                updated_at: updatedReservation.updated_at,
            };
        });
        //예약취소
        this.cancelReservation = (userId, reservationId, reason) => __awaiter(this, void 0, void 0, function* () {
            return yield this.reservationRepository.cancelReservation(+userId, +reservationId, reason);
        });
        //예약상태변경
        this.updateStatus = (userId, reservationId, new_status, reason) => __awaiter(this, void 0, void 0, function* () {
            return yield this.reservationRepository.updateStatus(+userId, +reservationId, new_status, reason);
        });
    }
}
exports.ReservationService = ReservationService;
