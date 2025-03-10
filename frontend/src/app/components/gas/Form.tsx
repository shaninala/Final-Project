"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Button from "./Button";
import Input from "./Input";
import Select from "./Select";

export default function Form() {
  const [zipCode, setZipCode] = useState<string>("");
  const [fuelType, setFuelType] = useState<string>("Regular");
  const [selfService, setSelfService] = useState<string>("Yes");

  return (
    <>
      <form className="space-y-6">
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
    </>
  );
}
