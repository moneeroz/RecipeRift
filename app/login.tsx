import {
  View,
  TextInput,
  StyleSheet,
  Button,
  Pressable,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      style={{ flex: 1 }}
    >
      <View style={styles.bgContainer}>
        <Image
          source={require("@/assets/data/bg.png")}
          style={{ position: "absolute" }}
        />
        <Text style={styles.bgTitle}>Log In</Text>
      </View>

      <View style={styles.container}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          placeholder="Email"
          placeholderTextColor={Colors.medium}
          style={styles.inputField}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          placeholderTextColor={Colors.medium}
          style={styles.inputField}
        />

        <Button
          onPress={() => signIn(email, password)}
          title="Login"
          color={Colors.primary}
        ></Button>
        <Link href="/register" asChild>
          <Pressable style={styles.button}>
            <Text>Create Account</Text>
          </Pressable>
        </Link>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
  button: {
    margin: 8,
    alignItems: "center",
  },
  bgContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    maxHeight: 100,
    marginBottom: 100,
  },
  bgTitle: {
    fontSize: 36,
    fontWeight: "bold",
    top: 100,
    color: "#fff",
  },
});

export default Login;
