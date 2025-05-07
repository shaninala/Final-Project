import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      className="bg-[#008737] text-[#FAF3E0] py-3 sm:py-4 md:py-5 lg:py-6 w-full sm:w-[300px] md:w-[400px] lg:w-[500px] text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium rounded-xl focus:outline-none hover:bg-[#006B2B] transition-colors"
      {...props}
    >
      {children}
    </button>
  );
}
