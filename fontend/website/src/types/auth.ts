// src/types/auth.ts hoặc src/api/authService.ts

export interface LoginResponse {
  token: string;
  user: string; // Tên người dùng hoặc ID
}

export interface LoginCredentials {
  username: string;
  password: string;
}