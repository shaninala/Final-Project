import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      className="bg-[#008737] text-[#FAF3E0] py-6 w-[1000px] text-3xl font-medium rounded-xl focus:outline-none"
      {...props}
    >
      {children}
    </button>
  );
}
