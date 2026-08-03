import { ROUTES } from "@/routes/routes"
import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { IoCloseOutline, IoReorderThreeOutline } from "react-icons/io5"
import useCart from "@/hooks/useCart"

const menus = [
  { name: "Home", href: ROUTES.HOME },
  { name: "Menu", href: ROUTES.MENU },
  { name: "About", href: ROUTES.ABOUT },
]

const Navbar = () => {
  const { cart } = useCart()
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const [open, setOpen] = useState<boolean>(false)
  const navigate = useNavigate()
  const location = useLocation()
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
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
          <div className="hidden items-center gap-1 md:flex">
            {menus.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className={
                  location.pathname === item.href
                    ? "rounded-xl bg-orange-50 px-4 py-2 text-sm font-semibold text-[#FF7A00] transition-all"
                    : "rounded-xl px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-orange-50 hover:text-[#FF7A00]"
                }
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              className="relative flex items-center gap-2 rounded-xl bg-orange-50 px-4 py-2 text-sm font-semibold text-[#FF7A00] transition-colors hover:bg-orange-100 hover:text-[#FF7A00]"
              onClick={() => navigate(ROUTES.CART)}
            >
              <span>🛒</span>
              <span>Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#FF7A00] text-xs font-bold text-white">
                  {totalItems}{" "}
                </span>
              )}
            </button>
            <button
              className="rounded-xl p-2 text-gray-600 transition-colors hover:bg-gray-100 md:hidden"
              onClick={() => setOpen(!open)}
            >
              {open ? (
                <IoCloseOutline size={24} />
              ) : (
                <IoReorderThreeOutline size={24} />
              )}
            </button>
          </div>
        </div>

        {open && (
          <div
            className="md:hiden absolute left-0 z-100 flex w-full flex-col gap-1 bg-white pb-4"
            onClick={() => setOpen(false)}
          >
            {menus?.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className={
                  location.pathname === item.href
                    ? "rounded-xl bg-orange-50 px-4 py-2 text-sm font-semibold text-[#FF7A00] transition-all"
                    : "rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-orange-50 hover:text-[#FF7A00]"
                }
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
