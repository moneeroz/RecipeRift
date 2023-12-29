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
import { Link, useLocalSearchParams } from "expo-router";
import { getIngrediantImage } from "@/assets/ingrediants/ingrediants";
import { useGetRecipeQuery } from "@/store/api";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Recipe from "@/types/recipe";

interface Ingredient {
  name: string;
  img: ImageSourcePropType;
  extra?: string;
  quantity: string;
  unit: string;
}

const Details = () => {
  const { id } = useLocalSearchParams();

  const itemsCount = useSelector((state: RootState) =>
    Object.values(state.basket.items).reduce(
      (total, item) => total + item.quantity,
      0,
    ),
  );

  const { data, error, isLoading } = useGetRecipeQuery(id.toString());

  if (!data) return;
  const recipe: Recipe = data;

  const ingrediants: Ingredient[] = recipe.ingredients.map((item) => {
    return {
      name: item.name,
      extra: item.extra,
      quantity: item.recipeIngredient.quantity,
      unit: item.recipeIngredient.unit,
      img: getIngrediantImage(item.name),
    };
  });

  const directions: Array<string> = recipe.directions.split("\n");

  const tags: string[] = recipe.tags.split(", ").map((item) => item.trim());

  const renderIngrediant: ListRenderItem<Ingredient> = ({ item, index }) => (
    <TouchableOpacity style={styles.item}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={styles.dish}>
          {item.quantity} {item.unit} {item.name} {item.extra && item.extra}
        </Text>
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
    <>
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
      {itemsCount > 0 && (
        <View style={styles.footer}>
          <SafeAreaView edges={["bottom"]} style={{ backgroundColor: "#fff" }}>
            <Link href="/basket" asChild>
              <TouchableOpacity style={styles.fullButton}>
                <Text style={styles.basket}>{itemsCount}</Text>
                <Text style={styles.footerText}>View Basket</Text>
                <Ionicons name="arrow-forward" size={28} color={"#fff"} />
              </TouchableOpacity>
            </Link>
          </SafeAreaView>
        </View>
      )}
    </>
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
  footer: {
    position: "absolute",
    backgroundColor: "#fff",
    bottom: 0,
    left: 0,
    width: "100%",
    padding: 10,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    paddingTop: 20,
  },
  fullButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    height: 50,
  },
  footerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  basket: {
    color: "#fff",
    backgroundColor: "#19AA86",
    fontWeight: "bold",
    padding: 8,
    borderRadius: 2,
  },
});

export default Details;
