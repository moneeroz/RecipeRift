import SearchBar from "@/components/SearchBar";
import Colors from "@/constants/Colors";
import { store } from "@/store/store";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useNavigation } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Provider } from "react-redux";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
};

export default function RootLayoutNav() {
  const navigation = useNavigation();

  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{ header: () => <SearchBar /> }} />
        <Stack.Screen
          name="(modal)/filter"
          options={{
            presentation: "modal",
            headerTitle: "Filter",
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: Colors.lightGrey,
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Ionicons
                  name="close-outline"
                  size={28}
                  color={Colors.primary}
                />
              </TouchableOpacity>
            ),
          }}
        />
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
      </Stack>
    </Provider>
  );
}
