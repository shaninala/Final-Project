"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, CircleUserRound } from "lucide-react";
import logo from "./icons/logo";
import { useAuth, SignOutButton, useUser } from "@clerk/nextjs";
import Logo from "./icons/logo";

const textStyle =
  "font-bold text-[#3D405B] hover:text-[#1a2a20] font-inter text-3xl hover:text-4xl hover:font-extrabold";

const capitalizeFirstLetter = (string: string | null | undefined): string => {
  if (!string) return "User";
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const displayName = capitalizeFirstLetter(
    user?.username || user?.firstName || "user"
  );

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

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed w-full flex items-center px-8 py-6 bg-[#51B97B] z-1000">
      <div>
        <logo link={"/"} />
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

      <div className="flex items-center space-x-4 ml-auto">
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
              {isSignedIn ? (
                <>
                  <div className="block w-full text-left px-8 pt-4 text-xl font-bold">
                    Welcome {displayName}
                  </div>
                  <SignOutButton>
                    <button
                      className="block w-full text-left px-8 py-4 text-lg hover:text-2xl hover:font-bold"
                      onClick={closeMenu}
                    >
                      Sign out
                    </button>
                  </SignOutButton>
                </>
              ) : (
                <>
                  <Link
                    href="/sign-up/"
                    className="block px-8 py-4 text-lg hover:text-2xl hover:font-bold"
                    onClick={closeMenu}
                  >
                    Sign up
                  </Link>
                  <Link
                    href="/sign-in/"
                    className="block px-8 py-4 text-lg hover:text-2xl hover:font-bold"
                    onClick={closeMenu}
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
