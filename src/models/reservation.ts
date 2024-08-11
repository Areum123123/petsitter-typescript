import { date } from "joi";

export interface createReservation {
  reservation_id: number;
  user_id: number;
  pet_details: {
    dog_name: string;
    dog_breed: string;
    dog_age: string;
    dog_weight: string;
    request_details: string | null;
  };
  pet_sitter: {
    pet_sitter_id: number;
    name: string;
    booking_date: Date;
  };
  created_at: Date;
}

export interface whereObject {
  user_id?: number;
}

export enum Status {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
}

export interface getReservation {
  reservation_id: number;
  status: Status;
  pet_details: {
    name: string;
    breed: string;
    age: string;
    weight: string;
    request_details: string | null;
  };
  reservation_details: {
    user_name: string;
    phone_number: string;
    address: string;
  };
  petsitter_details: {
    name: string;
    region: string;
    booking_date: Date;
  };
  created_at: Date;
  updated_at: Date;
}

export interface updateData {
  dog_name: string;
  dog_breed: string;
  dog_age: string;
  dog_weight: string;
  request_details: string | null;
  booking_date: Date;
  updated_at: Date;
}

export interface updateStatus {
  reservation_id: number;
  user_id: number;
  petsitter_id: number;
  updated_status: {
    old_status: Status;
    new_status: Status;
    reason: string;
  };
  booking_date: Date;
}
