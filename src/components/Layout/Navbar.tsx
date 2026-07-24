import { ROUTES } from "@/routes/routes"
import { Link, useLocation, useNavigate } from "react-router-dom"

const menus = [
  { name: "Home", href: ROUTES.HOME },
  { name: "Product", href: ROUTES.PRODUCT },
  { name: "About", href: ROUTES.ABOUT },
]

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-sm">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          <button
            onClick={() => navigate(ROUTES.HOME)}
            className="group flex items-center gap-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FF7A00] shadow-md shadow-orange-200">
              <span className="text-xl">🍽️</span>
            </div>
            <div className="text-left">
              <div className="text-base leading-none font-bold text-gray-900">
                DokoMeal
              </div>
              <div className="text-[10px] leading-none font-semibold text-[#FF7A00]">
                Fresh · Fast · Delicious
              </div>
            </div>
          </button>
          <div className="flex items-center gap-1">
            {menus.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className={
                  location.pathname === item.href
                    ? "rounded-xl bg-orange-50 px-4 py-2 text-sm font-semibold text-[#FF7A00] transition-all hover:bg-orange-50 hover:text-[#FF7A00]"
                    : "px-4 py-2 text-sm font-semibold text-gray-700"
                }
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button className="relative flex items-center gap-2 px-4 py-2 text-[#FF7A00] font-semibold text-sm bg-orange-50 hover:bg-orange-100 hover:text-[#FF7A00] rounded-xl transition-colors">
              <span>🛒</span>
              <span>Cart</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
