import {
  View,
  TextInput,
  StyleSheet,
  Button,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import { selectCurrentUser } from "@/store/auth";
import { store } from "@/store/store";
import { useUpdatePasswordMutation } from "@/store/api";

const PasswordUpdate = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [updatePassword, { data, error }] = useUpdatePasswordMutation();
  const user = selectCurrentUser(store.getState());
  const router = useRouter();

  const handlePasswordUpdate = () => {
    updatePassword({
      id: user?.id,
      oldPassword,
      newPassword,
    });
    router.replace("/");
  };

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
        <Text style={styles.bgTitle}>Update Password</Text>
      </View>
      <View style={styles.container}>
        <TextInput
          value={oldPassword}
          onChangeText={setOldPassword}
          placeholder="Old Password"
          secureTextEntry
          placeholderTextColor={Colors.medium}
          style={styles.inputField}
        />
        <TextInput
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="New Password"
          secureTextEntry
          placeholderTextColor={Colors.medium}
          style={styles.inputField}
        />
        <Button
          onPress={handlePasswordUpdate}
          title="Update"
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

export default PasswordUpdate;
