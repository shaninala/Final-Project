import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
}

export default function Input({ id, ...props }: InputProps) {
  return (
    <input
      id={id}
      type="text"
      className="bg-[#E8D9B5] border border-[#C2A885] w-full p-3 sm:p-4 md:p-5 text-sm sm:text-base focus:outline-none focus:ring-4 focus:ring-[#C2A885] rounded"
      required
      {...props}
    />
  );
}
