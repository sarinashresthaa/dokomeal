import FeatureBadge from "@/components/FeatureBadge"
import ReviewCard from "@/components/ReviewCard"
import StatCard from "@/components/StatCard"

const About = () => {
  const featureData = [
    { text: "🌿 Locally Sourced" },
    { text: "🧼 Hygienic Kitchen" },
    { text: "⚡ Fast Delivery" },
    { text: "💯 Fresh Daily" },
  ]
  const statItem = [
    { value: "5000+", label: "Orders Delivered" },
    { value: "1000+", label: "Happy Customers" },
    { value: "Daily", label: "Fresh Ingredients" },
    { value: "<30min", label: "Avg Delivery Time" },
  ]
  const reviewItem = [
    {
      text: "The chicken momo is absolutely out of this world. I order every week!",
      name: "Sita Sharma",
      city: "Kathmandu",
    },
    {
      text: "Fast delivery, piping hot food, and the quality is consistently amazing.",
      name: "Rajan Shrestha",
      city: "Lalitpur",
    },
    {
      text: "Love the variety. The chowmein and burger combo is my go-to every time.",
      name: "Priya Gurung",
      city: "Bhaktapur",
    },
  ]
  return (
    <div>
      <div className="relative h-72 overflow-hidden bg-orange-50 sm:h-96">
        <img
          src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&h=600&fit=crop&auto=format"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center bg-linear-to-r from-black/70 to-transparent">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h1 className="mb-4 text-4xl font-black text-white sm:text-5xl">
              Our Story
            </h1>
            <p className="max-w-md text-base leading-relaxed text-orange-200">
              Born from a passion for fresh, homestyle cooking — served at
              cloud-kitchen speed.
            </p>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="text-sm font-bold tracking-wider text-[#FF7A00] uppercase">
              Who We Are
            </span>
            <h2 className="mt-2 mb-5 text-3xl font-black text-gray-900 sm:text-4xl">
              Freshness in Every Bite
            </h2>
            <p className="mb-4 leading-relaxed text-gray-600">
              DokoMeal started in 2020 with a simple mission: make
              restaurant-quality food accessible, affordable, and delivered
              fresh. We're a fully cloud-based kitchen — no tables, no frills —
              just incredible food prepared with love.
            </p>
            <p className="mb-6 leading-relaxed text-gray-600">
              Our chefs have decades of experience crafting traditional Nepali
              and Asian-fusion dishes. Every ingredient is sourced locally and
              every meal is cooked to order, ensuring maximum freshness with
              every single delivery.
            </p>
            {/* featurebadge */}
            <div className="flex flex-wrap gap-3">
              {featureData.map((item) => (
                <FeatureBadge text={item.text} />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop&auto=format"
              alt="Kitchen preparation"
              className="h-52 w-full rounded-2xl object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1574966739987-65fbe48a0802?w=400&h=300&fit=crop&auto=format"
              alt="Fresh ingredients"
              className="mt-8 h-52 w-full rounded-2xl object-cover"
            />
          </div>
        </div>

        {/* statcard */}
        <div className="mb-16 rounded-3xl bg-[#FF7A00] p-10">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {statItem.map((item) => (
              <StatCard value={item.value} label={item.label} />
            ))}
          </div>
        </div>

        <div className="mb-16">
          <div className="mb-10 text-center">
            <h2 className="mb-2 text-3xl font-black text-gray-900">
              What Customers Say
            </h2>
            <p className="text-gray-500">Real love from real people</p>
          </div>
          {/* reviewcard */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {reviewItem.map((item) => (
              <ReviewCard text={item.text} name={item.name} city={item.city} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-2xl font-black text-gray-900">Find Us</h2>
            <div className="mb-6 h-64 overflow-hidden rounded-2xl border border-gray-200 bg-gray-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56516.31625283862!2d85.29111125!3d27.7089616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198a307baabf%3A0xb5137c1bf18db1ea!2sKathmandu!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp"
                title="Map"
                width="100%"
                height="100%"
                loading="lazy"
              ></iframe>
            </div>
            <div className="flex flex-col gap-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="text-[#FF7A00]">📍</span>
                New Baneshwor, Kathmandu, Bagmati Province, Nepal
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#FF7A00]">📞</span>
                +977-9768517425
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#FF7A00]">✉️</span>
                dokomandunepal@gmail.com
              </div>
            </div>
          </div>
          <div>
            <h2 className="mb-6 text-2xl font-black text-gray-900">
              Opening Hours
            </h2>
            <div className="rounded-2xl bg-gray-50 p-6">
              <div className="flex items-center justify-between border-b border-gray-200 py-3 last:border-0">
                <span className="text-sm font-semibold text-gray-700">
                  Monday – Friday
                </span>
                <span className="text-sm font-bold text-[#FF7A00]">
                  10:00 AM – 10:00 PM
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-gray-200 py-3 last:border-0">
                <span className="text-sm font-semibold text-gray-700">
                  Saturday
                </span>
                <span className="text-sm font-bold text-[#FF7A00]">
                  9:00 AM – 11:00 PM
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-gray-200 py-3 last:border-0">
                <span className="text-sm font-semibold text-gray-700">
                  Sunday
                </span>
                <span className="text-sm font-bold text-[#FF7A00]">
                  9:00 AM – 11:00 PM
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
