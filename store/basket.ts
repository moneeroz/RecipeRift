import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Recipe from "../types/recipe";

interface BasketState {
  items: { [key: string]: { data: Recipe; quantity: number } };
}

const initialState: BasketState = {
  items: {},
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addRecipeToBasket: (state, action: PayloadAction<Recipe>) => {
      const id = action.payload.id;
      if (state.items[id]) {
        state.items[id].quantity += 1;
      } else {
        state.items[id] = { data: action.payload, quantity: 1 };
      }
    },
    removeRecipeFromBasket: (state, action: PayloadAction<Recipe>) => {
      const id = action.payload.id;
      if (state.items[id]) {
        if (state.items[id].quantity > 1) {
          state.items[id].quantity -= 1;
        } else {
          delete state.items[id];
        }
      }
    },
    updateBasket: (
      state,
      { payload }: PayloadAction<{ recipes: Recipe[] }>,
    ) => {
      state.items = {};
      payload.recipes.forEach((recipe) => {
        state.items[recipe.id] = { data: recipe, quantity: recipe.count! };
      });
    },
    clearBasket: (state) => {
      state.items = {};
    },
  },
});

export const {
  addRecipeToBasket,
  removeRecipeFromBasket,
  updateBasket,
  clearBasket,
} = basketSlice.actions;

export default basketSlice.reducer;
