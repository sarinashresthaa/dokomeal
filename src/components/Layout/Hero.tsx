import heroImg from "@/assets/Container.png"
import { ROUTES } from "@/routes/routes"
import { Link } from "react-router-dom"

const Hero = () => {
  return (
    <section className="mx-auto flex max-w-6xl flex-col-reverse items-center justify-between gap-8 px-4 py-12 sm:px-6 md:flex-row">
      <div className="flex-1 text-center md:text-left">
        <h1 className="mb-4 text-4xl font-black sm:text-5xl">
          <div>Fresh Food,</div>
          <span className="text-[#FF7A00]">Fast Delivery</span>
        </h1>

        <p className="mb-8 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
          Delicious meals prepared fresh and delivered to your doorstep.
          Experience the joy of restaurant-quality food at home.
        </p>

        <Link
          to={ROUTES.MENU}
          className="inline-flex items-center gap-2 rounded-2xl bg-[#FF7A00] px-8 py-4 font-bold text-white shadow-xl shadow-orange-900/30 transition-all hover:scale-105 hover:bg-[#E06600]"
        >
          Browse Menu
        </Link>
      </div>

      <div className="mx-auto w-full max-w-xs flex-1 sm:max-w-sm md:max-w-none">
        <img
          src={heroImg}
          alt="Freshly prepared delicious food"
          className="h-auto w-full object-cover"
        />
      </div>
    </section>
  )
}

export default Hero
