import { createContext, useContext } from "react";
import { CartContextType } from "./type";

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
      throw new Error('Make sure your component is wrapped inside <CartProvider>');
    }
    return context;
};
  