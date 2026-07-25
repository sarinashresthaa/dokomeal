import { ROUTES } from "@/routes/routes"
import { Link } from "react-router-dom"
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="mt-20 bg-gray-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF7A00]">
                <span className="text-xl">🍽️</span>
              </div>
              <div>
                <div className="text-lg leading-none font-bold">DokoMeal</div>
                <div className="text-xs leading-none font-medium text-[#FF7A00]">
                  Fresh · Fast · Delicious
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Freshly prepared meals delivered straight to your doorstep.
              Quality you can taste in every bite.
            </p>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-bold tracking-wider text-gray-300 uppercase">
              QUICK LINKS
            </div>
            <button className="flex flex-col gap-2 text-sm text-gray-400 capitalize transition-colors">
              <Link to={ROUTES.HOME} className="hover:text-[#FF7A00]">
                Home
              </Link>
              <Link to={ROUTES.MENU} className="hover:text-[#FF7A00]">
                Menu
              </Link>
              <Link to={ROUTES.ABOUT} className="hover:text-[#FF7A00]">
                About
              </Link>
              <Link to={ROUTES.CART} className="hover:text-[#FF7A00]">
                🛒 Cart
              </Link>
            </button>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-bold tracking-wider text-gray-300 uppercase">
              CONTACT
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span className="mt-0.5">📍</span>
                <span> Kathmandu, Bagmati Province, Nepal</span>
              </li>
              <li className="flex items-start gap-2">
                <span>📞</span> <span>+977 9768517425</span>
              </li>
              <li className="flex items-start gap-2">
                <span>✉️</span>
                <span>dokomandunepal@gmail.com</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-bold tracking-wider text-gray-300 uppercase">
              FOLLOW US
            </h3>
            <div className="mb-6 flex gap-3">
              <a
                href="https://www.facebook.com/dokomandu.nepal"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook />
              </a>
              <a
                href="https://www.instagram.com/dokomandu_nepal/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                href="www.tiktok.com/@dokomandu_nepal"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTiktok />
              </a>
            </div>
            <h3 className="mb-2 text-sm font-bold tracking-wider text-gray-300 uppercase">
              HOURS
            </h3>
            <p className="text-sm text-gray-400">
              Mon-Fri: 10:00 AM - 10:00 PM
            </p>
            <p className="text-sm text-gray-400">
              Sat-Sun: 11:00 AM - 11:00 PM
            </p>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-gray-800 pt-6 sm:flex-row">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} DokoMeal. All rights reserved.
          </p>
          <p className="text-sm text-gray-500">Made with ❤️ in Kathmandu</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
