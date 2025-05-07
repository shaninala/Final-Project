import { Button } from "../ui/Button";
import Image from "next/image";
import mainPic from "./images/main_pic.svg";

export default function Main() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center py-40 px-4 text-center bg-[#FAF3E0]">
      <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-[#3D405B] mb-8">
        Welcome to GasHub
      </h1>
      <p className="text-xl sm:text-3xl md:text-4xl text-[#3D405B] mb-8 max-w-6xl mx-auto">
        At GasHub, we believe you deserve to save on every tank. Discover the
        best gas prices near you in just a few taps, so you can keep more money
        in your pocket and hit the road with confidence. Let us help you fuel
        your journey for less!
      </p>
      <Button
        href="/gas"
        className="text-xl sm:text-3xl md:text-4xl px-20 py-5 rounded-3xl w-[300px] sm:w-[350px] md:w-[400px]"
      >
        Find Gas
      </Button>

      <div className="absolute bottom-4 right-10 w-[400px] h-[400px]">
        <Image src={mainPic} alt="Gas icon" fill className="object-contain" />
      </div>
    </section>
  );
}
