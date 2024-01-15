import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ImageSourcePropType } from "react-native";

interface Ingredient {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  img: ImageSourcePropType;
}

interface ShoppingListState {
  items: { [key: string]: { data: Ingredient } };
}

const initialState: ShoppingListState = {
  items: {},
};

const shoppingListSlice = createSlice({
  name: "shoppingList",
  initialState,
  reducers: {
    // && state.items[id].data.unit === action.payload.unit
    addIngredientToShoppingList: (state, action: PayloadAction<Ingredient>) => {
      const id = action.payload.id;
      if (
        state.items[id] &&
        state.items[id].data.unit === action.payload.unit
      ) {
        state.items[id].data.quantity += action.payload.quantity;
      } else {
        state.items[id] = { data: action.payload };
      }
    },
    removeIngredientFromShoppingList: (
      state,
      action: PayloadAction<Ingredient>,
    ) => {
      const id = action.payload.id;
      if (
        state.items[id] &&
        state.items[id].data.unit === action.payload.unit &&
        state.items[id].data.quantity > 0
      ) {
        state.items[id].data.quantity -= action.payload.quantity;
      }
      if (state.items[id].data.quantity === 0) {
        delete state.items[id];
      }
    },
    clearShoppingList: (state) => {
      state.items = {};
    },
  },
});

export const {
  addIngredientToShoppingList,
  removeIngredientFromShoppingList,
  clearShoppingList,
} = shoppingListSlice.actions;

export default shoppingListSlice.reducer;
