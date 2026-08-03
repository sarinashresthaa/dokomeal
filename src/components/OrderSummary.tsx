import type { CartItem } from "@/hooks/useCart"
import { ROUTES } from "@/routes/routes"
import { useNavigate } from "react-router-dom"

type OrderSummaryProps = {
  cart: CartItem[]
}
const OrderSummary = ({ cart }: OrderSummaryProps) => {
  const navigate = useNavigate()
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )
  const delivery = subtotal >= 500 ? 0 : 50
  const total = subtotal + delivery
  return (
    <div className="sticky top-20 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-lg font-black text-gray-900">Order Summary</h2>
      <div className="mb-4 space-y-3">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center justify-between text-sm">
            <span className="mr-3 truncate text-gray-600">
              {item.name} x {item.quantity}
            </span>
            <span className="shrink-0 font-semibold text-gray-900">
              Rs.{item.price * item.quantity}
            </span>
          </div>
        ))}
      </div>
      <div className="space-y-2 border-t border-gray-100 pt-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Subtotal</span>
          <span className="font-semibold">Rs.{subtotal}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Delivery</span>
          <span className="font-semibold">
            {delivery === 0 ? "Free" : `Rs.${delivery}`}
          </span>
        </div>
        <p className="text-xs text-gray-400">
          Free delivery on orders above Rs. 500
        </p>
      </div>
      <div className="mt-4 mb-6 flex items-center justify-between border-t border-gray-100 pt-4">
        <span className="text-lg font-black text-gray-900">Total</span>
        <span className="text-2xl font-black text-[#FF7A00]">Rs.{total}</span>
      </div>
      <button className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-green-500 py-4 text-base font-black text-white shadow-lg shadow-green-200 transition-all hover:scale-105 hover:bg-green-600">
        Order Via WhatsApp
      </button>
      <button className="mt-3 w-full rounded-2xl bg-gray-100 py-3 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-200 cursor-pointer" onClick={() => navigate(ROUTES.MENU)}>
        + Add More Items
      </button>
    </div>
  )
}

export default OrderSummary
