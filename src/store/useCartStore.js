import { create } from "zustand";
import cartService from "../api/cartService.js";
import toast from "react-hot-toast";

const useCartStore = create((set) => ({
  // cart is an array of all items in the cart, each item is an object with properties of bookId, quantity and price
  cart: [],
  // cartItems is an object where the key is the bookId and the value is the quantity of the book in the cart
  cartItems: {},
  isCartLoading: false,
  isCartCreating: false,
  isCartUpdating: false,
  isCartDeleting: false,

  addToCart: async (cartData) => {
    try {
      set({ isCartCreating: true });
      const res = await cartService.addToCart(cartData);
      console.log("add to cart res: ", res);
      set((state) => ({
        cart: [...state.cart, res.cart],
      }));
      toast.success(res?.message);
    } catch (error) {
      console.log("Error while adding to cart: ", error);
      toast.error(error?.response?.data?.error || error?.response?.data?.message);
    } finally {
      set({ isCartCreating: false });
    }
  },
  getCarts: async () => {
    try {
      set({isCartLoading: true});
      const res = await cartService.getCarts();
      console.log("carts res: ",res);
      set({cart: res?.carts || []})
    } catch (error) {
      console.log("Error while fetching cartData: ",error);
      
    }finally {
      set({isCartLoading: false});
    }
  },
  updateCartItem: async (itemId, updateCartItemData) => {},
  deleteCartItem: async (itemId) => {},
}));

export default useCartStore;
