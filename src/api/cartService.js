import axiosInstance from "./axios";

const cartService = {
  addToCart: async (cartData) => {
    const response = await axiosInstance.post("/cart", cartData);
    return response.data;
  },
  getCarts: async () => {
    const response = await axiosInstance.get("/cart");
    return response.data;
  },
  updateCartItem: async (itemId,updateCartItemData) => {
    const response = await axiosInstance.put(`/cart/${itemId}`,updateCartItemData);
    return response.data;
  },
  deleteCartItem: async (itemId) => {
    const response = await axiosInstance.get(`/cart/${itemId}`);
    return response.data;
  },
};

export default cartService;
