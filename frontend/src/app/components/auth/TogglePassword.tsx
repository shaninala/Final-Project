import React from "react";
import Image from "next/image";
import ShowPassIcon from "./show_pass.svg";
import HidePassIcon from "./hide_pass.svg";

interface TogglePasswordProps {
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TogglePassword({
  showPassword,
  setShowPassword,
  ...props
}: TogglePasswordProps) {
  return (
    <button
      type="button"
      className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center"
      onClick={() => setShowPassword((prev) => !prev)}
    >
      <Image
        src={showPassword ? HidePassIcon : ShowPassIcon}
        alt={showPassword ? "Hide Password" : "Show Password"}
        width={20}
        height={20}
      />
    </button>
  );
}
