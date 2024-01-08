import { View, Text } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSession } from "@/context/ctx";

const Header = () => {
  const { signOut } = useSession();
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity>
          <Ionicons name="menu" size={24} color={Colors.primary} />
        </TouchableOpacity>

        <Text style={styles.title}>Home</Text>

        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => signOut()}
        >
          <Ionicons name="person-outline" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
  img: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  profileButton: {
    backgroundColor: Colors.lightGrey,
    padding: 8,
    borderRadius: 50,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Header;
