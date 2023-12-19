import {
  View,
  Text,
  StyleSheet,
  ListRenderItem,
  TouchableOpacity,
  Image,
  FlatList,
  ImageSourcePropType,
} from "react-native";
import React, { useEffect, useState } from "react";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import Colors from "@/constants/Colors";
import { useLocalSearchParams } from "expo-router";
import { getIngrediantImage } from "@/assets/ingrediants/ingrediants";
import { useGetRecipeQuery } from "@/store/api";

interface Recipe {
  id: string;
  prep_time: string;
  name: string;
  about: string;
  tags: string;
  difficulty: string;
  image: string;
  cloudinary_id: string;
  ingredients: string;
  directions: string;
  category_id: string;
}

interface Ingredient {
  name: string;
  img: ImageSourcePropType; // replace 'any' with the actual type of your image
}

const initialRecipe = {
  id: "",
  prep_time: "",
  name: "",
  about: "",
  tags: "",
  difficulty: "",
  image: "/",
  cloudinary_id: "",
  ingredients: "",
  directions: "",
  category_id: "",
};

const Details = () => {
  const { id } = useLocalSearchParams();

  const { data, error, isLoading } = useGetRecipeQuery(id.toString());

  if (!data) return;
  const recipe: Recipe = data;

  const ingrediants: Ingredient[] = recipe.ingredients
    .split("\n")
    .map((item) => {
      item.trim();
      return { name: item, img: getIngrediantImage(item) };
    });

  const directions: Array<string> = recipe.directions.split("\n");

  const tags: string[] = recipe.tags.split(", ").map((item) => item.trim());

  const renderIngrediant: ListRenderItem<Ingredient> = ({ item, index }) => (
    <TouchableOpacity style={styles.item}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={styles.dish}>{item.name}</Text>
      </View>
      <Image source={item.img} style={styles.dishImage} />
    </TouchableOpacity>
  );

  const renderInstruction: ListRenderItem<string> = ({ item, index }) => (
    <TouchableOpacity style={styles.item}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={styles.dish}>Step {index + 1}:</Text>

        <Text style={styles.dishText}>{item}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <ParallaxScrollView recipe={recipe}>
        <View style={styles.detailsContainer}>
          <Text style={styles.recipeName}>{recipe.name}</Text>
          <Text style={styles.recipeDescription}>
            {recipe.prep_time} ·{" "}
            {tags.map(
              (tag, index) => `${tag}${index < tags.length - 1 ? " · " : ""}`,
            )}
          </Text>
          <Text style={styles.recipeDescription}>{recipe.about}</Text>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
            data={ingrediants}
            renderItem={renderIngrediant}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  marginHorizontal: 16,
                  height: 1,
                  backgroundColor: Colors.grey,
                }}
              />
            )}
            ListHeaderComponent={() => (
              <Text style={styles.listHeader}>Ingrediants</Text>
            )}
          />
          <FlatList
            contentContainerStyle={{ paddingBottom: 50 }}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
            data={directions}
            renderItem={renderInstruction}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  marginHorizontal: 16,
                  height: 1,
                  backgroundColor: Colors.grey,
                }}
              />
            )}
            ListHeaderComponent={() => (
              <Text style={styles.listHeader}>Instructions</Text>
            )}
          />
        </View>
      </ParallaxScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    backgroundColor: Colors.lightGrey,
  },
  recipeName: {
    fontSize: 30,
    margin: 16,
  },
  recipeDescription: {
    fontSize: 16,
    margin: 16,
    lineHeight: 22,
    color: Colors.medium,
  },
  listHeader: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 40,
    margin: 16,
  },
  item: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: "row",
  },
  dishImage: {
    height: 60,
    width: 60,
    borderRadius: 4,
  },
  dish: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dishText: {
    fontSize: 14,
    color: Colors.mediumDark,
    paddingVertical: 4,
    lineHeight: 20,
  },
});

export default Details;
