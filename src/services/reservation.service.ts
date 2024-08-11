import { ReservationRepository } from "../repositories/reservation.repository";
import {
  createReservation,
  getReservation,
  updateStatus,
} from "../models/reservation";
import { Role } from "../models/auth";
import { Status } from "../models/reservation";

export class ReservationService {
  private reservationRepository = new ReservationRepository();

  createBooking = async (
    userId: number,
    pet_sitter_id: number,
    dog_name: string,
    dog_breed: string,
    dog_age: string,
    dog_weight: string,
    request_details: string,
    booking_date: Date
  ): Promise<createReservation> => {
    const booking = await this.reservationRepository.createBooking(
      userId,
      pet_sitter_id,
      dog_name,
      dog_breed,
      dog_age,
      dog_weight,
      request_details,
      booking_date
    );

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
  };

  //예약목록조회
  getReservations = async (userId: number, role: Role) => {
    const whereObject: Record<string, any> = {};

    if (role === "USER") {
      whereObject.user_id = userId;
    }

    const reservations = await this.reservationRepository.findReservations(
      whereObject
    );

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
  };

  //예약상세조회API
  getReservationById = async (
    reservationId: number,
    userId: number,
    role: Role
  ): Promise<getReservation> => {
    const whereObject: Record<string, any> = { id: +reservationId };

    if (role === "USER") {
      whereObject.user_id = +userId;
    }

    const reservation = await this.reservationRepository.findReservationById(
      whereObject
    );

    if (!reservation) {
      throw new Error("예약 정보가 존재하지 않습니다."); //error-handler로 관리하기
    }

    return {
      reservation_id: reservation.id,
      status: reservation.status as Status,
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
  };

  //예약변경
  updateReservation = async (
    userId: number,
    reservationId: number,
    dog_name: string,
    dog_breed: string,
    dog_age: string,
    dog_weight: string,
    request_details: string,
    booking_date: Date
  ): Promise<getReservation> => {
    if (isNaN(userId) || isNaN(reservationId)) {
      throw new Error("유효하지 않은 ID가 전달되었습니다.");
    }

    // 예약 정보 조회
    const reservation =
      await this.reservationRepository.findReservationByIdAndUser(
        +reservationId, // 변환 확인
        +userId // 변환 확인
      );

    if (!reservation) {
      throw new Error("예약 정보가 존재하지 않습니다.");
    }

    // 현재 예약 날짜가 다른 예약에서 사용 중인지 확인
    if (booking_date) {
      const existingReservation =
        await this.reservationRepository.findExistingReservationByDate(
          reservation.pet_sitter_id, // 변수명 확인
          booking_date,
          +reservationId // 변환 확인
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
    const updatedReservation =
      await this.reservationRepository.updateReservationData(
        +reservationId, // 변환 확인
        updateData
      );

    return {
      reservation_id: updatedReservation.id,
      status: updatedReservation.status as Status,
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
  };

  //예약취소
  cancelReservation = async (
    userId: number,
    reservationId: number,
    reason: string
  ) => {
    return await this.reservationRepository.cancelReservation(
      +userId,
      +reservationId,
      reason
    );
  };

  //예약상태변경

  updateStatus = async (
    userId: number,
    reservationId: number,
    new_status: Status,
    reason: string
  ) => {
    return await this.reservationRepository.updateStatus(
      +userId,
      +reservationId,
      new_status,
      reason
    );
  };
}
