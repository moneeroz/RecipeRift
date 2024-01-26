import { Text, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import Categories from "@/components/Categories";
import Colors from "@/constants/Colors";
import Recipes from "@/components/Recipes";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import SearchBar from "@/components/SearchBar";
import { useGetFavouritesQuery, useGetRecipesQuery } from "@/store/api";
import RecipeList from "@/components/RecipeList";
import Header from "@/components/Header";
import { store } from "@/store/store";
import { useDispatch } from "react-redux";
import { addToFavs } from "@/store/favourites";
import CardLoader from "@/components/CardLoader";

const Page = () => {
  const { data, error, isLoading } = useGetRecipesQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const filteredRecipes = data?.filter((recipe) =>
    recipe.name.includes(searchTerm),
  );

  const topPicks = data
    ?.map((recipe) => ({ recipe, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ recipe }) => recipe)
    .slice(0, 4);

  const trending = data
    ?.map((recipe) => ({ recipe, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ recipe }) => recipe)
    .slice(0, 4);

  const user = store.getState().auth.user;
  const { data: favourites } = useGetFavouritesQuery(user?.id);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      if (favourites)
        favourites.forEach((recipe) => dispatch(addToFavs({ recipe })));
    }
  }, [favourites]);

  const handleSearchTermChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  };
  return (
    <>
      <Stack.Screen
        options={{
          header: () => (
            <View style={{ gap: 14 }}>
              <Header />
              <SearchBar onSearchTermChange={handleSearchTermChange} />
            </View>
          ),
        }}
      />
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          <Categories />
          {searchTerm ? (
            <RecipeList height={50} recipes={filteredRecipes} />
          ) : null}
          <Text style={styles.containerTitle}>Trending today</Text>
          {isLoading ? <CardLoader /> : <Recipes data={trending} />}

          <Text style={styles.containerTitle}>Top picks for you</Text>
          {isLoading ? <CardLoader /> : <Recipes data={topPicks} />}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lightGrey,
  },
  containerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
});

export default Page;
