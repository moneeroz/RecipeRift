import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  onSearchTermChange: (newSearchTerm: string) => void;
}

const SearchBar = ({ onSearchTermChange }: Props) => {
  return (
    <View style={styles.safeArea}>
      <View style={styles.searchContainer}>
        <View style={styles.searchSection}>
          <View style={styles.searchField}>
            <Ionicons
              style={styles.searchIcon}
              name="search"
              size={20}
              color={Colors.medium}
            />
            <TextInput
              style={styles.input}
              placeholder="Search Recipes"
              placeholderTextColor={Colors.medium}
              onChangeText={onSearchTermChange}
            />
          </View>
          <Link href={"/(modal)/filter"} asChild>
            <TouchableOpacity style={styles.optionButton}>
              <Ionicons
                name="options-outline"
                size={20}
                color={Colors.primary}
              />
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    height: 60,
    backgroundColor: "#fff",
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

  searchContainer: {
    height: 60,
    backgroundColor: "#fff",
  },
  searchSection: {
    flexDirection: "row",
    gap: 10,
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  searchField: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  optionButton: {
    padding: 10,
    borderRadius: 50,
  },
  input: {
    padding: 10,
    color: Colors.mediumDark,
  },
  searchIcon: {
    paddingLeft: 10,
  },
});

export default SearchBar;
