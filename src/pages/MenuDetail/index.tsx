import MenuCardUI from "@/components/MenuCard"
import QuantityStepper from "@/components/QuantityStepper"
import VegBadge from "@/components/VegBadge"
import { Button } from "@/components/ui/button"
import menuData from "@/data/menu.json"
import useCart from "@/hooks/useCart"
import { ROUTES } from "@/routes/routes"
import { useNavigate, useParams } from "react-router-dom"

const MenuDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const { cart, addToCart, increaseQuantity, decreaseQuantity } = useCart()

  const itemDetail = [
    { icon: "⏱️", label: "Prep Time", key: "prepTime" },
    { icon: "🌶️", label: "Spice Level", key: "spiceLevel" },
    { icon: "⭐", label: "Rating", key: "rating" },
  ] as const

  const item = menuData.categories
    .flatMap((category) => category.items)
    .find((item) => item.id === Number(id))

  const category = menuData.categories.find((category) =>
    category.items.some((menuItem) => menuItem.id === Number(id))
  )

  const relatedItems =
    category?.items.filter((item) => item.id !== Number(id)) ?? []

  const cartItem = cart.find((cartItem) => cartItem.id === item?.id)

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <button
        className="mb-8 flex cursor-pointer items-center gap-2 text-sm font-semibold text-gray-500 transition-colors hover:text-[#FF7A00]"
        onClick={() => navigate(ROUTES.MENU)}
      >
        ← Back to Menu
      </button>

      <div className="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Image */}
        <div className="relative h-72 overflow-hidden rounded-3xl bg-orange-50 sm:h-96">
          <img
            src={item?.image}
            alt={item?.name}
            className="h-full w-full object-cover"
          />

          <VegBadge isVeg={!!item?.isVeg} className="absolute top-4 left-4" />
        </div>

        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-[#FF7A00]">
              {category?.icon}
              {category?.name}
            </span>
          </div>

          <h1 className="mb-3 text-3xl font-black text-gray-900 sm:text-4xl">
            {item?.name}
          </h1>

          <p className="mt-4 mb-6 text-base leading-relaxed text-gray-600">
            {item?.description}
          </p>

          {/* Prep / Spice / Rating */}
          <div className="mb-6 grid grid-cols-3 gap-4">
            {itemDetail.map((detail) => (
              <div
                key={detail.key}
                className="rounded-2xl bg-gray-50 p-4 text-center"
              >
                <div className="mb-1 text-xl">{detail.icon}</div>

                <div className="text-xs font-medium text-gray-500">
                  {detail.label}
                </div>

                <div className="text-sm font-bold text-gray-900">
                  {detail.key === "spiceLevel" ? (
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs ${
                        item?.spiceLevel === "Mild"
                          ? "bg-green-100 text-green-700"
                          : item?.spiceLevel === "Medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item?.spiceLevel}
                    </span>
                  ) : (
                    item?.[detail.key]
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <h3 className="mb-3 text-sm font-bold text-gray-900">
              Key Ingredients
            </h3>

            <div className="flex flex-wrap gap-2">
              {item?.keyIngredients.map((ingredient) => (
                <span
                  key={ingredient}
                  className="rounded-full border border-orange-100 bg-orange-50 px-3 py-1.5 text-xs font-medium text-orange-700"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div>
              <div className="text-3xl font-black text-[#FF7A00]">
                Rs.{item?.price}
              </div>

              <div className="text-xs font-medium text-gray-400">
                inclusive of all taxes
              </div>
            </div>

            {cartItem ? (
              <>
                <QuantityStepper
                  size="lg"
                  quantity={cartItem.quantity}
                  itemName={item!.name}
                  onIncrease={() => increaseQuantity(item!.id)}
                  onDecrease={() => decreaseQuantity(item!.id)}
                />
                <Button className="hidden h-14 w-40 md:block">
                  {" "}
                  View Cart
                </Button>
              </>
            ) : (
              <button
                className="flex-1 cursor-pointer rounded-2xl bg-[#FF7A00] py-4 text-base font-black text-white shadow-lg shadow-orange-200 transition-all hover:scale-105 hover:bg-[#E06600]"
                onClick={() => addToCart(item)}
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-6 text-2xl font-black text-gray-900">
          You May Also Like
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {relatedItems.map((item) => (
            <MenuCardUI key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MenuDetail
