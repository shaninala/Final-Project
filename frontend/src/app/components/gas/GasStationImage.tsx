"use client";

import Image from "next/image";
import DefaultImage from "../../../../public/gas_logo/default.png";
import { getGasStationLogo } from "./GasStationLogo";

export default function GasStationImage({ name }: { name: string }) {
  const logo = getGasStationLogo(name) || DefaultImage;

  return (
    <div className="w-[100px] h-[100px] rounded-full overflow-hidden bg-white flex items-center justify-center">
      <Image
        src={logo}
        alt={name}
        width={90}
        height={90}
        className="object-contain object-center"
      />
    </div>
  );
}
