import { createContext, useContext, useCallback, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage.js";
import { loginUser, getUsersByEmail, createUser } from "../services/api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage("user", null);

  const login = useCallback(
    async (email, password) => {
      const users = await loginUser(email, password);
      if (users.length === 0) {
        throw new Error("Invalid email or password");
      }
      const found = users[0];
      setUser({
        id: found.id,
        name: found.name,
        email: found.email,
        role: found.role,
        token: btoa(`${found.email}:${Date.now()}`),
      });
    },
    [setUser]
  );

  const register = useCallback(
    async ({ name, email, password, role }) => {
      const existing = await getUsersByEmail(email);
      if (existing.length > 0) {
        throw new Error("This email is already registered");
      }
      await createUser({ name, email, password, role });
      await login(email, password);
    },
    [login]
  );

  const logout = useCallback(() => setUser(null), [setUser]);

  const value = useMemo(
    () => ({ user, login, register, logout }),
    [user, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}