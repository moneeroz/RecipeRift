// store/api.ts

import { User, LoginResponse } from "@/types/auth";
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
} = apiSlice;
