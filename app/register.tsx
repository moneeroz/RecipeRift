import {
  View,
  TextInput,
  StyleSheet,
  Button,
  Image,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import { useRegisterMutation } from "@/store/api";
import { useRouter } from "expo-router";

const Register = () => {
  const [register, { data, error, isLoading }] = useRegisterMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();

  const onRegister = async () => {
    try {
      await register({ username, email, password });
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <View style={styles.bgContainer}>
        <Image
          source={require("@/assets/data/bg.png")}
          style={{ position: "absolute" }}
        />
        <Text style={styles.bgTitle}>Create Account</Text>
      </View>
      <View style={styles.container}>
        <TextInput
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          placeholder="Username"
          placeholderTextColor={Colors.medium}
          style={styles.inputField}
        />
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
          onPress={onRegister}
          title="Create Account"
          color={Colors.primary}
        ></Button>
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

export default Register;
