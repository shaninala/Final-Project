import Link from "next/link";

interface GasStationProps {
  id: number;
  name: string;
  address: string;
  city: string;
  zipCode: string;
  fuelTypes: string[];
  selfService: boolean;
  price: {
    regular?: number;
    "mid-grade"?: number;
    premium?: number;
    diesel?: number;
  };
}

export default function GasStationCard({
  id,
  name,
  address,
  city,
  zipCode,
  fuelTypes,
  selfService,
  price,
}: GasStationProps) {
  return (
    <Link href={`/gas/${id}`}>
      <div className="bg-[#E8D9B5] rounded-lg p-4 sm:p-6 mb-4 shadow-md cursor-pointer">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-lg sm:text-xl font-semibold text-[#3D405B]">
              {name}
            </span>
            <p className="text-sm sm:text-base">{address}</p>
            <p className="text-sm sm:text-base">{`${city}, ${zipCode}`}</p>
          </div>
        </div>
        <div className="mt-3">
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {fuelTypes.map((fuelType, index) => {
              const priceKey = fuelType.toLowerCase() as keyof typeof price;
              return (
                <li key={index} className="text-sm sm:text-base text-[#3D405B]">
                  {fuelType}: ${price[priceKey]?.toFixed(2) || "N/A"}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Link>
  );
}
