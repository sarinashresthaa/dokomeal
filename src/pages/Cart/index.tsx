import { ROUTES } from "@/routes/routes"
import useCart from "@/hooks/useCart"
import useDeliveryDetail from "@/hooks/useDeliveryDetail"
import { FormProvider } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import CartItem from "@/components/CartItem"
import DeliveryDetail from "@/components/DeliveryDetail"
import OrderSummary from "@/components/OrderSummary"

const Cart = () => {
  const navigate = useNavigate()
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } =
    useCart()
  const deliveryForm = useDeliveryDetail()

  if (cart.length === 0) {
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

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="mb-2 text-3xl font-black text-gray-900 sm:text-4xl">
        Your Cart
      </h1>
      <p className="mb-8 text-gray-500">{cart.length} items ready to order</p>
      <FormProvider {...deliveryForm}>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} removeFromCart={removeFromCart}/>
            ))}
            <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <DeliveryDetail />
            </div>
          </div>
          <div className="lg:col-span-1">
            <OrderSummary cart={cart} clearCart={clearCart} />
          </div>
        </div>
      </FormProvider>
    </div>
  )
}

export default Cart
