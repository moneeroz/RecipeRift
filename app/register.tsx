import { View, TextInput, StyleSheet, Button } from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import { useLogInMutation, useRegisterMutation } from "@/store/api";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/auth";

const Register = () => {
  const [register, { data, error, isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const onRegister = async () => {
    try {
      await register({ username, email, password });
    } catch (error) {
      console.log(error);
    }
  };

  return (
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

export default Register;
