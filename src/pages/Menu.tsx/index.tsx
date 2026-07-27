import MenuCardUI from "@/components/MenuCard"
import menuData from "@/data/menu.json"
import { useState } from "react"

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState(0)

  const filteredItems =
    selectedCategory === 0
      ? menuData.categories.flatMap((category) => category.items)
      : (menuData.categories.find(
          (category) => category.id === selectedCategory
        )?.items ?? [])

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-black text-gray-900 capitalize sm:text-4xl">
          Our Menu
        </h1>
        <p className="text-gray-500">
          Fresh, made-to-order meals — choose your favourite
        </p>
      </div>
      <div className="relative mb-6">
        <span className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400">
          🔍
        </span>
        <input
          type="text"
          placeholder="Search for a dish..."
          className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pr-4 pl-11 text-sm font-medium placeholder-gray-400 transition-all focus:border-transparent focus:ring-2 focus:ring-[#FF7A00] focus:outline-none"
        />
      </div>
      <div className="mb-8 no-scrollbar flex gap-2 overflow-x-auto pb-3">
        <button
          onClick={() => setSelectedCategory(0)}
          className={`flex shrink-0 items-center rounded-full px-4 py-2 text-sm font-semibold transition-all ${selectedCategory === 0 ? "bg-[#FF7A00] text-white" : "bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-[#FF7A00]"}`}
        >
          All
        </button>
        {menuData.categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex shrink-0 items-center rounded-full px-4 py-2 text-sm font-semibold transition-all ${selectedCategory === category.id ? "bg-[#FF7A00] text-white" : "bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-[#FF7A00]"}`}
          >
            {category.icon} {category.name}
          </button>
        ))}
      </div>
      <p className="mb-6 text-sm font-medium text-gray-500">
        {filteredItems.length} items found
      </p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredItems.map((item) => (
          <MenuCardUI key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

export default Menu
