import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const storageKey = "alsama-cart";

function normalizeCartItems(value) {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item) => item && typeof item === "object" && item.id && item.title)
    .map((item) => ({
      ...item,
      quantity: Math.max(1, Number(item.quantity) || 1)
    }));
}

function readStoredCart() {
  try {
    const stored = window.localStorage.getItem(storageKey);
    return stored ? normalizeCartItems(JSON.parse(stored)) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readStoredCart);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    function handleStorage(event) {
      if (event.key !== storageKey) return;

      try {
        setItems(event.newValue ? normalizeCartItems(JSON.parse(event.newValue)) : []);
      } catch {
        setItems([]);
      }
    }

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const value = useMemo(() => ({
    items,
    count: items.reduce((total, item) => total + item.quantity, 0),
    addItem(item) {
      setItems((current) => {
        const existing = current.find((entry) => entry.id === item.id);
        if (existing) {
          return current.map((entry) =>
            entry.id === item.id ? { ...entry, quantity: entry.quantity + 1 } : entry
          );
        }

        return [...current, { ...item, quantity: 1 }];
      });
    },
    removeItem(id) {
      setItems((current) => current.filter((item) => item.id !== id));
    },
    updateItem(id, updates) {
      setItems((current) => current.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ));
    },
    clearCart() {
      setItems([]);
    }
  }), [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
