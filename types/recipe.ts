import Ingredient from "./ingredient";

export default interface Recipe {
  id: string;
  prep_time: string;
  name: string;
  about: string;
  tags: string;
  difficulty: string;
  image: string;
  cloudinary_id: string;
  recipeIngredients: Ingredient[];
  directions: string;
  category_id: string;
}
