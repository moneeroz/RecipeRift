import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearBasket, removeRecipeFromBasket } from "@/store/basket";
import Colors from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack } from "expo-router";
import SwipeableRow from "@/components/SwipeableRow";
import { RootState } from "@/store/store";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  addIngredientToShoppingList,
  clearShoppingList,
  removeIngredientFromShoppingList,
} from "@/store/shoppingList";
import { getIngrediantImage } from "@/assets/ingrediants/ingrediants";
import Recipe from "@/types/recipe";

interface Item {
  data: Recipe;
  quantity: number;
}

const Basket = () => {
  const basketItems = useSelector((state: RootState) => state.basket.items);
  const recipes = Object.values(basketItems).map((item) => item);
  const dispatch = useDispatch();

  const itemsCount = useSelector((state: RootState) =>
    Object.values(state.basket.items).reduce(
      (total, item) => total + item.quantity,
      0,
    ),
  );

  const onDelete = (recipe: Item) => {
    dispatch(removeRecipeFromBasket(recipe.data));
    recipe.data.recipeIngredients.forEach((i) => {
      const ingredient = {
        id: i.id,
        name: i.name,
        quantity: Number(i.quantity),
        unit: i.unit,
        img: getIngrediantImage(i.name),
      };
      dispatch(removeIngredientFromShoppingList(ingredient));
    });
  };

  const onAdd = () => {
    dispatch(clearShoppingList());

    recipes.forEach((recipe) => {
      recipe.data.recipeIngredients.forEach((ingredient) => {
        dispatch(
          addIngredientToShoppingList({
            id: ingredient.id,
            name: ingredient.name,
            quantity: Number(ingredient.quantity) * recipe.quantity,
            unit: ingredient.unit,
            img: getIngrediantImage(ingredient.name),
          }),
        );
      });
    });
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                dispatch(clearBasket());
              }}
            >
              <MaterialCommunityIcons
                name="basket-remove-outline"
                size={28}
                color={Colors.primary}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <FlatList
        data={Object.values(basketItems)}
        ListHeaderComponent={
          <Text style={styles.section}>
            {Object.values(basketItems).length > 0 ? "Items" : ""}
          </Text>
        }
        ItemSeparatorComponent={() => (
          <View style={{ height: 1, backgroundColor: Colors.grey }} />
        )}
        renderItem={({ item }) => (
          <SwipeableRow onDelete={() => onDelete(item)}>
            <View style={styles.row}>
              <Text style={{ color: Colors.primary, fontSize: 18 }}>
                {item.quantity}x
              </Text>
              <Text style={{ flex: 1, fontSize: 18 }}>{item.data.name}</Text>
            </View>
          </SwipeableRow>
        )}
        ListFooterComponent={
          itemsCount ? null : (
            <View
              style={{ marginTop: "50%", padding: 20, alignItems: "center" }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Your basket is empty!
              </Text>
              <Link href={"/"} asChild>
                <TouchableOpacity style={styles.listBtn}>
                  <Text style={styles.footerText}>Add Recipes</Text>
                </TouchableOpacity>
              </Link>
            </View>
          )
        }
      />

      <View style={styles.footer}>
        <SafeAreaView edges={["bottom"]} style={{ backgroundColor: "#fff" }}>
          <Link
            href="/shoppingList"
            asChild
            style={[
              styles.fullButton,
              {
                opacity: Object.values(basketItems).length > 0 ? 1 : 0.5,
              },
            ]}
          >
            <TouchableOpacity
              disabled={itemsCount > 0 ? false : true}
              onPress={() => {
                onAdd();
              }}
            >
              <Text style={styles.footerText}>Generate a shopping list</Text>
            </TouchableOpacity>
          </Link>
        </SafeAreaView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    gap: 20,
    alignItems: "center",
  },
  section: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 16,
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
    justifyContent: "center",
    flex: 1,
    height: 50,
  },
  footerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  listBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    width: 250,
    height: 50,
    justifyContent: "center",
    marginTop: 20,
  },
});

export default Basket;
