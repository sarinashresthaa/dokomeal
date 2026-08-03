import { cn } from "@/lib/utils"

type VegBadgeProps = {
  isVeg: boolean
  className?: string
}

const VegBadge = ({ isVeg, className }: VegBadgeProps) => (
  <span
    className={cn(
      "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold",
      isVeg ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700",
      className
    )}
  >
    <span
      className={cn(
        "h-2 w-2 rounded-full",
        isVeg ? "bg-green-700" : "bg-red-500"
      )}
    />

    {isVeg ? "Veg" : "Non-Veg"}
  </span>
)

export default VegBadge
