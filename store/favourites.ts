import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import Recipe from "@/types/recipe";

type FavouritesState = {
  favourites: Recipe[] | [];
};

const favouritesSlice = createSlice({
  name: "favourites",
  initialState: { favourites: [] } as FavouritesState,
  reducers: {
    addToFavs: (
      state,
      { payload: { recipe } }: PayloadAction<{ recipe: Recipe }>,
    ) => {
      // add recipe to favourites if it doesn't already exist
      if (!state.favourites?.find((item) => item.id === recipe.id)) {
        (state.favourites as Recipe[]).push(recipe);
      }
    },
    removeFromFavs: (
      state,
      { payload: { recipe } }: PayloadAction<{ recipe: Recipe }>,
    ) => {
      // remove recipe from favourites if it exists
      if (state.favourites?.find((item) => item.id === recipe.id)) {
        state.favourites = state.favourites.filter(
          (item) => item.id !== recipe.id,
        );
      }
    },
    clearFavs: (state) => {
      state.favourites = [];
    },
  },
});

export const { addToFavs, removeFromFavs, clearFavs } = favouritesSlice.actions;

export const selectFavourites = (state: RootState) =>
  state.favourites.favourites;
export default favouritesSlice.reducer;
