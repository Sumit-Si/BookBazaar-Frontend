import React from "react";
import { useNavigate } from "react-router-dom";
import useCartStore from "../../store/useCartStore.js";
import { ArrowLeftIcon } from "lucide-react";
import { Trash2Icon } from "lucide-react";
import Container from "../../components/Container/Container.jsx";
import { useState } from "react";
import { useRef } from "react";

const CartPage = () => {
  const navigate = useNavigate();

  const { cart, cartItems } = useCartStore();

  const totalItems = cart?.length;
  const totalPrice = 3000;
  const onQuantityChange = (id, quantity) => {};
  const onRemove = () => {};

  // Calculate cart totals
  const cartSubtotal = Array.isArray(cart)
    ? cart.reduce((acc, currVal) => {
        const quantity = currVal?.quantity || 1;
        return acc + currVal?.book?.price * quantity;
      }, 0)
    : 0;

  return (
    <Container>
      <div className="min-h-screen bg-base-100 text-base-content">
        {/* BACK BUTTON */}
        <div className="px-6 py-8 flex items-center gap-4">
          <div>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-base-300 py-2 px-4 rounded-full shadow-md shadow-secondary/20 flex items-center gap-0.5 hover:text-secondary hover:shadow-lg transition duration-200 btn btn-outline btn-secondary"
            >
              <ArrowLeftIcon className="h-4 w-4" /> Back
            </button>
          </div>
          <h3 className="text-2xl text-primary font-semibold">Your Cart</h3>
        </div>

        {/* MAIN LAYOUT */}
        {cart?.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-base-content/80 mb-4">
              Your cart is empty!
            </p>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/books")}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-6 pb-20">
            {/* CART ITEMS */}
            <div className="lg:col-span-2 rounded-lg space-y-3 bg-base-200">
              {Array.isArray(cart) && cart.map((item) => (
                <div
                  key={item?._id}
                  className="flex flex-col md:flex-row border-b-2 border-secondary/30 p-5 items-center gap-6 shadow-sm"
                >
                  <img
                    src={item?.book.coverImage}
                    alt={item?.book.title}
                    className="w-32 object-cover rounded-md shadow-md"
                  />

                  <div className="flex-1 w-full">
                    <h3 className="text-lg text-base-content font-semibold">
                      {item?.book.title}
                    </h3>
                    <p className="text-sm text-base-content/80 capitalize">
                      by {item?.book?.author || "Unknown"}
                    </p>

                    <p className="text-md text-base-content font-medium py-2">
                      ${item?.book.price.toFixed(2)}
                    </p>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 border border-base-300 rounded-full py-1">
                        <button
                          type="button"
                          onClick={() =>
                            onQuantityChange(item._id, item?.quantity - 1)
                          }
                          className="btn btn-xs btn-outline btn-secondary btn-circle"
                          disabled={item?.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="text-sm font-medium w-6 text-center">
                          {item?.quantity || item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            onQuantityChange(item._id, item?.quantity + 1)
                          }
                          className="btn btn-xs btn-outline btn-secondary btn-circle"
                          disabled={item?.quantity >= item?.book.stock}
                        >
                          +
                        </button>
                      </div>

                      <p className="text-sm text-emerald-500 font-semibold">
                        In stock: {item?.book.stock}
                      </p>

                      <button
                        onClick={() => onRemove(item._id)}
                        className="btn btn-ghost btn-sm text-error flex items-center gap-1"
                      >
                        <Trash2Icon size={16} /> Remove
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <p className="font-semibold text-emerald-500 text-lg">
                      ${(item?.book.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CART SUMMARY */}
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
                <span className="text-emerald-500">
                  ${cartSubtotal.toFixed(2)}
                </span>
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
          </div>
        )}
      </div>
    </Container>
  );
};

export default CartPage;
