import { Redirect, Stack, useNavigation } from "expo-router";

import { Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useAuth } from "@/context/AuthContext";

export default function AppLayout() {
  const { authState, initialized } = useAuth();
  const { authenticated } = authState;
  const navigation = useNavigation();

  if (!initialized) {
    return <Text>Loading...</Text>;
  }

  if (!authenticated) {
    return <Redirect href="/login" />;
  }

  // This layout can be deferred because it's not the root layout.
  return (
    <Stack>
      <Stack.Screen
        name="basket"
        options={{
          headerTitle: "Basket",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Ionicons name="arrow-back" size={28} color={Colors.primary} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="favourites"
        options={{
          headerTitle: "Favourites",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Ionicons name="arrow-back" size={28} color={Colors.primary} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="passwordUpdate"
        options={{
          headerTitle: "Change Password",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Ionicons name="arrow-back" size={28} color={Colors.primary} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
