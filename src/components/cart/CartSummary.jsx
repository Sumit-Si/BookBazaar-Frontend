import React from "react";
import { useNavigate } from "react-router-dom";
import useCartStore from "../../store/useCartStore.js";

const CartSummary = () => {
  const { cart } = useCartStore();
  const navigate = useNavigate();

  const totalItems = cart?.length;

  // Calculate cart totals
  const cartSubtotal = Array.isArray(cart)
    ? cart.reduce((acc, currVal) => {
        const quantity = currVal?.quantity || 1;
        return acc + currVal?.book?.price * quantity;
      }, 0)
    : 0;

  return (
    <div className="bg-base-200 p-6 rounded-xl shadow-md h-fit sticky top-24">
      <h3 className="text-xl font-bold mb-4">Order Summary</h3>

      <div className="flex justify-between text-sm mb-2">
        <span>Total Items</span>
        <span>{totalItems}</span>
      </div>

      <div className="flex justify-between text-sm mb-2">
        <span>Subtotal</span>
        <span>${cartSubtotal.toFixed(2)}</span>
      </div>

      <div className="divider my-2"></div>

      <div className="flex justify-between text-base font-semibold mb-4">
        <span>Total Amount</span>
        <span className="text-emerald-500">${cartSubtotal.toFixed(2)}</span>
      </div>

      <button
        className="btn btn-primary w-full"
        onClick={() => navigate("/checkout")}
      >
        Proceed to Checkout
      </button>
      <button
        className="btn btn-outline w-full mt-2"
        onClick={() => navigate("/books")}
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default CartSummary;
