import React from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import { User } from "lucide-react";
import { ShoppingCart } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log("Error on logout: ", error);
    }
  };

  return (
    <div className="navbar bg-base-300/80 px-3 z-50 shadow-md shadow-base-200 sticky top-1 backdrop-blur-sm left-0 rounded-lg">
      <div className="flex-1">
        <Link to={"/"} className="text-lg font-bold">
          BookBazaar
        </Link>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <ShoppingCart className="w-5 h-5" />
              <span className="badge badge-sm indicator-item">0</span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow"
          >
            <div className="card-body">
              <span className="text-lg font-bold">0 Items</span>
              <span className="text-info">Subtotal: $0</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">View cart</button>
              </div>
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
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
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
                <Link className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link>Settings</Link>
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
