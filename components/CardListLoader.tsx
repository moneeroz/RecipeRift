import React from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
import { ScrollView, StyleSheet } from "react-native";

const LoaderCard = () => (
  <ContentLoader
    width={350}
    height={250}
    backgroundColor="#fff"
    foregroundColor="#ecebeb"
    style={styles.card}
  >
    <Rect x="0" y="0" rx="0" ry="0" width="350" height="250" />
  </ContentLoader>
);

const CardListLoader = () => {
  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: "center",
        paddingVertical: 20,
      }}
    >
      {[...Array(3)].map((_, i) => (
        <LoaderCard key={i} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
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
});

export default CardListLoader;
