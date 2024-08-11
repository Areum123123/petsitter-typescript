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

export interface UserTable {
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
