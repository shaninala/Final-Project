import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import gasStations from "../../../data/GasStationsData.json";
import type { GasStation, Review } from "./types";
import userImage from "../../../../public/user/userImage.jpg";
import GasStationLogo from "../../components/gas/GasStationImage";

export default async function GasStationDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const stationId = Number.parseInt(id);
  const station = gasStations.stations.find(
    (station) => station.id === stationId
  ) as GasStation | undefined;
  if (!station) {
    notFound();
  }

  const userReviews: Review[] = Array(25)
    .fill(null)
    .map((_, index) => ({
      user: `User ${index + 1}`,
      date: "April 1, 2025",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pretium lacus ac urna interdum, at aliquam nisi convallis. Vivamus euismod nisi sed lacus finibus, et tincidunt erat dictum. Nullam sit amet semper ligula. Fusce nec odio at nunc ultricies tincidunt. Proin dignissim lorem at ligula vulputate, vitae laoreet urna vestibulum. Curabitur ac diam nec ligula ornare tincidunt.",
    }));

  const stationName: string = station.name.split(" ")[0];
  const searchQuery: string = `${stationName} ${station.address}`;
  const fuelTypes: string[] = ["Regular", "Midgrade", "Premium", "Diesel"];
  return (
    <div className="min-h-screen bg-[#FAF3E0] justify-start py-8 sm:py-12 md:py-16 px-4 pt-40 sm:pt-40 md:pt-40 pb-20">
      <div className="max-w-6xl mx-auto">
        {/* Station Header */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-[#3D405B]">
          {station.name}
        </h1>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#3D405B] mb-6">
          ({station.address})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Station Info Card */}
          <div className="bg-[#E8D9B5] rounded-lg p-6 shadow-lg border-2 border-[#A67C52]">
            <div className="flex items-start gap-4">
              <div className="bg-white rounded-full flex-shrink-0">
                <GasStationLogo name={station.name} />
              </div>
              <div>
                <h3 className="text-3xl sm:text-4xl md:text-4xl font-bold text-[#3D405B]">
                  {station.name}
                </h3>
                <p className="text-2xl text-[#3D405B]">{station.address}</p>
                <p className="text-2xl text-[#3D405B]">{station.city}</p>
                <p className="text-2xl text-[#3D405B]">{station.phone}</p>
                <p className="text-2xl text-[#58A568] mt-2 font-medium">
                  Open 24 hours
                </p>
              </div>
            </div>
          </div>
          {/* Rating and Direction Card */}
          <div className="flex flex-col gap-4">
            <Link
              href={`https://maps.google.com/?q=${encodeURIComponent(
                searchQuery
              )}`}
              target="_blank"
              className="bg-[#008737] text-white py-4 rounded-lg text-center text-xl font-semibold hover:bg-[#006B2B] transition-colors shadow-md"
            >
              Get Direction
            </Link>
            <div className="bg-[#E8D9B5] rounded-lg p-6 flex-grow flex flex-col items-center justify-center shadow-lg border-2 border-[#A67C52]">
              <h3 className="text-2xl font-bold text-[#3D4058] mb-2">
                Station Rating
              </h3>
              <p className="text-3xl font-bold text-[#3D405B] mb-2">
                {station.rating.toFixed(1)} / 5.0
              </p>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <div key={star} className="text-4xl">
                    {star <= Math.floor(station.rating) ? (
                      <span className="text-yellow-400">★</span>
                    ) : (
                      <span className="text-gray-300">★</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Gas Prices Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-[#3D405B] mb-6">
            Gas Station Price
          </h2>
          <div className="bg-[#E8D9B5] rounded-lg p-4 shadow-xl border-2 border-[#A67C52]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {fuelTypes.map((fuelType) => {
                const priceKey =
                  fuelType.toLowerCase() as keyof typeof station.price;
                const price = station.price[priceKey];
                const hasFuelType = station.fuelTypes.includes(fuelType);

                return (
                  <div
                    key={fuelType}
                    className="bg-[#E8D9B5] rounded-md p-4 text-center shadow-md border border-[#A67C52]"
                  >
                    <h3 className="text-xl font-bold text-[#3D405B] mb-2">
                      {fuelType}
                    </h3>
                    <p className="text-2xl font-bold text-[#3D405B] mb-2">
                      $ {hasFuelType ? price?.toFixed(2) : "- - -"}
                    </p>
                    <p className="text-sm text-[#3D405B]">Confirmed</p>
                    <p className="text-sm text-[#3D405B]">
                      {station.lastUpdated}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div>
          <h2 className="text-3xl font-bold text-[#3D405B] mb-6">
            Gas Station Review
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userReviews.map((review, index) => (
              <div
                key={index}
                className="bg-[#E8D9B5] rounded-lg p-6 shadow-lg border-2 border-[#A67C52]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Image
                    src={userImage}
                    alt={review.user}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-[#3D405B]">
                      {review.user}
                    </h3>
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
  );
}
