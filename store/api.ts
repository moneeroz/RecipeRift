// store/api.ts

import {
  User,
  LoginResponse,
  FavouritePayload,
  passwordResetPayload,
  BasketPayload,
} from "@/types/auth";
import Recipe from "@/types/recipe";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://rn.moneer.dev/",
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
      query: (category_id) => `recipes/category/${category_id}`,
    }),
    getFavourites: builder.query<Recipe[], string | undefined>({
      query: (user_id) => `favourites/${user_id}`,
    }),
    addToFavourites: builder.mutation<Recipe, FavouritePayload>({
      query: ({ recipe_id, user_id }) => ({
        url: `favourites/${user_id}/${recipe_id}`,
        method: "POST",
      }),
    }),
    removeFromFavourites: builder.mutation<Recipe, FavouritePayload>({
      query: ({ recipe_id, user_id }) => ({
        url: `favourites/${user_id}/${recipe_id}`,
        method: "DELETE",
      }),
    }),
    getBasketItems: builder.query<Recipe[], string | undefined>({
      query: (user_id) => `cart/${user_id}`,
    }),
    addToBasket: builder.mutation<Recipe, BasketPayload>({
      query: ({ recipe_id, user_id }) => ({
        url: `cart/${user_id}/${recipe_id}`,
        method: "POST",
      }),
    }),
    updateItem: builder.mutation<Recipe, BasketPayload>({
      query: ({ recipe_id, user_id }) => ({
        url: `cart/${user_id}/${recipe_id}`,
        method: "PUT",
      }),
    }),
    removeFromBasket: builder.mutation<string, BasketPayload>({
      query: ({ recipe_id, user_id }) => ({
        url: `cart/${user_id}/${recipe_id}`,
        method: "DELETE",
      }),
    }),
    clearBasketItems: builder.mutation<string, string | undefined>({
      query: (user_id) => ({
        url: `cart/${user_id}`,
        method: "DELETE",
      }),
    }),
    logIn: builder.mutation<LoginResponse, User>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<User, User>({
      query: (credentials) => ({
        url: "auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
    updatePassword: builder.mutation<string, passwordResetPayload>({
      query: ({ id, oldPassword, newPassword }) => ({
        url: `auth/${id}`,
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
  useGetBasketItemsQuery,
  useAddToBasketMutation,
  useUpdateItemMutation,
  useRemoveFromBasketMutation,
  useClearBasketItemsMutation,
} = apiSlice;
