export interface User {
  id?: string;
  email: string;
  password?: string;
  username?: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}
