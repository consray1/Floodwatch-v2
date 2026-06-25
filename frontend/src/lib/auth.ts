import api from './api';
import Cookies from 'js-cookie';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'citizen' | 'responder' | 'analyst' | 'admin';
  created_at: string;
}

export const authService = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', data);
    Cookies.set('access_token', response.data.access_token);
    Cookies.set('refresh_token', response.data.refresh_token);
    return response.data;
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', data);
    Cookies.set('access_token', response.data.access_token);
    Cookies.set('refresh_token', response.data.refresh_token);
    return response.data;
  },

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } catch {
    } finally {
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
    }
  },

  async getMe(): Promise<User> {
    const response = await api.get<User>('/auth/me');
    return response.data;
  },

  isAuthenticated(): boolean {
    return !!Cookies.get('access_token');
  },
};