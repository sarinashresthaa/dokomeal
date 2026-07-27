type MenuCardProps = {
  item: {
    id: number
    name: string
    price: number
    image: string
    description: string
    isVeg: boolean
  }
}

const MenuCardUI = ({ item }: MenuCardProps) => {
  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="relative h-48 cursor-pointer overflow-hidden bg-orange-500">
        <img
          src={item.image}
          alt={item.image}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${item.isVeg ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
          >
            <span
              className={`h-2 w-2 rounded-full ${item.isVeg ? "bg-green-700" : "bg-red-500"}`}
            ></span>{" "}
            {item.isVeg ? "Veg" : "Non-Veg"}
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="cursor-pointer">
          <h3 className="mb-1 text-base leading-tight font-bold text-gray-900">
            {item.name}{" "}
          </h3>
          <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-gray-500">
            {item.description}{" "}
          </p>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-[#FF7A00]">
            Rs.{item.price}
          </span>
          <button className="rounded-xl bg-[#FF7A00] px-4 py-2 text-sm font-bold text-white shadow-sm shadow-orange-200 transition-colors hover:bg-[#E06600]">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default MenuCardUI
