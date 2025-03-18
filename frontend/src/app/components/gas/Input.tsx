import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
}

export default function Input({ id, ...props }: InputProps) {
  return (
    <input
      id={id}
      type="text"
      className="bg-[#E8D9B5] border border-[#C2A885] w-full p-5 focus:outline-none focus:ring-4 focus:ring-[#C2A885]"
      {...props}
    />
  );
}
