"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, CircleUserRound } from "lucide-react";
import Logo from "./social/Logo";
import { UserButton } from "@clerk/nextjs";

const textStyle =
  "font-bold text-[#3D405B] hover:text-[#1a2a20] font-inter text-3xl hover:text-4xl hover:font-extrabold";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed w-full flex items-center px-8 py-6 bg-[#51B97B] z-1000">
      <div>
        <Logo link={"/"} />
      </div>

      <div className="flex-1 flex justify-center items-center space-x-8">
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

      {/* User button will appear after user signup or signin */}
      <div className="flex items-center space-x-4 ml-auto">
        <UserButton />
        <div className="relative">
          <button
            ref={buttonRef}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center space-x-2 bg-[#FAE5C3] text-[#333333] px-8 py-3 rounded-full border-4 border-[#A67C52] shadow-lg focus:outline-none focus:ring-0"
          >
            <Menu size={40} stroke="#A67C52" strokeWidth={2} />
            <CircleUserRound size={40} stroke="#A67C52" strokeWidth={2} />
          </button>

          {isMenuOpen && (
            <div
              ref={menuRef}
              className="absolute right-0 mt-2 w-52 bg-[#FAE5C3] rounded-lg shadow-lg border border-[#A67C52]"
            >
              <Link
                href="/sign-up/"
                className="block px-8 py-4 text-lg hover:text-2xl hover:font-bold"
              >
                Sign up
              </Link>
              <Link
                href="/sign-in/"
                className="block px-8 py-4 text-lg hover:text-2xl hover:font-bold"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
