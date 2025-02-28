import Link from "next/link";
import React from "react";
import Image from "next/image";
import linkedin from "../icons/linkedin.svg";

export default function Linkedin({ url }: { url: string }) {
  return (
    <Link href={url} target="_blank" rel="noopener noreferrer">
      <Image
        src={linkedin}
        alt="Linkedin"
        className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 hover:scale-100"
      />
    </Link>
  );
}
