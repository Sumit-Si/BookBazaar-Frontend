import { create } from "zustand";
import authService from "../api/authService";
import toast from "react-hot-toast";

const useAuthStore = create((set) => ({
  authUser: null,
  isSignInUp: false,
  isLoggingIn: false,
  isCheckingAuth: false,

  checkAuth: async () => {
    set({ isCheckingAuth: true });

    try {
      const res = await authService.getProfile();
      console.log("Checking auth", res);

      set({ authUser: res.user });
    } catch (error) {
      console.log("Error checking auth: ", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (userData) => {
    set({ isSignInUp: true });
    try {
      const res = await authService.register(userData);
      console.log("Signup res: ", res);

      set({ authUser: res.user });
      toast.success("Signup successfully");
    } catch (error) {
      console.log("Error signing up: ", error);
      toast.error(error?.response?.data?.error || error?.response?.data?.message)
    } finally {
      set({ isSignInUp: false });
    }
  },

  login: async (credientials) => {
    set({ isLoggingIn: true });
    try {
      const res = await authService.login(credientials);
      console.log("Login res: ", res);
      set({ authUser: res?.user });
      toast.success("Login successfully");
    } catch (error) {
      console.log("Error logging in: ", error);
      toast.error(
        error?.response?.data?.error || error?.response?.data?.message
      );
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await authService.logout();
      set({ authUser: null });
      toast.success("Logout successfully");
    } catch (error) {
      console.log("Error logging out: ", error);
    }
  },
}));

export default useAuthStore;
