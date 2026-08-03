import type { Coordinates } from "@/lib/geocoding"

// Where orders are cooked and dispatched from
export const KITCHEN_LOCATION: Coordinates = {
  latitude: 27.690732578020807,
  longitude: 85.338788921134,
}

const EARTH_RADIUS_KM = 6371

const toRadians = (degrees: number) => (degrees * Math.PI) / 180

// Streets are never straight, so the crow-flies figure runs 20-40% short of
// the real ride across Kathmandu. Mid-range markup turns it into a usable
// road estimate — raise it if riders keep reporting longer trips.
const ROAD_DISTANCE_FACTOR = 1.3

// Haversine: great-circle distance, so it is always shorter than the
// route a rider actually takes through Kathmandu's streets
const haversineFromKitchen = ({ latitude, longitude }: Coordinates) => {
  const deltaLat = toRadians(latitude - KITCHEN_LOCATION.latitude)
  const deltaLng = toRadians(longitude - KITCHEN_LOCATION.longitude)

  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(toRadians(KITCHEN_LOCATION.latitude)) *
      Math.cos(toRadians(latitude)) *
      Math.sin(deltaLng / 2) ** 2

  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(a))
}

// What delivery pricing is charged against
export const estimateRoadDistance = (destination: Coordinates) =>
  haversineFromKitchen(destination) * ROAD_DISTANCE_FACTOR

export const formatDistance = (km: number) =>
  km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`
