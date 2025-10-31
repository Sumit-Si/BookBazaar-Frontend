import { create } from "zustand";

const useCartStore = create((set) => ({
    cart: [],
    cartItems: [],
    isCartLoading: false,
    isCartCreating: false,
    isCartUpdating: false,
    isCartDeleting: false,

}))

export default useCartStore;