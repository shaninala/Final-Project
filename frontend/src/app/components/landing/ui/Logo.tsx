import Link from "next/link";
import React from "react";
import Image from "next/image";
import logo from "../icons/logo.svg";

export default function Logo({ link }: { link: string }) {
  return (
    <Link href={link} rel="noopener noreferrer">
      <Image src={logo} alt="GasHub" />
    </Link>
  );
}
