import { ROUTES } from "@/routes/routes"
import { useNavigate } from "react-router-dom"

const Cart = () => {
  const navigate = useNavigate()
  return (
    <div className="mx-auto max-w-2xl px-6 py-20 text-center md:px-4">
      <div className="mb-6 text-7xl">🛒</div>
      <h2 className="mb-3 text-2xl font-black text-gray-900">
        Your cart is empty
      </h2>
      <p className="mb-8 text-gray-500">
        Looks like you haven't added anything yet. Let's fix that!
      </p>
      <button
        onClick={() => navigate(ROUTES.MENU)}
        className="rounded-2xl bg-[#FF7A00] px-8 py-4 font-bold text-white shadow-md shadow-orange-200 transition-colors hover:bg-[#E06600]"
      >
        🍽️ Browse Menu
      </button>
    </div>
  )
}

export default Cart
