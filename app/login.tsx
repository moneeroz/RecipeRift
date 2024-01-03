import {
  View,
  TextInput,
  StyleSheet,
  Button,
  Pressable,
  Text,
} from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import { useLogInMutation } from "@/store/api";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/auth";
import { Link, Redirect, useNavigation } from "expo-router";

const Login = () => {
  const [logIn, { data, error, isLoading }] = useLogInMutation();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async () => {
    try {
      const result = await logIn({ email, password });

      if ("data" in result) {
        dispatch(
          setCredentials({
            user: result.data.user,
            token: result.data.token,
          }),
        );
      } else {
        console.error(result.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
      <Button onPress={onLogin} title="Login" color={Colors.primary}></Button>

      <Link href="/register" asChild>
        <Pressable style={styles.button}>
          <Text>Create Account</Text>
        </Pressable>
      </Link>
    </View>
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
});

export default Login;
