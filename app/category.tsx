import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import CategoryList from "@/components/CategoryList";
import { useGetRecipesByCategoryQuery } from "@/store/api";

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

const Category = () => {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  const { data, error, isLoading } = useGetRecipesByCategoryQuery(
    id.toString(),
  );

  if (!data) return;
  const recipes: Recipe[] = data;

  return (
    <View>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <View>
              <Text style={styles.headerText}>{id}</Text>
            </View>
          ),
          headerBackground: () => <View style={styles.header} />,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Ionicons name="close-outline" size={28} color={Colors.primary} />
            </TouchableOpacity>
          ),
        }}
      />
      <CategoryList recipes={recipes} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    height: 100,
    borderWidth: StyleSheet.hairlineWidth,
  },
  headerText: { fontSize: 18, fontWeight: "bold", textTransform: "capitalize" },
});

export default Category;
