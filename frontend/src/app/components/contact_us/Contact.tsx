"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"

export default function Contact() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push("/contact_us/confirmation")
    } catch (error) {
      console.error("Error submitting form:", error)
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <main className="flex flex-col justify-start py-8 sm:py-12 md:py-16 px-4 pt-40 sm:pt-40 md:pt-40 bg-[#faf3e0] pb-20">
        <h1 className="text-[#3D405B] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 sm:mb-6 md:mb-8">
          Contact Us
        </h1>
        {/* Form container maybe to use in the future */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#faf3e0] p-4 sm:p-6 md:p-8 lg:p-10 rounded shadow-md flex flex-col gap-3 sm:gap-4 w-full max-w-[800px] mx-auto"
        >
          <div className="mb-3 sm:mb-4 md:mb-5">
            <label
              htmlFor="email"
              className="text-[#3D405B] block text-base sm:text-lg font-bold sm:font-extrabold mb-1 sm:mb-2"
            >
              Your Email Address:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 sm:p-3 bg-[#E8D9B5] border border-[#C2A885] rounded text-black text-base sm:text-lg font-normal mx-auto"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="mb-3 sm:mb-4 md:mb-5">
            <label
              htmlFor="subject"
              className="text-[#3D405B] block text-base sm:text-lg font-bold sm:font-extrabold mb-1 sm:mb-2"
            >
              Subject:
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-2 sm:p-3 bg-[#E8D9B5] border border-[#C2A885] rounded text-black text-base sm:text-lg font-normal"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="mb-3 sm:mb-4 md:mb-5">
            <label
              htmlFor="message"
              className="text-[#3D405B] block text-base sm:text-lg font-bold sm:font-extrabold mb-1 sm:mb-2"
            >
              Please provide any additional information:
            </label>
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 sm:p-3 bg-[#E8D9B5] border border-[#C2A885] rounded text-black text-base sm:text-lg font-normal"
              rows={6}
              required
              disabled={isSubmitting}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-[300px] md:w-[350px] lg:w-[400px] h-[50px] sm:h-[60px] md:h-[70px] lg:h-[80px] bg-[#008737] text-[#FAF3E0] text-xl sm:text-2xl md:text-3xl rounded font-serif mx-auto hover:bg-[#00A04A] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submit" : "Submit"}
          </button>
        </form>
      </main>
    </>
  )
}
