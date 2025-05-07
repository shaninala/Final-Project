"use client"

import { useState, type ChangeEvent, type FormEvent } from "react"
import Input from "./Input"
import Select from "./Select"
import Button from "./Button"
import GasStationCard from "./GasStationCard"

interface GasStation {
  id: number
  name: string
  address: {
    street: string
    cityStateZip: string
  }
  city: string
  zipCode: string
  fuelsAvailable: string[]
  rating: number
  price: {
    regular?: number
    midgrade?: number
    premium?: number
    diesel?: number
  }
  lastUpdated: {
    regular?: string
    midgrade?: string
    premium?: string
    diesel?: string
  }
}

interface ApiResponse {
  data: any[]
}

export default function Form() {
  const [zipCode, setZipCode] = useState<string>("")
  const [searchedZipCode, setSearchedZipCode] = useState<string>("")
  const [fuelType, setFuelType] = useState<string>("Any")
  const [ratingFilter, setRatingFilter] = useState<string>("Any")
  const [results, setResults] = useState<GasStation[]>([])
  const [hasSearched, setHasSearched] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [rawData, setRawData] = useState<any[]>([])

  const onFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setError(null)
    setRawData([])
    setSearchedZipCode(zipCode)

    try {
      const apiURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
      const response = await fetch(`${apiURL}/gas-api`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ zipcodes: [zipCode] }),
      })
      if (!response.ok) {
        throw new Error(`Error unable to fetch gas prices: ${response.statusText} (${response.status})`)
      }
      const apiResponse: ApiResponse = await response.json()
      setRawData(apiResponse.data || [])
      if (!apiResponse.data || apiResponse.data.length === 0) {
        setResults([])
        setHasSearched(true)
        return
      }
      const gasStations: GasStation[] = apiResponse.data.map((station: any, index: number) => {
        console.log("Processing station:", station)
        const id = createUniqueId(station.name || "Unknown", station.address || "Unknown", index)
        const fuelsAvailable = station.fuels_available
          ? station.fuels_available.split(",").map((fuel: string) => fuel.trim())
          : []
        const price: any = {}
        const lastUpdated: any = {}
        if (fuelsAvailable.includes("regular_gas") && station.regular_gas_price !== undefined) {
          price.regular = Number.parseFloat(station.regular_gas_price)
          lastUpdated.regular = station.regular_gas_posted_time
        }
        if (fuelsAvailable.includes("midgrade_gas") && station.midgrade_gas_price !== undefined) {
          price.midgrade = Number.parseFloat(station.midgrade_gas_price)
          lastUpdated.midgrade = station.midgrade_gas_posted_time
        }
        if (fuelsAvailable.includes("premium_gas") && station.premium_gas_price !== undefined) {
          price.premium = Number.parseFloat(station.premium_gas_price)
          lastUpdated.premium = station.premium_gas_posted_time
        }
        if (fuelsAvailable.includes("diesel") && station.diesel_price !== undefined) {
          price.diesel = Number.parseFloat(station.diesel_price)
          lastUpdated.diesel = station.diesel_posted_time
        }
        let street = ""
        let cityStateZip = ""
        let city = ""
        let getZipCode = station.zip_code_searched || zipCode
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
                getZipCode = potentialZip.split("-")[0]
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
          zipCode: formatZipCode(getZipCode),
          fuelsAvailable,
          rating: station.star_rating || 0,
          price,
          lastUpdated,
        }
      })
      let filteredResults = gasStations
      if (ratingFilter !== "Any") {
        const minRating = Number.parseInt(ratingFilter.split("+")[0])
        filteredResults = gasStations.filter((station) => station.rating >= minRating)
      }
      if (fuelType !== "Any") {
        const fuelTypeMap: Record<string, string> = {
          Regular: "regular_gas",
          Midgrade: "midgrade_gas",
          Premium: "premium_gas",
          Diesel: "diesel",
        }
        const fuelTypeToFilter = fuelTypeMap[fuelType]
        if (fuelTypeToFilter) {
          filteredResults = filteredResults.filter((station) => station.fuelsAvailable.includes(fuelTypeToFilter))
        }
      }
      setResults(filteredResults)
      setHasSearched(true)
    } catch (err: any) {
      console.error("Error fetching gas prices:", err)
      setError(`Failed to fetch gas prices: ${err.message}. Please try again.`)
    } finally {
      setIsLoading(false)
    }
  }
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

  return (
    <div>
      <form onSubmit={onFormSubmit} className="space-y-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#3D405B] mb-8 text-center">
          Search Gas Station
        </h1>
        <div className="space-y-3">
          <label
            htmlFor="zipCode"
            className="text-sm sm:text-md md:text-lg lg:text-xl block text-[#3D405B] font-semibold"
          >
            Zip Code/City:
          </label>
          <Input
            id="zipCode"
            value={zipCode}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setZipCode(event.target.value)}
            placeholder="Search gas stations by city or zip code..."
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label
              htmlFor="fuelType"
              className="text-sm sm:text-md md:text-lg lg:text-xl block text-[#3D405B] font-semibold"
            >
              Fuel Type
            </label>
            <Select
              id="fuelType"
              value={fuelType}
              onChange={(event: ChangeEvent<HTMLSelectElement>) => setFuelType(event.target.value)}
              options={["Any", "Regular", "Midgrade", "Premium", "Diesel"]}
            />
          </div>
          <div className="space-y-3">
            <label
              htmlFor="ratingFilter"
              className="text-sm sm:text-md md:text-lg lg:text-xl block text-[#3D405B] font-semibold"
            >
              Rating
            </label>
            <Select
              id="ratingFilter"
              value={ratingFilter}
              onChange={(event: ChangeEvent<HTMLSelectElement>) => setRatingFilter(event.target.value)}
              options={["Any", "4 Stars & Up", "3 Stars & Up",]}
            />
          </div>
        </div>
        <div className="flex justify-center pt-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Searching" : "Search Gas Station"}
          </Button>
        </div>
      </form>
      {hasSearched && !error && (
        <div className="mt-8">
          <div className="mb-4">
            <div className="text-xl font-semibold text-[#3D405B]">
              Found {results.length} gas stations near {searchedZipCode}
            </div>
          </div>

          {results.length > 0 ? (
            <div className="space-y-4">
              {results.map((station) => (
                <GasStationCard
                  key={station.id}
                  id={station.id}
                  name={station.name}
                  address={station.address}
                  city={station.city}
                  zipCode={station.zipCode}
                  fuelsAvailable={station.fuelsAvailable}
                  rating={station.rating}
                  price={station.price}
                  lastUpdated={station.lastUpdated}
                  searchedZipCode={searchedZipCode}
                />
              ))}
            </div>
          ) : (
            <div>
              <p className="text-center text-[#3D405B] mb-4">
                No gas stations found near {searchedZipCode}.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
