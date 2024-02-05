import Colors from "@/constants/Colors";
import { AuthProvider } from "@/context/AuthContext";
import { store } from "@/store/store";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack, useNavigation } from "expo-router";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { Provider } from "react-redux";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
};

export default function RootLayoutNav() {
  const navigation = useNavigation();

  return (
    <Provider store={store}>
      <AuthProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <Stack>
              <Stack.Screen name="index" />
              <Stack.Screen name="(app)" options={{ headerShown: false }} />
              <Stack.Screen name="details" options={{ headerShown: false }} />
              <Stack.Screen name="category" options={{ headerShown: false }} />
              <Stack.Screen
                name="login"
                options={{
                  headerTitle: "Login",
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
                name="register"
                options={{
                  headerTitle: "Register",
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
                name="shoppingList"
                options={{
                  headerTitle: "Shopping List",
                  headerLeft: () => (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.goBack();
                      }}
                    >
                      <Ionicons
                        name="arrow-back"
                        size={28}
                        color={Colors.primary}
                      />
                    </TouchableOpacity>
                  ),
                }}
              />
            </Stack>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </AuthProvider>
    </Provider>
  );
}
