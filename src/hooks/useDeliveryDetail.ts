import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import { clearCookie, readCookie, writeCookie } from "@/lib/cookies"

export type DeliveryDetailValues = {
  fullName: string
  phone: string
  address: string
  landmark: string
  // Set when the address comes from the map picker
  lat: number | null
  lng: number | null
  notes: string
}

// Notes are per-order, so they are never persisted
export type PersistedDeliveryDetail = Omit<DeliveryDetailValues, "notes">

const STORAGE_KEY = "deliveryDetail"

// The address goes in a cookie instead of localStorage: people move around,
// so a stale pin is worse than no pin, and the browser drops it for us
const ADDRESS_COOKIE_KEY = "deliveryAddress"
const ADDRESS_MAX_AGE_SECONDS = 5 * 60

const emptyDeliveryDetail: PersistedDeliveryDetail = {
  fullName: "",
  phone: "",
  address: "",
  landmark: "",
  lat: null,
  lng: null,
}

const readDeliveryDetail = (): PersistedDeliveryDetail => {
  try {
    // Only the contact fields come from localStorage, so an address left
    // there by an older build never outlives the cookie
    const { fullName, phone, landmark } = {
      ...emptyDeliveryDetail,
      ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"),
    }

    const { address, lat, lng } = {
      ...emptyDeliveryDetail,
      ...JSON.parse(readCookie(ADDRESS_COOKIE_KEY) || "{}"),
    }

    return { fullName, phone, landmark, address, lat, lng }
  } catch {
    return emptyDeliveryDetail
  }
}

const saveDeliveryDetail = ({
  fullName,
  phone,
  landmark,
  address,
  lat,
  lng,
}: DeliveryDetailValues) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ fullName, phone, landmark })
  )

  if (!address) {
    clearCookie(ADDRESS_COOKIE_KEY)
    return
  }

  // Every edit restarts the 5 minutes, so an address in use stays put
  writeCookie(
    ADDRESS_COOKIE_KEY,
    JSON.stringify({ address, lat, lng }),
    ADDRESS_MAX_AGE_SECONDS
  )
}

// Owns the delivery form so the fields and the order summary
// can share one set of values through <FormProvider />
const useDeliveryDetail = () => {
  // Read once on mount, so the form owns the values from there on
  const [deliveryDetail] = useState<PersistedDeliveryDetail>(readDeliveryDetail)

  const form = useForm<DeliveryDetailValues>({
    defaultValues: { ...deliveryDetail, notes: "" },
    mode: "onBlur",
  })

  const { subscribe } = form

  // Persist on every change so details survive a reload
  useEffect(() => {
    const unsubscribe = subscribe({
      formState: { values: true },
      callback: ({ values }) => saveDeliveryDetail(values),
    })

    return () => unsubscribe()
  }, [subscribe])

  return form
}

export default useDeliveryDetail
