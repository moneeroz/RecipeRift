import React from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
import { ScrollView, StyleSheet } from "react-native";

const LoaderCard = () => (
  <ContentLoader
    width={300}
    height={250}
    backgroundColor="#fff"
    foregroundColor="#ecebeb"
    style={styles.card}
  >
    <Rect x="0" y="0" rx="0" ry="0" width="300" height="250" />
  </ContentLoader>
);

const CardLoader = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        padding: 15,
      }}
    >
      {[...Array(2)].map((_, i) => (
        <LoaderCard key={i} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
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
});

export default CardLoader;
