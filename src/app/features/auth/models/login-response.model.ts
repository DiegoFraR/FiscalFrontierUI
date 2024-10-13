export interface LoginResponse {
  token: string;
  email: string;
  username: string;
  userId: string;
  roles: string[];
}