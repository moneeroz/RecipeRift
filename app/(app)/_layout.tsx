import { Redirect, Stack, useNavigation } from "expo-router";

import { useSession } from "@/context/ctx";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

export default function AppLayout() {
  const { session, isLoading } = useSession();
  const navigation = useNavigation();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the app group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
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
