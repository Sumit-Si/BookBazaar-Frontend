import { useNavigate } from "react-router-dom";
import useCartStore from "../../store/useCartStore.js";
import Container from "../../components/Container/Container.jsx";
import CartItem from "../../components/cart/CartItem.jsx";
import CartSummary from "../../components/cart/CartSummary.jsx";
import BackBtnWithTitle from "../../components/BackBtnWithTitle.jsx";

const CartPage = () => {
  const navigate = useNavigate();

  const { cart, cartItems } = useCartStore();

  
  const totalPrice = 3000;
  // const onQuantityChange = (id, quantity) => {};
  // const onRemove = () => {};

  

  return (
    <Container>
      <div className="min-h-screen bg-base-100 text-base-content">
        {/* BACK BUTTON */}
        <BackBtnWithTitle title={"Your Cart"} />

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
              {Array.isArray(cart) &&
                cart.map((item) => (
                  <div key={item?.id}>
                    <CartItem item={item} />
                  </div>
                ))}
            </div>

            {/* CART SUMMARY */}
            <CartSummary />
          </div>
        )}
      </div>
    </Container>
  );
};

export default CartPage;
