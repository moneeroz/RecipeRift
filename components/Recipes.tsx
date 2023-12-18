import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Link } from "expo-router";
import Colors from "@/constants/Colors";

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

const Recipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const getRecipes = async () => {
    try {
      const response = await fetch("http://10.0.0.202:2828/api/recipes", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      setRecipes(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        padding: 15,
      }}
    >
      {recipes.map((recipe, index) => (
        <Link
          href={{ pathname: "/details", params: { id: recipe.id } }}
          key={index}
          asChild
        >
          <TouchableOpacity>
            <View style={styles.recipeCard}>
              <Image source={{ uri: recipe.image }} style={styles.image} />
              <View style={styles.recipeBox}>
                <Text style={styles.recipeText}>{recipe.name}</Text>
                <Text
                  style={{ color: Colors.green, textTransform: "capitalize" }}
                >
                  {recipe.category_id} {recipe.prep_time}
                </Text>
                <Text style={{ color: Colors.medium }}>
                  {recipe.difficulty}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </Link>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  recipeCard: {
    width: 300,
    height: 250,
    backgroundColor: "#fff",
    marginEnd: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.06,
    borderRadius: 4,
  },
  recipeText: {
    paddingVertical: 5,
    fontSize: 14,
    fontWeight: "bold",
  },
  image: {
    flex: 5,
    width: undefined,
    height: undefined,
  },
  recipeBox: {
    flex: 2,
    padding: 10,
  },
});

export default Recipes;
