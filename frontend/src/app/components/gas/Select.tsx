import type { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  options: string[];
}

export default function Select({ id, options, ...props }: SelectProps) {
  return (
    <select
      id={id}
      className="bg-[#E8D9B5] border border-[#C2A885] w-full p-5 appearance-none cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#C2A885]"
      {...props}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
