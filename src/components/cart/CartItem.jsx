import { Trash2Icon } from "lucide-react";
import React from "react";

const CartItem = ({ item }) => {
  const onQuantityChange = () => {};
  const onRemove = () => {};
  return (
    <div
      //   key={item?._id}
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
              onClick={() => onQuantityChange(item._id, item?.quantity - 1)}
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
              onClick={() => onQuantityChange(item._id, item?.quantity + 1)}
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
  );
};

export default CartItem;
