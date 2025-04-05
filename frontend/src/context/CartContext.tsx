import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { Book } from '../Book';

export interface CartItem extends Book {
  quantity: number;
  subtotal: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (book: Book) => void;
  removeFromCart: (bookId: number) => void;
  updateQuantity: (bookId: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from session storage
  useEffect(() => {
    const storedCart = sessionStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to session storage on change
  useEffect(() => {
    sessionStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (book: Book) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.bookID === book.bookID);
      if (existing) {
        return prev.map((item) =>
          item.bookID === book.bookID
            ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: (item.quantity + 1) * item.price,
              }
            : item
        );
      } else {
        return [...prev, { ...book, quantity: 1, subtotal: book.price }];
      }
    });
  };

  const removeFromCart = (bookId: number) => {
    setCart((prev) => prev.filter((item) => item.bookID !== bookId));
  };

  const updateQuantity = (bookId: number, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.bookID === bookId
          ? {
              ...item,
              quantity,
              subtotal: quantity * item.price,
            }
          : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((acc, item) => acc + item.subtotal, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
