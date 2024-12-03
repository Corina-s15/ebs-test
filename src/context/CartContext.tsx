import { FC, useEffect, useState } from 'react';
import { CartItem } from './type';
import { CartContext } from './utils';

export const CartProvider: FC<{ children: JSX.Element }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prev: CartItem[]) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id);
      
      const updatedCart = existingItem
        ? prev.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          )
        : [...prev, { ...item, quantity: 1 }];
  
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };
  
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);
  
  const removeFromCart = (id: number) => {
    setCart((prev) => {
      const updatedCart = prev.filter((item) => item.id !== id);
      
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      
      return updatedCart;
    });
  };
  

  const clearCart = () => setCart([]);
  const values = { cart, addToCart, removeFromCart, clearCart };

  return (
    <CartContext.Provider value={values}>
      {children}
    </CartContext.Provider>
  );
};

