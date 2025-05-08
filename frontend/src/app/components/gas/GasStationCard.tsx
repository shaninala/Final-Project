import Link from "next/link"

interface GasStationProps {
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
  lastUpdated?: {
    regular?: string
    midgrade?: string
    premium?: string
    diesel?: string
  }
  searchedZipCode: string
}

export default function GasStationCard({
  id,
  name,
  address,
  city,
  zipCode,
  fuelsAvailable,
  rating,
  price,
  lastUpdated,
  searchedZipCode,
}: GasStationProps) {


  const generateStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const decimal = rating % 1

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <span key={i} className="text-yellow-500">
            ★
          </span>,
        )
      } else if (i === fullStars + 1 && decimal > 0) {
        const percentage = Math.round(decimal * 100)
        stars.push(
          <span
            key={i}
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
          </span>,
        )
      } else {
        stars.push(
          <span key={i} className="text-gray-300">
            ★
          </span>,
        )
      }
    }

    return stars
  }

  const fuelTypeMap: Record<string, { key: keyof typeof price; label: string }> = {
    regular_gas: { key: "regular", label: "Regular" },
    midgrade_gas: { key: "midgrade", label: "Midgrade" },
    premium_gas: { key: "premium", label: "Premium" },
    diesel: { key: "diesel", label: "Diesel" },
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A"
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString()
    } catch (e) {
      return "N/A"
    }
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
    <Link href={`/gas/${id}?zipcode=${searchedZipCode}`}>
      <div className="bg-[#E8D9B5] rounded-lg p-4 sm:p-6 mb-4 shadow-md cursor-pointer hover:shadow-lg transition-shadow">
        <div className="flex flex-col">
          <div className="mb-3">
            <h3 className="text-lg sm:text-xl font-semibold text-[#3D405B]">{name}</h3>
            <div className="mt-1">
              <p className="text-sm sm:text-base text-[#3D405B]/80">{address.street}</p>
              <p className="text-sm sm:text-base text-[#3D405B]/80">
                {address.cityStateZip.replace(/(\d{5})-\d+/g, "$1") || `${city}, ${formatZipCode(zipCode)}`}
              </p>
            </div>
          </div>

          <div className="flex items-center mb-3">
            <span className="text-sm font-medium mr-1">Rating: {rating.toFixed(1)}</span>
            <div className="flex">{generateStars(rating)}</div>
          </div>

          <div className="mt-2">
            <h4 className="text-sm font-semibold text-[#3D405B] mb-2">Fuel Prices:</h4>
            <div className="grid grid-cols-2 gap-2">
              {fuelsAvailable.map((fuelType) => {
                const fuelInfo = fuelTypeMap[fuelType]
                if (!fuelInfo) return null

                const priceValue = price[fuelInfo.key]
                const updatedDate = lastUpdated ? lastUpdated[fuelInfo.key] : undefined

                return (
                  <div key={fuelType} className="p-2 rounded bg-[#D9C9A3]">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-[#3D405B]">{fuelInfo.label}:</span>
                      <span className="font-bold text-[#008737]">${priceValue?.toFixed(2) || "N/A"}</span>
                    </div>
                    {updatedDate && (
                      <div className="text-xs text-[#3D405B]/70 mt-1 text-right">
                        Updated: {formatDate(updatedDate)}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
