import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { ReactNode } from "react";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { Stack, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

interface Recipe {
  id: string;
  prep_time: string;
  name: string;
  image: string;
  about: string;
  tags: string;
  difficulty: string;
  cloudinary_id: string;
  ingredients: string;
  directions: string;
  category_id: string;
}

interface Props {
  children?: ReactNode;
  recipe: Recipe;
}

const { width } = Dimensions.get("window");
const height = 300;

const ParallaxScrollView = ({ recipe, children }: Props) => {
  const navigation = useNavigation();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

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
