export interface User {
  id?: number;
  email: string;
  password: string;
  username?: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}
