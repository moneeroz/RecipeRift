import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import Recipe from "@/types/recipe";

interface Props {
  recipes?: Recipe[];
  height?: number;
}

const RecipeList = ({ recipes, height }: Props) => {
  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: "center",
        paddingVertical: 20,
        minHeight: height,
      }}
    >
      {recipes?.map((recipe, index) => (
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
    width: 350,
    height: 250,
    marginBottom: 20,
    backgroundColor: "#fff",
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

export default RecipeList;
