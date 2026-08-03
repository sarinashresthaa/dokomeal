import { useEffect, useState } from "react"

export type MenuItem = {
  id: number
  name: string
  price: number
  image: string
  description: string
  isVeg: boolean
  isPopular: boolean
  prepTime: string
  spiceLevel: string
  keyIngredients: string[]
  rating: number
}

export type CartItem = MenuItem & {
  quantity: number
}

const STORAGE_KEY = "cart"

// The cart lives in sessionStorage, so it belongs to this browsing
// session only and is gone once the tab is closed
const readCart = (): CartItem[] => {
  try {
    const stored = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "[]")

    return Array.isArray(stored) ? stored : []
  } catch {
    return []
  }
}

const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>(readCart)

  // Listen for cart changes
  useEffect(() => {
    const handleCartUpdate = () => {
      setCart(readCart())
    }

    window.addEventListener("cartUpdated", handleCartUpdate)

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate)
    }
  }, [])

  // Save cart and notify other components
  const saveCart = (updatedCart: CartItem[]) => {
    setCart(updatedCart)
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCart))

    window.dispatchEvent(new Event("cartUpdated"))
  }

  const addToCart = (item: MenuItem | undefined) => {
    if (!item) return

    const existingItem = cart.find(
      (cartItem) => cartItem.id === item.id
    )

    let updatedCart: CartItem[]

    if (existingItem) {
      updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id
          ? {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            }
          : cartItem
      )
    } else {
      updatedCart = [
        ...cart,
        {
          ...item,
          quantity: 1,
        },
      ]
    }

    saveCart(updatedCart)
  }

  const increaseQuantity = (id: number) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    )

    saveCart(updatedCart)
  }

  const decreaseQuantity = (id: number) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
      .filter((item) => item.quantity > 0)

    saveCart(updatedCart)
  }

  const removeFromCart = (id: number) => {
    const updatedCart = cart.filter(
      (item) => item.id !== id
    )

    saveCart(updatedCart)
  }

  // The order has left for WhatsApp, so the cart has served its purpose
  const clearCart = () => {
    saveCart([])
  }

  return {
    cart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  }
}

export default useCart