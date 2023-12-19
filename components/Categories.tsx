import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { categories } from "@/assets/data/categories";
import { ScrollView } from "react-native-gesture-handler";
import { Link } from "expo-router";

const Categories = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        padding: 15,
      }}
    >
      {categories.map((category, index) => (
        <Link
          href={{ pathname: "/category", params: { id: category.id } }}
          key={category.id}
          asChild
        >
          <TouchableOpacity>
            <View key={category.id} style={styles.categoryCard}>
              <Image source={category.img} />
              <Text style={styles.categoryText}>{category.text}</Text>
            </View>
          </TouchableOpacity>
        </Link>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categoryCard: {
    width: 100,
    height: 100,
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
  categoryText: {
    padding: 6,
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Categories;
