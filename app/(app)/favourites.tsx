import React from "react";
import RecipeList from "@/components/RecipeList";
import { selectFavourites } from "@/store/favourites";
import { useSelector } from "react-redux";

const favourites = () => {
  const favourites = useSelector(selectFavourites);

  return <RecipeList recipes={favourites} />;
};

export default favourites;
