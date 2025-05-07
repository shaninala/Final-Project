import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAF3E0] flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-[#3D405B] mb-4">404 - Gas Station Not Found</h1>
      <p className="text-xl text-[#3D405B] mb-8">Sorry, we couldn't find the gas station you're looking for.</p>
      <Link
        href="/gas"
        className="bg-[#008737] text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-[#006B2B] transition-colors"
      >
        Back to Search
      </Link>
    </div>
  )
}