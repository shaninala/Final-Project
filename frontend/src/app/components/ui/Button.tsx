import type React from "react";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href: string;
  className?: string;
}

export function Button({ children, href, className = "" }: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-block bg-[#008737] hover:bg-[#006B2B] text-[#FAF3E0] font-bold py-2 px-4 rounded transition-colors ${className}`}
    >
      {children}
    </Link>
  );
}
