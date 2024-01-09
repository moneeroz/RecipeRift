import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { forwardRef, useCallback, useMemo } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import Colors from "../constants/Colors";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSession } from "@/context/ctx";
import { selectCurrentUser } from "@/store/auth";
import { store } from "@/store/store";

export type Ref = BottomSheetModal;

const BottomSheet = forwardRef<Ref>((props, ref) => {
  const snapPoints = useMemo(() => ["40%"], []);
  const renderBackDrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    [],
  );
  const { dismiss } = useBottomSheetModal();
  const { signOut, session } = useSession();
  const user = selectCurrentUser(store.getState());

  const logOut = () => {
    signOut();
    dismiss();
  };

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      overDragResistanceFactor={0}
      backdropComponent={renderBackDrop}
      backgroundStyle={{ backgroundColor: Colors.lightGrey, borderRadius: 0 }}
      handleIndicatorStyle={{ display: "none" }}
    >
      <View style={styles.contentContainer}>
        {session ? (
          <>
            <Text style={styles.subheader}>{user?.username}'s Kitchen</Text>
            <Link href={"/(app)/favourites"} asChild>
              <TouchableOpacity onPress={() => dismiss()}>
                <View style={styles.item}>
                  <Ionicons
                    name="heart-outline"
                    size={20}
                    color={Colors.medium}
                  />
                  <Text style={{ flex: 1 }}>Favourites</Text>
                  <Ionicons
                    name="chevron-forward-outline"
                    size={20}
                    color={Colors.primary}
                  />
                </View>
              </TouchableOpacity>
            </Link>

            <Text style={styles.subheader}>Account</Text>
            <Link href={"/(app)/passwordUpdate"} asChild>
              <TouchableOpacity onPress={() => dismiss()}>
                <View style={styles.item}>
                  <Ionicons
                    name="settings-outline"
                    size={20}
                    color={Colors.medium}
                  />
                  <Text style={{ flex: 1 }}>Update Password</Text>
                  <Ionicons
                    name="chevron-forward-outline"
                    size={20}
                    color={Colors.primary}
                  />
                </View>
              </TouchableOpacity>
            </Link>

            <TouchableOpacity style={styles.button} onPress={logOut}>
              <Text style={styles.buttonText}>Log out</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={styles.header}>Please log in first</Text>
            <Link href={"/login"} asChild>
              <TouchableOpacity style={styles.button} onPress={() => dismiss()}>
                <Text style={styles.buttonText}>Log in</Text>
              </TouchableOpacity>
            </Link>
          </View>
        )}
      </View>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },

  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    margin: 16,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  subheader: {
    fontSize: 16,
    fontWeight: "600",
    margin: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "600",
    margin: 16,
    textAlign: "center",
  },
  item: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderColor: Colors.grey,
    borderWidth: 1,
  },
});

export default BottomSheet;
