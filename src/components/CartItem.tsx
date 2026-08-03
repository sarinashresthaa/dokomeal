import type { CartItem as CartItemType } from "@/hooks/useCart"
import { useState } from "react"
import { IoClose } from "react-icons/io5"

type CartItemProps = {
  item: CartItemType
  increaseQuantity: (id: number) => void
  decreaseQuantity: (id: number) => void
  removeFromCart: (id: number) => void
}

const CartItem = ({
  item,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
}: CartItemProps) => {
  const [active, setActive] = useState<"+" | "-" | null>(null)
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-orange-50">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-base font-bold text-gray-900">
          {item.name}
        </h3>
        <div className="mt-1 flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${item.isVeg ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
          >
            <span
              className={`h-2 w-2 rounded-full ${item.isVeg ? "bg-green-700" : "bg-red-500"}`}
            ></span>
            {item.isVeg ? "Veg" : "Non-Veg"}
          </span>
        </div>
        <div className="mt-1 text-base font-bold text-[#FF7A00]">
          {item.price}
        </div>
      </div>
      <div className="flex flex-col items-end gap-3">
        <button
          className="p-1 text-gray-400 transition-colors hover:text-red-500 cursor-pointer"
          onClick={() => removeFromCart(item.id)}
        >
          <IoClose />
        </button>
        <div className="flex h-8 items-center overflow-hidden rounded-full border-2 border-[#FF7A00]">
          <button
            onClick={() => {
              decreaseQuantity(item.id)
              setActive("-")
            }}
            className={`flex w-8 cursor-pointer items-center justify-center text-base font-bold transition-colors ${active === "-" ? "bg-[#FF7A00] text-white" : "bg-white text-[#FF7A00] hover:bg-orange-50"}`}
          >
            -
          </button>
          <span className="flex w-8 items-center justify-center bg-white text-sm font-bold text-[#111]">
            {item.quantity}
          </span>
          <button
            onClick={() => {
              increaseQuantity(item.id)
              setActive("+")
            }}
            className={`flex w-8 cursor-pointer items-center justify-center text-base font-bold transition-colors ${active === "+" ? "bg-[#FF7A00] text-white" : "bg-white text-[#FF7A00] hover:bg-orange-50"}`}
          >
            +
          </button>
        </div>
        <div className="text-sm font-black text-gray-900">
          Rs.{item.price * item.quantity}
        </div>
      </div>
    </div>
  )
}

export default CartItem
