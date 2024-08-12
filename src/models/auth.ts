// TODO: db에 저장하는 것은 class로 변환하기
// TODO: 직접 제어하는 것들은 대부분 interface

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  phone_number: string;
  address: string;
}

export interface SingupResponse {
  email: string;
  password: string;
  name: string;
  phone_number: string;
  address: string;
}

export interface login {
  email: string;
  password: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export type Role = "ADMIN" | "USER";

export interface FindUser {
  id: number;
  email: string;
  password?: string;
  name: string;
  phone_number: string;
  address: string;
  role: Role;
  image_url: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface updateUser {
  phone_number: string;
  address: string;
}

export interface resultUpdateUser {
  id: number;
  name: string;
  phone_number: string;
  address: string;
  updated_at: Date;
}
