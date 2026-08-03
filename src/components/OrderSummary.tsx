import type { CartItem } from "@/hooks/useCart"
import type { DeliveryDetailValues } from "@/hooks/useDeliveryDetail"
import { getDeliveryQuote, MAX_DELIVERY_KM } from "@/lib/delivery"
import { estimateRoadDistance, formatDistance } from "@/lib/distance"
import { ROUTES } from "@/routes/routes"
import { useFormContext, useWatch } from "react-hook-form"
import { useNavigate } from "react-router-dom"

type OrderSummaryProps = {
  cart: CartItem[]
  clearCart: () => void
}

const OrderSummary = ({ cart }: OrderSummaryProps) => {
  const navigate = useNavigate()
  const { control, handleSubmit } = useFormContext<DeliveryDetailValues>()

  const [pinnedLat, pinnedLng] = useWatch({ control, name: ["lat", "lng"] })

  const distance =
    pinnedLat !== null && pinnedLng !== null
      ? estimateRoadDistance({ latitude: pinnedLat, longitude: pinnedLng })
      : null

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const quote = getDeliveryQuote(distance, subtotal)

  const delivery = quote.status === "ok" ? quote.fee : 0

  const total = subtotal + delivery

  const isOutOfRange = quote.status === "out-of-range"

  const orderViaWhatsApp = ({
    fullName,
    phone,
    address,
    landmark,
    lat,
    lng,
    notes,
  }: DeliveryDetailValues) => {
    // Belt and braces: the button is disabled, but never let an
    // undeliverable order reach WhatsApp
    if (quote.status !== "ok") return

    const items = cart
      .map(
        (item) =>
          `• ${item.name} x ${item.quantity} - Rs.${item.price * item.quantity}`
      )
      .join("\n")

    // Exact pin beats a typed address for the rider
    const mapLink =
      lat !== null && lng !== null
        ? `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
        : ""

    const message = `Hello! I would like to place an order:

${items}

Subtotal: Rs.${subtotal}
Delivery: ${delivery === 0 ? "Free" : `Rs.${delivery}`}
Total: Rs.${total}

*Delivery Details*
Name: ${fullName}
Phone: ${phone}
Address: ${address}
Landmark: ${landmark}${
      distance
        ? `\nDistance: ~${formatDistance(distance)} by road (estimated)`
        : ""
    }${mapLink ? `\nMap: ${mapLink}` : ""}${
      notes.trim() ? `\nNotes: ${notes.trim()}` : ""
    }

Please confirm my order. Thank you!`

    // Replace this with your actual WhatsApp number
    // Country code + number, without +, spaces or -
    const phoneNumber = "9779768517425"

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`

    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="sticky top-20 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-lg font-black text-gray-900">Order Summary</h2>

      {/* Cart Items */}
      <div className="mb-4 space-y-3">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between text-sm"
          >
            <span className="mr-3 truncate text-gray-600">
              {item.name} x {item.quantity}
            </span>

            <span className="shrink-0 font-semibold text-gray-900">
              Rs.{item.price * item.quantity}
            </span>
          </div>
        ))}
      </div>

      {/* Subtotal & Delivery */}
      <div className="space-y-2 border-t border-gray-100 pt-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Subtotal</span>

          <span className="font-semibold">Rs.{subtotal}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Delivery</span>

          <span className="font-semibold">
            {quote.status === "unknown"
              ? "—"
              : quote.status === "out-of-range"
                ? "Unavailable"
                : quote.isFree
                  ? "Free"
                  : `Rs.${quote.fee}`}
          </span>
        </div>

        {distance !== null && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Distance</span>

            <span className="font-semibold">~{formatDistance(distance)}</span>
          </div>
        )}

        {quote.status === "unknown" && (
          <p className="text-xs text-gray-400">
            Pin your delivery location to see the delivery charge
          </p>
        )}

        {quote.status === "ok" && !quote.isFree && (
          <p className="text-xs text-gray-400">
            Free delivery at this distance on orders above Rs.
            {quote.freeAbove}
          </p>
        )}
      </div>

      {/* Total */}
      <div className="mt-4 mb-6 flex items-center justify-between border-t border-gray-100 pt-4">
        <span className="text-lg font-black text-gray-900">Total</span>

        <span className="text-2xl font-black text-[#FF7A00]">Rs.{total}</span>
      </div>

      {isOutOfRange && (
        <p className="mb-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
          😔 Sorry, we only deliver within {MAX_DELIVERY_KM} km. Please pick a
          closer location.
        </p>
      )}

      {/* WhatsApp Order */}
      <button
        onClick={handleSubmit(orderViaWhatsApp)}
        disabled={isOutOfRange}
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-green-500 py-4 text-base font-black text-white shadow-lg shadow-green-200 transition-all hover:scale-105 hover:bg-green-600 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none disabled:hover:scale-100"
      >
        💬 Order Via WhatsApp
      </button>

      {/* Add More Items */}
      <button
        onClick={() => navigate(ROUTES.MENU)}
        className="mt-3 w-full cursor-pointer rounded-2xl bg-gray-100 py-3 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-200"
      >
        + Add More Items
      </button>
    </div>
  )
}

export default OrderSummary
