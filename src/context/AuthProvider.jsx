import { useEffect } from "react";
import useAuthStore from "../store/useAuthStore.js";
import { Loader } from "lucide-react";
import { createContext } from "react";
import { useContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

    useEffect(() => {
      checkAuth();
    }, [checkAuth]);

    if (isCheckingAuth && !authUser) {
      return (
        <div className="flex items-center justify-center h-screen">
          <Loader className="size-10 animate-spin" />
        </div>
      );
    }
  return (
    <AuthContext.Provider value={{ authUser }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
