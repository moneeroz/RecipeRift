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

export interface FavouritePayload {
  recipe_id: string;
  user_id: string | undefined;
}
export interface BasketPayload {
  recipe_id: string;
  user_id: string | undefined;
  count?: number;
}
export interface passwordResetPayload {
  id: string | undefined;
  oldPassword: string;
  newPassword: string;
}
