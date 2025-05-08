import Link from "next/link"

export default function ContactConfirmation() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF3E0] items-center justify-center px-4 py-16">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-[#3D405B] text-4xl sm:text-5xl md:text-6xl font-bold mb-8">Contact Us</h1>

        <h2 className="text-[#3D405B] text-2xl sm:text-3xl font-bold mb-4">Thank you for contacting GasHub</h2>

        <p className="text-[#3D405B] text-md sm:text-lg mb-12">One of our representatives will contact you shortly.</p>
      </div>
    </div>
  )
}
