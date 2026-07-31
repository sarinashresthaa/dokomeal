import { IoMdStar } from "react-icons/io"

type ReviewCardProps = {
  text: string
  name: string
  city: string
}

const ReviewCard = ({ text, name, city }: ReviewCardProps) => {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-4 flex items-center">
        {[...Array(5)].map((_, index) => (
          <IoMdStar key={index} className="fill-[#FF7A00]" size={18} />
        ))}
      </div>

      <p className="mb-4 text-sm leading-relaxed text-gray-700 italic">
        "{text}"
      </p>

      <div>
        <div className="text-sm font-bold text-gray-900">{name}</div>
        <div className="text-xs text-gray-400">{city}</div>
      </div>
    </div>
  )
}

export default ReviewCard
