import { useFormContext } from "react-hook-form"

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import AddressPicker from "@/components/AddressPicker"
import { type DeliveryDetailValues } from "@/hooks/useDeliveryDetail"
import { fieldClass } from "@/lib/formClasses"

const DeliveryDetail = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<DeliveryDetailValues>()

  return (
    <div>
      <h2 className="mb-5 text-lg font-black text-gray-900">
        Delivery Details
      </h2>

      <FieldGroup className="gap-4">
        <Field data-invalid={!!errors.fullName}>
          <FieldLabel
            htmlFor="fullName"
            className="text-sm font-semibold text-gray-700"
          >
            Full Name *
          </FieldLabel>

          <Input
            id="fullName"
            placeholder="e.g. John Doe"
            aria-invalid={!!errors.fullName}
            className={fieldClass}
            {...register("fullName", {
              required: "Full name is required",
              minLength: {
                value: 3,
                message: "Full name must be at least 3 characters",
              },
            })}
          />

          <FieldError errors={[errors.fullName]} />
        </Field>

        <Field data-invalid={!!errors.phone}>
          <FieldLabel
            htmlFor="phone"
            className="text-sm font-semibold text-gray-700"
          >
            Phone Number *
          </FieldLabel>

          <Input
            id="phone"
            type="tel"
            inputMode="numeric"
            placeholder="e.g. 9800000000"
            aria-invalid={!!errors.phone}
            className={fieldClass}
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^9\d{9}$/,
                message: "Enter a valid 10-digit mobile number",
              },
            })}
          />

          <FieldError errors={[errors.phone]} />
        </Field>

        <AddressPicker />

        <Field data-invalid={!!errors.landmark}>
          <FieldLabel
            htmlFor="landmark"
            className="text-sm font-semibold text-gray-700"
          >
            Landmark *
          </FieldLabel>

          <Input
            id="landmark"
            placeholder="e.g. Next to Himalayan Java, blue gate"
            aria-invalid={!!errors.landmark}
            className={fieldClass}
            {...register("landmark", {
              required: "A landmark helps the rider find you",
            })}
          />

          <FieldError errors={[errors.landmark]} />
        </Field>

        <Field>
          <FieldLabel
            htmlFor="notes"
            className="text-sm font-semibold text-gray-700"
          >
            Order Notes
          </FieldLabel>

          <Textarea
            id="notes"
            placeholder="Any special requests?"
            className={`${fieldClass} resize-none`}
            {...register("notes")}
          />
        </Field>
      </FieldGroup>
    </div>
  )
}

export default DeliveryDetail
