import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

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
    const { fullName, phone, address, landmark, lat, lng } = {
      ...emptyDeliveryDetail,
      ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"),
    }

    return { fullName, phone, address, landmark, lat, lng }
  } catch {
    return emptyDeliveryDetail
  }
}

const saveDeliveryDetail = ({
  fullName,
  phone,
  address,
  landmark,
  lat,
  lng,
}: DeliveryDetailValues) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ fullName, phone, address, landmark, lat, lng })
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
