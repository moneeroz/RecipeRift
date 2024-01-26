import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FlatList,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RootState } from "../store/store";
import Colors from "@/constants/Colors";
import { Link, Stack } from "expo-router";
import SwipeableRow from "@/components/SwipeableRow";
import {
  clearShoppingList,
  removeIngredientFromShoppingList,
} from "@/store/shoppingList";
import { clearBasket } from "@/store/basket";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ConfettiCannon from "react-native-confetti-cannon";

interface Ingredient {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  img: ImageSourcePropType;
}

const ShoppingList = () => {
  const dispatch = useDispatch();
  const basketItems = useSelector((state: RootState) => state.basket.items);

  const getIngredients = useSelector(
    (state: RootState) => state.shoppingList.items,
  );
  const ingredients = Object.values(getIngredients);

  const onDelete = (ingredient: Ingredient) => {
    dispatch(removeIngredientFromShoppingList(ingredient));
  };

  useEffect(() => {
    if (ingredients.length === 0 && Object.keys(basketItems).length > 0) {
      dispatch(clearBasket());
    }
  }, [ingredients, basketItems]);

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                  dispatch(clearShoppingList());
                }}
              >
                <MaterialCommunityIcons
                  name="basket-remove-outline"
                  size={28}
                  color={Colors.primary}
                />
              </TouchableOpacity>
            );
          },
        }}
      />

      {ingredients.length === 0 && (
        <ConfettiCannon
          count={200}
          origin={{ x: -10, y: 0 }}
          fallSpeed={2500}
          fadeOut={true}
          autoStart={true}
        />
      )}
      <View>
        <FlatList
          data={ingredients}
          keyExtractor={(item) => item.data.id.toString()}
          contentContainerStyle={{
            paddingBottom: 20,
            backgroundColor: "#fff",
          }}
          ItemSeparatorComponent={() => (
            <View
              style={{
                marginHorizontal: 16,
                height: 1,
                backgroundColor: Colors.grey,
              }}
            />
          )}
          renderItem={({ item }) => (
            <SwipeableRow
              key={item.data.id}
              onDelete={() => onDelete(item.data)}
            >
              <View key={item.data.id} style={styles.item}>
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <Text style={styles.Ingredient}>
                    {item.data.quantity} {item.data.unit} {item.data.name}
                  </Text>
                </View>
                <Image source={item.data.img} style={styles.IngredientImage} />
              </View>
            </SwipeableRow>
          )}
        />
      </View>
      <View>
        {ingredients.length > 0 ? null : (
          <View
            style={{
              marginTop: "60%",
              padding: 20,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Done Shopping!
            </Text>
            <Link href={"/"} asChild>
              <TouchableOpacity style={styles.listBtn}>
                <Text style={styles.ListText}>Back Home</Text>
              </TouchableOpacity>
            </Link>
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: "row",
  },
  IngredientImage: {
    height: 60,
    width: 60,
    borderRadius: 4,
  },
  Ingredient: {
    fontSize: 16,
    fontWeight: "bold",
  },
  ListText: {
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

export default ShoppingList;
