export default interface Ingredient {
  id: string;
  name: string;
  extra?: string;
  img?: string;
  recipeIngredient: {
    id: string;
    quantity: string;
    unit: string;
    recipe_id: string;
    ingredient_id: string;
  };
}
