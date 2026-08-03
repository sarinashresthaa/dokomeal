import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const stepperVariants = cva(
  "flex items-center overflow-hidden border-2 border-[#FF7A00]",
  {
    variants: {
      size: {
        sm: "h-10 rounded-xl",
        lg: "h-14 flex-1 rounded-2xl",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  }
)

const stepVariants = cva(
  "flex h-full cursor-pointer items-center justify-center bg-white font-bold text-[#FF7A00] transition-colors hover:bg-orange-50",
  {
    variants: {
      size: {
        sm: "w-9 text-lg",
        lg: "w-14 text-xl",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  }
)

const countVariants = cva(
  "flex h-full items-center justify-center bg-[#FF7A00] font-bold text-white",
  {
    variants: {
      size: {
        sm: "w-9 text-sm",
        lg: "flex-1 text-lg",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  }
)

type QuantityStepperProps = VariantProps<typeof stepperVariants> & {
  quantity: number
  onIncrease: () => void
  onDecrease: () => void
  itemName: string
  className?: string
}

const QuantityStepper = ({
  quantity,
  onIncrease,
  onDecrease,
  itemName,
  size = "sm",
  className,
}: QuantityStepperProps) => (
  <div className={cn(stepperVariants({ size }), className)}>
    <button
      type="button"
      onClick={onDecrease}
      aria-label={`Remove one ${itemName}`}
      className={stepVariants({ size })}
    >
      −
    </button>

    <span className={countVariants({ size })}>{quantity}</span>

    <button
      type="button"
      onClick={onIncrease}
      aria-label={`Add one more ${itemName}`}
      className={stepVariants({ size })}
    >
      +
    </button>
  </div>
)

export default QuantityStepper
