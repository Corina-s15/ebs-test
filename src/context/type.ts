export interface CartItem {
    id: number;
    title: string;
    price: number;
    category: string;
    image: string;
    quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}
  