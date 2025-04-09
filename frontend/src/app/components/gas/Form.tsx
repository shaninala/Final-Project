"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Input from "./Input";
import Select from "./Select";
import Button from "./Button";
import GasStationCard from "./GasStationCard";
import gasStations from "../../../data/GasStationsData.json";

interface GasStation {
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

const CardProps = (station: GasStation) => {
  return {
    id: station.id,
    name: station.name,
    address: station.address,
    city: station.city,
    zipCode: station.zipCode,
    fuelTypes: station.fuelTypes,
    selfService: station.selfService,
    price: station.price,
  };
};

export default function Form() {
  const [zipCode, setZipCode] = useState<string>("");
  const [fuelType, setFuelType] = useState<string>("Regular");
  const [selfService, setSelfService] = useState<string>("Yes");
  const [results, setResults] = useState<GasStation[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const stations = gasStations.stations as unknown as GasStation[];
    const filteredGasStations = stations.filter((station) => {
      const matchesZipCode =
        station.zipCode.includes(zipCode) ||
        station.city.toLowerCase().includes(zipCode.toLowerCase());
      const matchesFuelType = station.fuelTypes.includes(fuelType);
      const matchesSelfService =
        selfService === "No" ? station.selfService : !station.selfService;
      return matchesZipCode && matchesFuelType && matchesSelfService;
    });
    setResults(filteredGasStations);
    setHasSearched(true);
  };

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
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setZipCode(event.target.value)
            }
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
              onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                setFuelType(event.target.value)
              }
              options={["Regular", "Midgrade", "Premium", "Diesel"]}
            />
          </div>
          <div className="space-y-3">
            <label
              htmlFor="selfService"
              className="text-sm sm:text-md md:text-lg lg:text-xl block text-[#3D405B] font-semibold"
            >
              Self-Service
            </label>
            <Select
              id="selfService"
              value={selfService}
              onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                setSelfService(event.target.value)
              }
              options={["Yes", "No"]}
            />
          </div>
        </div>
        <div className="flex justify-center pt-4">
          <Button type="submit">Search Gas Station</Button>
        </div>
      </form>

      {hasSearched && (
        <div className="mt-8">
          {results.length > 0 ? (
            <div className="space-y-4">
              {results.map((station) => (
                <GasStationCard key={station.id} {...CardProps(station)} />
              ))}
            </div>
          ) : (
            <p className="text-center text-[#3D405B]">
              No gas stations found near {zipCode}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
