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
  name,
  address,
  city,
  zipCode,
  fuelTypes,
  selfService,
  price,
}: GasStationProps) {
  return (
    <div className="bg-[#E8D9B5] rounded-lg p-6 mb-4 shadow-md">
      <div className="flex justify-between items-start">
        <div>
          <span className="text-xl font-semibold text-[#3D405B]">{name}</span>
          <p>{address}</p>
          <p>{`${city}, ${zipCode}`}</p>
        </div>
      </div>
      <div>
        <div>
          <ul>
            {fuelTypes.map((fuelType, index) => {
              const priceKey = fuelType.toLowerCase() as keyof typeof price;
              return (
                <li key={index} className="text-[#3D405B]">
                  {fuelType}: ${price[priceKey]?.toFixed(2) || "N/A"}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
