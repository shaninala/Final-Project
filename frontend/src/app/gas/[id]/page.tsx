"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { notFound } from "next/navigation"
import type { GasStation, Review } from "./types"
import GasStationLogo from "../../components/gas/GasStationImage"

export default function GasStationDetail() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [station, setStation] = useState<GasStation | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStationData = async () => {
      try {
        setLoading(true)
        setError(null)

        const stationId = Number(params.id)
        const zipcode = searchParams.get("zipcode") 
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

        const response = await fetch(`${apiUrl}/gas-api`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ zipcodes: [zipcode] }),
        })

        if (!response.ok) {
          throw new Error(`Error fetching gas prices: ${response.statusText} (${response.status})`)
        }

        const apiResponse = await response.json()

        if (!apiResponse.data || apiResponse.data.length === 0) {
          notFound()
        }

        const foundStation = apiResponse.data.find((station: any, index: number) => {
          const generatedId = createUniqueId(station.name || "Unknown", station.address || "Unknown", index)
          return generatedId === stationId
        })

        if (foundStation) {
          const processedStation = processStationData(foundStation, stationId)
          setStation(processedStation)
        } else {
          notFound()
        }
      } catch (error: any) {
        setError(error.message || "Failed to load gas station details")
        notFound()
      } finally {
        setLoading(false)
      }
    }

    fetchStationData()
  }, [params.id, searchParams])

  const createUniqueId = (name: string, address: string, index: number): number => {
    const combinedString = `${name}${address}${index}`
    let hash = 0
    for (let i = 0; i < combinedString.length; i++) {
      const char = combinedString.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash
    }
    return Math.abs(hash) % 1000000000
  }

  const processStationData = (station: any, id: number): GasStation => {
    const fuelsAvailable = station.fuels_available
      ? station.fuels_available.split(",").map((fuel: string) => fuel.trim())
      : []

    const price: any = {}

    if (fuelsAvailable.includes("regular_gas") && station.regular_gas_price !== undefined) {
      price.regular = Number.parseFloat(station.regular_gas_price)
    }

    if (fuelsAvailable.includes("midgrade_gas") && station.midgrade_gas_price !== undefined) {
      price.midgrade = Number.parseFloat(station.midgrade_gas_price)
    }

    if (fuelsAvailable.includes("premium_gas") && station.premium_gas_price !== undefined) {
      price.premium = Number.parseFloat(station.premium_gas_price)
    }

    if (fuelsAvailable.includes("diesel") && station.diesel_price !== undefined) {
      price.diesel = Number.parseFloat(station.diesel_price)
    }

    let street = ""
    let cityStateZip = ""
    let city = ""
    let extractedZipCode = station.zip_code_searched || searchParams.get("zipcode") || "11207"

    if (station.address) {
      const addressParts = station.address.split(",")
      street = formatStreetAddress(addressParts[0].trim())

      if (addressParts.length > 1) {
        const rawCityStateZip = addressParts.slice(1).join(",").trim()
        cityStateZip = rawCityStateZip.replace(/(\d{5})-\d+/g, "$1")

        const cityStateZipParts = cityStateZip.split(" ")
        if (cityStateZipParts.length > 1) {
          const potentialZip = cityStateZipParts[cityStateZipParts.length - 1]

          if (/^\d{5}(-\d+)?$/.test(potentialZip)) {
            extractedZipCode = potentialZip.split("-")[0]
            city = cityStateZipParts.slice(0, -1).join(" ")
          } else {
            city = cityStateZip
          }
        } else {
          city = cityStateZip
        }
      }
    }

    if (!city) {
      city = "N/A"
    }

    return {
      id,
      name: station.name || "N/A",
      address: {
        street,
        cityStateZip,
      },
      city,
      zipCode: formatZipCode(extractedZipCode),
      fullAddress: `${street}, ${cityStateZip}`,
      phone: "(718)-241-9500",
      rating: station.star_rating || 0,
      lastUpdated: new Date().toLocaleDateString(),
      reviews: [],
      fuelsAvailable,
      isSelfService: false,
      price,
    }
  }

  const formatStreetAddress = (street: string): string => {
    return street
      .split(" ")
      .map((word) => {
        if (/^\d+$/.test(word)) {
          return word
        }
        return word.charAt(0).toUpperCase() + word.toLowerCase().slice(1)
      })
      .join(" ")
  }

  const formatZipCode = (zip: string): string => {
    if (zip.includes("-")) {
      return zip.split("-")[0]
    }

    if (zip.length > 5) {
      return zip.substring(0, 5)
    }

    return zip
  }
  const userReviews: Review[] = Array(25)
    .fill(null)
    .map((_, index) => ({
      user: `User ${index + 1}`,
      date: "April 1, 2025",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pretium lacus ac urna interdum, at aliquam nisi convallis. Vivamus euismod nisi sed lacus finibus, et tincidunt erat dictum.",
    }))
  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const decimal = rating % 1
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <div key={i} className="text-4xl text-yellow-400">
            ★
          </div>,
        )
      } else if (i === fullStars + 1 && decimal > 0) {
        const percentage = Math.round(decimal * 100)
        stars.push(
          <div
            key={i}
            className="text-4xl"
            style={{
              position: "relative",
              display: "inline-block",
              color: "#D1D3D5",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: `${percentage}%`,
                overflow: "hidden",
                color: "#F6CC1C",
              }}
            >
              ★
            </span>
            ★
          </div>,
        )
      } else {
        stars.push(
          <div key={i} className="text-4xl text-gray-300">
            ★
          </div>,
        )
      }
    }

    return stars
  }
  const allFuelTypes = [
    { code: "regular_gas", key: "regular", label: "Regular" },
    { code: "midgrade_gas", key: "midgrade", label: "Midgrade" },
    { code: "premium_gas", key: "premium", label: "Premium" },
    { code: "diesel", key: "diesel", label: "Diesel" },
  ]
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF3E0] flex items-center justify-center">
        <p className="text-2xl text-[#3D405B]">Loading station results...</p>
      </div>
    )
  }
  if (error) {
    notFound()
  }
  if (!station) {
    notFound()
  }
  const stationName: string = station.name.split(" ")[0]
  const searchQuery: string = `${stationName} ${station.address.street}, ${station.address.cityStateZip}`
  return (
    <div className="min-h-screen bg-[#FAF3E0] justify-start py-8 sm:py-12 md:py-16 px-4 pt-40 sm:pt-40 md:pt-40 pb-20">
      <div className="max-w-6xl mx-auto">
        <Link href="/gas" className="inline-block mb-6 text-[#3D405B] hover:underline">
          ← Back to search results
        </Link>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-[#3D405B]">{station.name}</h1>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#3D405B] mb-6">
          <div>{station.address.street}</div>
          <div>{station.address.cityStateZip}</div>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#E8D9B5] rounded-lg p-6 shadow-lg border-2 border-[#A67C52]">
            <div className="flex items-start gap-4">
              <div className="bg-white rounded-full flex-shrink-0">
                <GasStationLogo name={station.name} />
              </div>
              <div>
                <h3 className="text-3xl sm:text-4xl md:text-4xl font-bold text-[#3D405B]">{station.name}</h3>
                <p className="text-2xl text-[#3D405B]">{station.address.street}</p>
                <p className="text-2xl text-[#3D405B]">{station.address.cityStateZip}</p>
                {station.phone && <p className="text-2xl text-[#3D405B]">{station.phone}</p>}
                <p className="text-2xl text-[#58A568] mt-2 font-medium">Open 24 hours</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Link
              href={`https://maps.google.com/?q=${encodeURIComponent(searchQuery)}`}
              target="_blank"
              className="bg-[#008737] text-white py-4 rounded-lg text-center text-xl font-semibold hover:bg-[#006B2B] transition-colors shadow-md"
            >
              Get Direction
            </Link>
            <div className="bg-[#E8D9B5] rounded-lg p-6 flex-grow flex flex-col items-center justify-center shadow-lg border-2 border-[#A67C52]">
              <h3 className="text-2xl font-bold text-[#3D4058] mb-2">Station Rating</h3>
              <p className="text-3xl font-bold text-[#3D405B] mb-2">{station.rating.toFixed(1)} / 5.0</p>
              <div className="flex">{renderStars(station.rating)}</div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-[#3D405B] mb-6">Gas Station Price</h2>
          <div className="bg-[#E8D9B5] rounded-lg p-4 shadow-xl border-2 border-[#A67C52]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {allFuelTypes.map((fuelType) => {
                const priceKey = fuelType.key as keyof typeof station.price
                const price = station.price[priceKey]
                const isAvailable = station.fuelsAvailable.includes(fuelType.code)
                return (
                  <div
                    key={fuelType.code}
                    className="bg-[#E8D9B5] rounded-md p-4 text-center shadow-md border border-[#A67C52]"
                  >
                    <h3 className="text-xl font-bold text-[#3D405B] mb-2">{fuelType.label}</h3>
                    <p className="text-2xl font-bold text-[#3D405B] mb-2">
                      {price !== undefined ? `$ ${price.toFixed(2)}` : "- - -"}
                    </p>
                    <p className="text-sm text-[#3D405B]">{isAvailable ? "Confirmed" : "Not Available"}</p>
                    {price !== undefined && <p className="text-sm text-[#3D405B]">{station.lastUpdated}</p>}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-[#3D405B] mb-6">Gas Station Review</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userReviews.map((review, index) => (
              <div key={index} className="bg-[#E8D9B5] rounded-lg p-6 shadow-lg border-2 border-[#A67C52]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
                    {review.user.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#3D405B]">{review.user}</h3>
                    <p className="text-sm text-[#3D405B]">{review.date}</p>
                  </div>
                </div>
                <p className="text-[#3D405B]">{review.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
