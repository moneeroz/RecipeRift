// store/api.ts

import Recipe from "@/types/recipe";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://10.0.0.202:2828/api/" }),
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
  }),
});

export const {
  useGetRecipesQuery,
  useGetRecipeQuery,
  useGetRecipesByCategoryQuery,
} = apiSlice;
