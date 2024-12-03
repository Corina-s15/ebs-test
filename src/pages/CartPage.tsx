import { FC } from 'react';
import { useCart } from '../context/utils';
import { emptyMessage } from './utils';
import '../styles/CartPage.css';

const CartPage: FC = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();

  const handleQuantityChange = (id: number, change: number) => {
    const item = cart.find((item) => item.id === id);

    if (!item) return;

    const newQuantity = item.quantity + change;
    if (newQuantity <= 1) {
      removeFromCart(id);
    } else {
      addToCart({ ...item, quantity: newQuantity });
    }
  };

  const calculateTotal = () => cart.reduce((sum, { price, quantity }) => sum + price * quantity, 0).toFixed(2);

  const navigate = () => window.location.href = '/';

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>{emptyMessage}</p>
      ) : (
        <div>
          <ul className="cart-list">
            {cart.map(({ id, title, price, quantity }) => (
              <li key={id} className="cart-item">
                <div className="cart-item-details">
                  <span className="cart-item-title">{title}</span>
                  <span className="cart-item-price">${(price * quantity).toFixed(2)}</span>
                  <span className="cart-item-unit-price">(Price per item: ${price.toFixed(2)})</span>
                </div>

                <div className="cart-item-quantity">
                  <button onClick={() => handleQuantityChange(id, -1)}>-</button>
                  <span>{quantity}</span>
                  <button onClick={() => handleQuantityChange(id, 1)}>+</button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-total">
            <span>Total: ${calculateTotal()}</span>
          </div>

          <button className="clear-cart-button" onClick={clearCart}>Clear Cart</button>
        </div>
      )}

      <button className="navigate-button" onClick={navigate}>
        Back to Home
      </button>
    </div>
  );
};

export default CartPage;
