import "maplibre-gl/dist/maplibre-gl.css"

import type { StyleSpecification } from "maplibre-gl"
import { useCallback, useEffect, useRef, useState } from "react"
import { useFormContext } from "react-hook-form"
import Map, {
  Marker,
  NavigationControl,
  type MapRef,
} from "react-map-gl/maplibre"

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { DeliveryDetailValues } from "@/hooks/useDeliveryDetail"
import { MAX_DELIVERY_KM } from "@/lib/delivery"
import {
  estimateRoadDistance,
  formatDistance,
  KITCHEN_LOCATION,
} from "@/lib/distance"
import {
  formatCoordinates,
  KATHMANDU,
  reverseGeocode,
  searchAddress,
  type AddressSuggestion,
  type Coordinates,
} from "@/lib/geocoding"
import { fieldClass } from "@/lib/formClasses"

const MAP_STYLE: StyleSpecification = {
  version: 8,
  sources: {
    osm: {
      type: "raster",
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      maxzoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  },
  layers: [{ id: "osm", type: "raster", source: "osm" }],
}

const PINNED_ZOOM = 17

const AddressPicker = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<DeliveryDetailValues>()

  const mapRef = useRef<MapRef>(null)

  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [searchFailed, setSearchFailed] = useState(false)
  const [isResolving, setIsResolving] = useState(false)

  const lat = watch("lat")
  const lng = watch("lng")

  const hasPin = lat !== null && lng !== null
  const pin: Coordinates = hasPin
    ? { latitude: lat, longitude: lng }
    : KATHMANDU

  const roadDistance = estimateRoadDistance(pin)

  const applyLocation = useCallback(
    (location: Coordinates, address: string) => {
      setValue("address", address, { shouldValidate: true, shouldDirty: true })
      setValue("lat", location.latitude, { shouldDirty: true })
      setValue("lng", location.longitude, { shouldDirty: true })

      mapRef.current?.flyTo({
        center: [location.longitude, location.latitude],
        zoom: PINNED_ZOOM,
      })
    },
    [setValue]
  )

  // Dragging the pin only yields coordinates, so turn them
  // back into something a rider can actually read
  const resolveAddress = useCallback(
    async (location: Coordinates) => {
      setIsResolving(true)

      try {
        const address = await reverseGeocode(location)
        applyLocation(location, address || formatCoordinates(location))
      } catch {
        applyLocation(location, formatCoordinates(location))
      } finally {
        setIsResolving(false)
      }
    },
    [applyLocation]
  )

  // Pre-fill the pin from the device on every visit, so the address always
  // starts from where the customer actually is rather than from a stale one
  // saved on an earlier order. Dragging or searching still overrides it.
  const [isLocating, setIsLocating] = useState(() => !!navigator.geolocation)

  const hasAskedForLocation = useRef(false)

  useEffect(() => {
    if (!isLocating || hasAskedForLocation.current) return
    hasAskedForLocation.current = true

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setIsLocating(false)
        resolveAddress({
          latitude: coords.latitude,
          longitude: coords.longitude,
        })
      },
      // Denied, timed out, or served over plain http — search and
      // dragging the pin both still work, so this stays silent
      () => setIsLocating(false),
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }, [isLocating, resolveAddress])

  const handleQueryChange = (value: string) => {
    setQuery(value)
    setSearchFailed(false)

    const isSearchable = value.trim().length >= 3
    setIsSearching(isSearchable)

    if (!isSearchable) setSuggestions([])
  }

  useEffect(() => {
    const trimmed = query.trim()

    if (trimmed.length < 3) return

    const controller = new AbortController()

    // Nominatim allows ~1 request/second, so wait for a pause in typing
    const timer = setTimeout(() => {
      searchAddress(trimmed, controller.signal)
        .then((results) => {
          setSuggestions(results)
          setIsSearching(false)
        })
        .catch((error: Error) => {
          if (error.name === "AbortError") return

          setSearchFailed(true)
          setIsSearching(false)
        })
    }, 600)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [query])

  const selectSuggestion = (suggestion: AddressSuggestion) => {
    applyLocation(suggestion, suggestion.label)

    setQuery("")
    setSuggestions([])
    setIsSearching(false)
  }

  return (
    <Field data-invalid={!!errors.address}>
      <FieldLabel
        htmlFor="address"
        className="text-sm font-semibold text-gray-700"
      >
        Delivery Address *
      </FieldLabel>

      <div className="relative">
        <Input
          type="search"
          value={query}
          onChange={(event) => handleQueryChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Escape") setSuggestions([])
          }}
          placeholder="🔍 Search your area, street or landmark"
          className={fieldClass}
        />

        {suggestions.length > 0 && (
          <ul
            // Keep the input focused so the click lands before the blur
            onMouseDown={(event) => event.preventDefault()}
            className="absolute top-full right-0 left-0 z-10 mt-1 max-h-56 overflow-y-auto rounded-xl border border-gray-200 bg-white py-1 shadow-lg"
          >
            {suggestions.map((suggestion) => (
              <li key={suggestion.id}>
                <button
                  type="button"
                  onClick={() => selectSuggestion(suggestion)}
                  className="block w-full cursor-pointer px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-orange-50 hover:text-[#FF7A00]"
                >
                  {suggestion.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="relative h-56 overflow-hidden rounded-xl border border-gray-200">
        <Map
          ref={mapRef}
          mapStyle={MAP_STYLE}
          initialViewState={{
            latitude: pin.latitude,
            longitude: pin.longitude,
            zoom: hasPin ? PINNED_ZOOM : 13,
          }}
          onClick={({ lngLat }) =>
            resolveAddress({ latitude: lngLat.lat, longitude: lngLat.lng })
          }
          style={{ width: "100%", height: "100%" }}
        >
          <NavigationControl position="top-right" showCompass={false} />

          <Marker
            latitude={KITCHEN_LOCATION.latitude}
            longitude={KITCHEN_LOCATION.longitude}
            anchor="bottom"
          >
            <span title="Our kitchen" className="text-2xl drop-shadow">
              🍳
            </span>
          </Marker>

          <Marker
            latitude={pin.latitude}
            longitude={pin.longitude}
            draggable
            anchor="bottom"
            onDragEnd={({ lngLat }) =>
              resolveAddress({ latitude: lngLat.lat, longitude: lngLat.lng })
            }
          >
            <span className="cursor-grab text-3xl drop-shadow active:cursor-grabbing">
              📍
            </span>
          </Marker>
        </Map>
      </div>

      {hasPin &&
        (roadDistance > MAX_DELIVERY_KM ? (
          <p className="text-sm font-semibold text-red-600">
            😔 ~{formatDistance(roadDistance)} away — outside our{" "}
            {MAX_DELIVERY_KM} km delivery range.
          </p>
        ) : (
          <p className="text-sm font-semibold text-gray-600">
            🛵 ~{formatDistance(roadDistance)} from our kitchen{" "}
            <span className="font-normal text-gray-400">(estimated)</span>
          </p>
        ))}

      <FieldDescription>
        {isLocating
          ? "Finding your location…"
          : isSearching
            ? "Searching…"
            : isResolving
              ? "Looking up that spot…"
              : searchFailed
                ? "Search is unavailable right now — drag the pin to your location instead."
                : "Search for your area, then drag the pin or tap the map to fine-tune the exact spot."}
      </FieldDescription>

      <Textarea
        id="address"
        readOnly
        placeholder="Pick your location on the map above"
        aria-invalid={!!errors.address}
        className={`${fieldClass} resize-none`}
        {...register("address", {
          required: "Pick your delivery location on the map",
        })}
      />

      <FieldError errors={[errors.address]} />
    </Field>
  )
}

export default AddressPicker
