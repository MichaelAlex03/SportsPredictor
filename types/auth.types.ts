export interface User {
  id: string;
  email: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  userId: string;
  token: string;
}

export interface JWTPayload {
  userId: string;
  email: string;
}
