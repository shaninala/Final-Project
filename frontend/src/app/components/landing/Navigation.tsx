"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, CircleUserRound } from "lucide-react";
import Logo from "./ui/Logo";
import { useAuth, SignOutButton, useUser } from "@clerk/nextjs";

const textStyle =
  "font-bold text-[#3D405B] hover:text-[#1a2a20] font-inter text-3xl hover:text-4xl hover:font-extrabold";

const capitalizeFirstLetter = (string: string | null | undefined): string => {
  if (!string) return "User";
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileButtonRef = useRef<HTMLButtonElement | null>(null);
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
      if (
        mobileButtonRef.current &&
        !mobileButtonRef.current.contains(event.target as Node) &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
      
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const menuItemStyle =
    "block w-full px-8 py-4 text-lg hover:text-xl hover:font-bold transition-all duration-150 hover:bg-[#E5C9A0]";
  const firstItemStyle = "rounded-t-lg";
  const lastItemStyle = "rounded-b-lg";

  return (
    <nav className="fixed w-full flex items-center justify-between px-8 py-6 bg-[#51B97B] z-1000">
      <div className="flex items-center">
        <div className="relative">
          <button
            ref={mobileButtonRef}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="mr-2 lg:hidden flex items-center space-x-2 bg-[#FAE5C3] text-[#333333] px-2 py-1 rounded-lg border-2 border-[#A67C52] shadow-lg focus:outline-none focus:ring-0"
          >
            <Menu size={40} stroke="#A67C52" strokeWidth={2} />
          </button>

          {isMobileMenuOpen && (
            <div
              ref={mobileMenuRef}
              className="absolute left-0 mt-2 w-60 bg-[#FAE5C3] rounded-lg shadow-lg border border-[#A67C52] lg:hidden z-50 overflow-hidden"
              style={{ top: "100%" }}
            >
              <Link
                href="/gas"
                className={`${menuItemStyle} ${firstItemStyle}`}
                onClick={closeMobileMenu}
              >
                Find Gas Station
              </Link>
              <Link
                href="/#about"
                className={menuItemStyle}
                onClick={closeMobileMenu}
              >
                About
              </Link>
              <Link
                href="/#team"
                className={menuItemStyle}
                onClick={closeMobileMenu}
              >
                Team
              </Link>
              <Link
                href="/contact_us"
                className={`${menuItemStyle} ${lastItemStyle}`}
                onClick={closeMobileMenu}
              >
                Contact
              </Link>
            </div>
          )}
        </div>
        <Logo link={"/"} />
      </div>
      <div className="hidden lg:flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
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
            className="absolute right-0 mt-2 w-52 bg-[#FAE5C3] rounded-lg shadow-lg border border-[#A67C52] overflow-hidden"
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
    </nav>
  );
}
