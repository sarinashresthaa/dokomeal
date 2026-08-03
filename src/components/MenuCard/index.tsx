import QuantityStepper from "@/components/QuantityStepper"
import VegBadge from "@/components/VegBadge"
import useCart, { type MenuItem } from "@/hooks/useCart"
import { useNavigate } from "react-router-dom"

type MenuCardProps = {
  item: MenuItem
}

const MenuCardUI = ({ item }: MenuCardProps) => {
  const navigate = useNavigate()
  const { cart, addToCart, increaseQuantity, decreaseQuantity } = useCart()

  const cartItem = cart.find((cartItem) => cartItem.id === item.id)

  return (
    <div
      onClick={() => navigate(`/${item.name}/${item.id}`)}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md"
    >
      <div className="relative h-48 overflow-hidden bg-orange-500">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <VegBadge isVeg={item.isVeg} className="absolute top-3 left-3" />
      </div>

      <div className="p-4">
        <h3 className="mb-1 text-base leading-tight font-bold text-gray-900">
          {item.name}
        </h3>

        <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-gray-500">
          {item.description}
        </p>
      </div>

      <div className="px-4 pb-4">
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-[#FF7A00]">
            Rs.{item.price}
          </span>

          {/* Covers the stepper too, so changing quantity
              from the grid does not open the item page */}
          <div onClick={(event) => event.stopPropagation()}>
            {cartItem ? (
              <QuantityStepper
                quantity={cartItem.quantity}
                itemName={item.name}
                onIncrease={() => increaseQuantity(item.id)}
                onDecrease={() => decreaseQuantity(item.id)}
              />
            ) : (
              <button
                className="cursor-pointer rounded-xl bg-[#FF7A00] px-4 py-2 text-sm font-bold text-white shadow-sm shadow-orange-200 transition-colors hover:bg-[#E06600]"
                onClick={(event) => {
                  event.stopPropagation()
                  addToCart(item)
                }}
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MenuCardUI
