// Nominatim is OpenStreetMap's free geocoder: no key, no account, but it is
// rate-limited to roughly one request per second. Every call here must be
// debounced or user-initiated — never fired in a loop.
const NOMINATIM_URL = "https://nominatim.openstreetmap.org"

export const KATHMANDU = { latitude: 27.7172, longitude: 85.324 }

// left,top,right,bottom — biases results to the Kathmandu Valley
// without hiding anything outside it
const KATHMANDU_VIEWBOX = "85.20,27.82,85.55,27.60"

export type Coordinates = {
  latitude: number
  longitude: number
}

export type AddressSuggestion = Coordinates & {
  id: string
  label: string
}

type NominatimPlace = {
  place_id: number
  display_name: string
  lat: string
  lon: string
}

export const formatCoordinates = ({ latitude, longitude }: Coordinates) =>
  `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`

export const searchAddress = async (
  query: string,
  signal?: AbortSignal
): Promise<AddressSuggestion[]> => {
  const url = new URL(`${NOMINATIM_URL}/search`)
  url.searchParams.set("q", query)
  url.searchParams.set("format", "jsonv2")
  // Without this Nominatim returns Kathmandu place names in Devanagari
  url.searchParams.set("accept-language", "en")
  url.searchParams.set("limit", "6")
  url.searchParams.set("viewbox", KATHMANDU_VIEWBOX)

  const response = await fetch(url, { signal })

  if (!response.ok) {
    throw new Error(`Address search failed (${response.status})`)
  }

  const places: NominatimPlace[] = await response.json()

  return places.map((place) => ({
    id: String(place.place_id),
    label: place.display_name,
    latitude: Number(place.lat),
    longitude: Number(place.lon),
  }))
}

export const reverseGeocode = async (
  { latitude, longitude }: Coordinates,
  signal?: AbortSignal
): Promise<string | null> => {
  const url = new URL(`${NOMINATIM_URL}/reverse`)
  url.searchParams.set("lat", String(latitude))
  url.searchParams.set("lon", String(longitude))
  url.searchParams.set("format", "jsonv2")
  // Without this Nominatim returns Kathmandu place names in Devanagari
  url.searchParams.set("accept-language", "en")
  url.searchParams.set("zoom", "18")

  const response = await fetch(url, { signal })

  if (!response.ok) {
    throw new Error(`Reverse geocoding failed (${response.status})`)
  }

  const place: { display_name?: string } = await response.json()

  return place.display_name ?? null
}
