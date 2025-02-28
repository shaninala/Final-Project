"use client";
import Link from "next/link";

const textStyle =
  "font-bold text-[#3D405B] hover:text-[#1a2a20] font-inter text-3xl";

export default function Navigation() {
  return (
    <nav className="fixed w-full flex items-center justify-between px-8 py-6 bg-[#51B97B] z-1000">
      <div className=""></div>
      <div className="flex items-center space-x-8">
        <Link href="/gas" className={textStyle}>
          Find Gas Station
        </Link>
        <Link href="/#about" className={textStyle}>
          About
        </Link>
        <Link href="/#team" className={textStyle}>
          Team
        </Link>
        <Link href="/contact_us" className={textStyle}>
          Contact
        </Link>
      </div>
      <div className="relative"></div>
    </nav>
  );
}
