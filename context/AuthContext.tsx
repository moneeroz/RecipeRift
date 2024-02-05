import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { useDispatch } from "react-redux";
import { useLogInMutation } from "@/store/api";
import { setCredentials } from "@/store/auth";
import JWT from "expo-jwt";
import { useRouter } from "expo-router";

interface AuthProps {
  authState: {
    token: string | null;
    authenticated: boolean | null;
    user_id: string | null;
  };
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  initialized: boolean;
}

const TOKEN_KEY = "my-token";
export const API_URL = process.env.EXPO_PUBLIC_SERVER_URL;
const AuthContext = createContext<AuthProps>({
  authState: { token: null, authenticated: null, user_id: null },
  signIn: () => null,
  signOut: () => null,
  initialized: false,
});

// Easy access to our Provider
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [logIn, { data, error }] = useLogInMutation();
  const [initialized, setInitialized] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
    user_id: string | null;
  }>({
    token: null,
    authenticated: null,
    user_id: null,
  });

  const key = process.env.EXPO_PUBLIC_JWT_SECRET;

  useEffect(() => {
    const loadToken = async () => {
      // Load token on startup
      const data = await SecureStore.getItemAsync(TOKEN_KEY);

      if (data) {
        const object = JSON.parse(data);

        const decoded = JWT.decode<any>(object.token, key!);

        console.log(decoded);
        console.log(Date.now() / 1000);

        if (decoded.exp < Date.now() / 1000) {
          setAuthState({
            token: null,
            authenticated: false,
            user_id: null,
          });

          await SecureStore.deleteItemAsync(TOKEN_KEY);

          setInitialized(true);
          return;
        }
        // Set our context state
        setAuthState({
          token: object.token,
          authenticated: true,
          user_id: object.user.id,
        });

        dispatch(
          setCredentials({
            token: object.token,
            user: {
              id: decoded.id,
              email: decoded.email,
              username: decoded.username,
            },
          }),
        );

        setInitialized(true);
      }
    };
    loadToken();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const result = await logIn({ email, password });

      if ("data" in result) {
        dispatch(
          setCredentials({
            user: result.data.user,
            token: result.data.token,
          }),
        );

        setAuthState({
          token: result.data.token,
          authenticated: true,
          user_id: result.data.user.id!,
        });

        await SecureStore.setItemAsync(TOKEN_KEY, JSON.stringify(result.data));

        router.replace("/");
      }

      return result;
    } catch (e) {
      return { error: true, msg: e };
    }
  };

  const signOut = async () => {
    // Delete token from storage
    await SecureStore.deleteItemAsync(TOKEN_KEY);

    // Reset auth state
    setAuthState({
      token: null,
      authenticated: false,
      user_id: null,
    });
  };

  const value = {
    signIn,
    signOut,
    authState,
    initialized,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
