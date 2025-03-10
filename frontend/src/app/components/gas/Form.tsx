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
      <form>
        <h1>Search Gas Station</h1>
        <div>
          <label>Zip Code/City:</label>
          <Input
            id="zipCode"
            value={zipCode}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setZipCode(event.target.value)
            }
            placeholder="Search gas stations by city or zip code..."
          />
        </div>
        <div>
          <div>
            <label>Fuel Type</label>
            <Select
              id="fuelType"
              value={fuelType}
              onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                setFuelType(event.target.value)
              }
              options={["Regular", "Midgrade", "Premium", "Diesel"]}
            />
          </div>
        </div>
        <div>
          <label>Self-Service</label>
          <Select
            id="selfService"
            value={selfService}
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              setSelfService(event.target.value)
            }
            options={["Yes", "No"]}
          />
        </div>
        <div>
          <Button type="submit">Search Gas Station</Button>
        </div>
      </form>
    </>
  );
}
