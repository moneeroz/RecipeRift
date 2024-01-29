import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { ReactNode } from "react";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { Stack, useNavigation, useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import Recipe from "@/types/recipe";
import { addRecipeToBasket } from "@/store/basket";
import { useDispatch } from "react-redux";
import {
  useAddToBasketMutation,
  useAddToFavouritesMutation,
  useRemoveFromFavouritesMutation,
} from "@/store/api";
import { selectCurrentUser } from "@/store/auth";
import { store } from "@/store/store";
import {
  addToFavs,
  removeFromFavs,
  selectFavourites,
} from "@/store/favourites";
import { hapticFeedback } from "@/utils/haptics";

interface Props {
  children?: ReactNode;
  recipe: Recipe;
}

const { width } = Dimensions.get("window");
const height = 300;

const ParallaxScrollView = ({ recipe, children }: Props) => {
  const navigation = useNavigation();
  const router = useRouter();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const [addToFavourites] = useAddToFavouritesMutation();
  const [removeFromFavourites] = useRemoveFromFavouritesMutation();
  const [addToBasket] = useAddToBasketMutation();
  const dispatch = useDispatch();
  const user = selectCurrentUser(store.getState());
  const favourites = selectFavourites(store.getState());
  const isFavourite = favourites?.some((fav) => fav.id === recipe.id);

  const handleFavPress = () => {
    if (!user) {
      router.replace("/login");
      return;
    }
    if (isFavourite) {
      removeFromFavourites({ recipe_id: recipe.id, user_id: user.id });
      dispatch(removeFromFavs({ recipe: recipe }));
    } else {
      addToFavourites({ recipe_id: recipe.id, user_id: user.id });
      dispatch(addToFavs({ recipe: recipe }));
    }

    hapticFeedback();
  };

  const renderButtons = () => (
    <>
      {user && (
        <TouchableOpacity onPress={handleFavPress} style={{ marginRight: 10 }}>
          <Ionicons
            name={isFavourite ? "heart-dislike-outline" : "heart-outline"}
            size={28}
            color={Colors.primary}
          />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={() => {
          dispatch(addRecipeToBasket(recipe));
          addToBasket({ recipe_id: recipe.id, user_id: user?.id });
          hapticFeedback();
        }}
      >
        <MaterialCommunityIcons
          name="basket-plus-outline"
          size={28}
          color={Colors.primary}
        />
      </TouchableOpacity>
    </>
  );

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-height, 0, height],
            [-height / 2, 0, height * 0.75],
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-height, 0, height],
            [2, 1, 1],
          ),
        },
      ],
    };
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, height / 1.5], [0, 1]),
    };
  });

  return (
    <View>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: () => (
            <Animated.View style={[headerAnimatedStyle]}>
              <Text>{recipe.name}</Text>
            </Animated.View>
          ),
          headerBackground: () => (
            <Animated.View style={[styles.header, headerAnimatedStyle]} />
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Ionicons name="close-outline" size={28} color={Colors.primary} />
            </TouchableOpacity>
          ),
          headerRight: renderButtons,
        }}
      />
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <Animated.Image
          source={{
            uri: recipe.image,
          }}
          style={[styles.image, imageAnimatedStyle]}
        />
        <View>{children}</View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width,
    height,
  },
  header: {
    backgroundColor: "#fff",
    height: 100,
    borderWidth: StyleSheet.hairlineWidth,
  },
});

export default ParallaxScrollView;
