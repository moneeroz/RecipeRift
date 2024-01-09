// store/api.ts

import {
  User,
  LoginResponse,
  FavouritePayload,
  passwordResetPayload,
} from "@/types/auth";
import Recipe from "@/types/recipe";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://10.0.0.202:2828/api/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set("authorization", token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getRecipes: builder.query<Recipe[], void>({
      query: () => "recipes",
    }),
    getRecipe: builder.query<Recipe, string>({
      query: (id) => `recipes/${id}`,
    }),
    getRecipesByCategory: builder.query<Recipe[], string>({
      query: (category_id) => `recipes/categories/${category_id}`,
    }),
    getFavourites: builder.query<Recipe[], string | undefined>({
      query: (user_id) => `recipes/favourites/${user_id}`,
    }),
    addToFavourites: builder.mutation<Recipe, FavouritePayload>({
      query: ({ recipe_id, user_id }) => ({
        url: `recipes/favourites/${user_id}/${recipe_id}`,
        method: "POST",
      }),
    }),
    removeFromFavourites: builder.mutation<Recipe, FavouritePayload>({
      query: ({ recipe_id, user_id }) => ({
        url: `recipes/favourites/${user_id}/${recipe_id}`,
        method: "DELETE",
      }),
    }),
    logIn: builder.mutation<LoginResponse, User>({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<User, User>({
      query: (credentials) => ({
        url: "register",
        method: "POST",
        body: credentials,
      }),
    }),
    updatePassword: builder.mutation<string, passwordResetPayload>({
      query: ({ id, oldPassword, newPassword }) => ({
        url: `update-password/${id}`,
        method: "Put",
        body: { old_password: oldPassword, new_password: newPassword },
      }),
    }),
    protected: builder.mutation<{ message: string }, void>({
      query: () => "protected",
    }),
  }),
});

export const {
  useGetRecipesQuery,
  useGetRecipeQuery,
  useGetRecipesByCategoryQuery,
  useLogInMutation,
  useRegisterMutation,
  useProtectedMutation,
  useGetFavouritesQuery,
  useAddToFavouritesMutation,
  useRemoveFromFavouritesMutation,
  useUpdatePasswordMutation,
} = apiSlice;
