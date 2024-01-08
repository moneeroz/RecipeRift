import * as SecureStore from "expo-secure-store";
import JWT from "expo-jwt";
import React, { useEffect } from "react";
import { useStorageState } from "@/hooks/useStorageState";
import { useLogInMutation } from "@/store/api";
import { useDispatch } from "react-redux";
import {
  clearCredentials,
  selectCurrentUser,
  setCredentials,
} from "@/store/auth";
import { router } from "expo-router";
import { store } from "@/store/store";

const AuthContext = React.createContext<{
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [logIn, { data, error }] = useLogInMutation();
  const dispatch = useDispatch();
  const [[isLoading, session], setSession] = useStorageState("session");
  const [state, setToken] = useStorageState("token");

  const key = process.env.EXPO_PUBLIC_JWT_SECRET;

  const user = selectCurrentUser(store.getState());

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync("token");

      if (token) {
        const decoded = JWT.decode<any>(token, key!);
        dispatch(
          setCredentials({
            token: token,
            user: {
              id: decoded.id,
              email: decoded.email,
              username: decoded.username,
            },
          }),
        );
        setSession("xxx");
        console.log(decoded);
      }

      console.log(token);
      console.log(user);
    };
    loadToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn: async (email: string, password: string) => {
          try {
            const result = await logIn({ email, password });

            if ("data" in result) {
              dispatch(
                setCredentials({
                  user: result.data.user,
                  token: result.data.token,
                }),
              );
              setToken(result.data.token);
              router.replace("/");
            } else {
              console.error(result.error);
            }
          } catch (error) {
            console.log(error);
          }
          setSession("xxx");
        },
        signOut: () => {
          dispatch(clearCredentials());
          setSession(null);
          setToken(null);
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
