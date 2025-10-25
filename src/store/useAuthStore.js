import { create } from "zustand";
import authService from "../api/authService";

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

      // set({authUser: res.user});
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

      //   set({authUser: res.user});
    } catch (error) {
      console.log("Error signing up: ", error);
    } finally {
      set({ isSignInUp: false });
    }
  },

  login: async (credientials) => {
    set({ isLoggingIn: true });
    try {
      const res = await authService.login(credientials);
      //   set({authUser: res.user});
    } catch (error) {
      console.log("Error logging in: ", error);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await authService.logout();
      set({ authUser: null });
    } catch (error) {
        console.log("Error logging out: ",error);
        
    }
  },
}));

export default useAuthStore;
