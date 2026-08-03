import FeatureGrid from "@/components/FeatureGrid"
import Hero from "@/components/Layout/Hero"
import MenuCardUI from "@/components/MenuCard"
import menuData from "@/data/menu.json"
import { ROUTES } from "@/routes/routes"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const featureItem = [
    {
      icon: "🌿",
      title: "Fresh Ingredients",
      description: "We source the finest local produce daily.",
    },
    {
      icon: "🧼",
      title: "Hygienic Kitchen",
      description: "Prepared in a certified, spotless kitchen.",
    },
    {
      icon: "⚡",
      title: "Fast Delivery",
      description: "Hot meals at your door in under 30 minutes.",
    },
    {
      icon: "💰",
      title: "Affordable Prices",
      description: "Premium quality without breaking the bank.",
    },
  ]
  const popularItem = menuData.categories
    .flatMap((category) => category.items)
    .filter((item) => item.isPopular)
    .sort((a, b) => b.rating - a.rating)

  const navigate = useNavigate()

  return (
    <div>
      <Hero />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-black text-gray-900 sm:text-4xl">
            Browse Categories
          </h2>
          <p className="text-base text-gray-500">
            Find exactly what you're craving
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-5">
          {menuData.categories.map((item) => (
            <button
              key={item.id}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-gray-100 bg-white p-5 transition-all hover:-translate-y-1 hover:border-orange-200 hover:bg-orange-50 hover:shadow-md"
              onClick={() => navigate(`${ROUTES.MENU}?cat=${item.id}`)}
            >
              <span className="text-3xl transition-transform group-hover:scale-110">
                {item.icon}
              </span>
              <span className="text-center text-xs leading-tight font-bold text-gray-700 group-hover:text-[#FF7A00]">
                {item.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="mb-2 text-3xl font-black text-gray-900 sm:text-4xl">
                Popular Items
              </h2>
              <p className="text-gray-500">Crowd favourites you'll love</p>
            </div>
            <button
              className="cursor-pointer text-sm font-bold text-[#FF7A00] hover:underline"
              onClick={() => navigate(ROUTES.MENU)}
            >
              View All →
            </button>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {popularItem.slice(0, 6).map((item) => (
              <MenuCardUI key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-black text-gray-900 sm:text-4xl">
            Why Choose US
          </h2>
          <p className="text-gray-500">
            We go above and beyond for every order
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featureItem.map((item) => (
            <FeatureGrid
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>

      <div className="mx-4 mb-16 max-w-6xl sm:mx-6 lg:mx-auto">
        <div className="relative flex flex-col items-center justify-between gap-6 overflow-hidden rounded-3xl bg-[#FF7A00] p-8 sm:p-12 md:flex-row">
          <div className="bg-opacity-10 absolute -top-10 -right-10 h-48 w-48 rounded-full bg-white"></div>
          <div className="bg-opacity-10 absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white"></div>
          <div className="relative">
            <h2 className="mb-2 text-2xl font-black text-white sm:text-3xl">
              Hungry? Order Now!
            </h2>
            <p className="text-center text-sm text-orange-100 md:pl-3">
              Free delivery on orders above Rs. 500
            </p>
          </div>
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center gap-2 rounded-2xl bg-white px-8 py-4 font-black whitespace-nowrap text-[#FF7A00] shadow-lg transition-colors hover:bg-orange-50"
          >
            💬Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}

export default Home
