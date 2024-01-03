import { Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import Categories from "@/components/Categories";
import Colors from "@/constants/Colors";
import Recipes from "@/components/Recipes";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import SearchBar from "@/components/SearchBar";
import { useGetRecipesQuery } from "@/store/api";
import RecipeList from "@/components/RecipeList";

const Page = () => {
  const { data, error, isLoading } = useGetRecipesQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const filteredRecipes = data?.filter((recipe) =>
    recipe.name.includes(searchTerm),
  );

  const handleSearchTermChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  };
  return (
    <>
      <Stack.Screen
        options={{
          header: () => (
            <SearchBar onSearchTermChange={handleSearchTermChange} />
          ),
        }}
      />
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          <Categories />
          {searchTerm ? (
            <RecipeList height={50} recipes={filteredRecipes} />
          ) : null}
          <Text style={styles.header}>Trending today</Text>
          <Recipes data={data} />
          <Text style={styles.header}>Top picks for you</Text>
          <Recipes data={data} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    top: -20,
    backgroundColor: Colors.lightGrey,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
});

export default Page;
