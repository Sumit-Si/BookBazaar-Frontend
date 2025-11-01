import React from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore.js";
import { User } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import useCartStore from "../../store/useCartStore.js";
import { useEffect } from "react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const { isCartLoading, cart, getCarts } = useCartStore();
  console.log("cart", cart);

  useEffect(() => {
    if (authUser) {
      getCarts();
    }
  }, [getCarts, authUser]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log("Error on logout: ", error);
    }
  };

  const cartCount = cart?.length || 0;

  // Calculate cart totals
  const cartSubtotal = Array.isArray(cart)
    ? cart.reduce((acc, currVal) => {
        const quantity = currVal?.quantity || 1;
        return acc + currVal?.book?.price * quantity;
      }, 0)
    : 0;

  console.log("cartSubTotal", cartSubtotal);

  return (
    <div className="navbar bg-base-300/80 px-3 z-50 shadow-md shadow-base-200 sticky top-1 backdrop-blur-sm left-0 rounded-lg">
      <div className="flex-1">
        <Link to={"/"} className="text-lg font-bold">
          BookBazaar
        </Link>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end mr-1">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle"
            aria-label="Shopping cart"
          >
            <div className="indicator">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="badge badge-sm text-secondary indicator-item">
                  {cartCount}
                </span>
              )}
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-200 z-1 mt-3 w-52 shadow"
          >
            <div className="card-body">
              {isCartLoading ? (
                <div className="flex justify-center py-4">
                  <span className="loading loading-spinner loading-md"></span>
                </div>
              ) : cartCount === 0 ? (
                <div className="text-center py-4">
                  <p className="text-base-content/60">Your cart is empty</p>
                  <Link to="/books" className="btn btn-primary btn-sm mt-2">
                    Browse Books
                  </Link>
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-bold">
                    {cartCount} {cartCount === 1 ? "Item" : "Items"}
                  </h3>
                  <h3 className="font-semibold">
                    Subtotal: <span className="text-emerald-500">${cartSubtotal.toFixed(2)}</span>
                  </h3>

                  {/* Cart Items Preview (Optional) */}
                  <div className="max-h-48 overflow-y-auto space-y-2 my-2">
                    {cart.slice(0, 3).map((item) => (
                      <div
                        key={item._id}
                        className="flex gap-3 items-center text-sm"
                      >
                        <img
                          src={item?.book?.coverImage}
                          alt={item?.book?.title}
                          className="w-12 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="truncate font-medium">{item?.book?.title}</p>
                          <p className="text-base-content/60">
                            ${item?.book?.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                    {cartCount > 3 && (
                      <p className="text-sm text-base-content/60 text-center">
                        +{cartCount - 3} more items
                      </p>
                    )}
                  </div>

                  <div className="card-actions">
                    <Link
                      to="/cart"
                      className="btn btn-primary btn-block btn-sm"
                    >
                      View Cart
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full flex bg-secondary/15 items-center justify-center">
              {authUser ? (
                <img
                  alt="Tailwind CSS Navbar component"
                  src={authUser?.avatar?.url}
                />
              ) : (
                <User className="h-5 w-5" />
              )}
            </div>
          </div>
          {authUser && (
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to={"/me"} className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to={"/settings"}>Settings</Link>
              </li>
              <li>
                <Link to={"/orders"}>Orders</Link>
              </li>
              <li>
                <p onClick={handleLogout}>Logout</p>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
