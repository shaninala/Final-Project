export default function Contact() {
  return (
    <>
      <main className="flex flex-col justify-center py-16 px-4 pt-60 min-h-screen bg-[#faf3e0]">
        <h1 className="text-[#3D405B] text-6xl font-bold text-center mb-8">
          Contact Us
        </h1>
        {/* Form container maybe to use in the future */}
        <form
          action="#" // where to send the data
          method="POST" // for security
          className="bg-[#faf3e0] p-10 rounded shadow-md flex flex-col gap-4 max-w-[800px] w-full mx-auto"
        >
          <div className="mb-5">
            <label
              htmlFor="email"
              className="text-[#3D405B] block text-lg font-extrabold mb-2"
            >
              Your Email Address:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-3 bg-[#E8D9B5] border border-[#C2A885] rounded text-black text-lg font-normal mx-auto"
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="subject"
              className="text-[#3D405B] block text-lg font-extrabold mb-2"
            >
              Subject:
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              className="w-full p-3 bg-[#E8D9B5] border border-[#C2A885] rounded text-black text-lg font-normal"
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="message"
              className="text-[#3D405B] block text-lg font-extrabold mb-2"
            >
              Please provide any additional information:
            </label>
            <textarea
              id="message"
              name="message"
              className="w-full p-3 bg-[#E8D9B5] border border-[#C2A885] rounded text-black text-lg font-normal"
              rows={8}
              required // makes it mandatory field
            />
          </div>
          <button
            type="submit"
            className="w-[400px] h-[80px] bg-[#008737] text-[#FAF3E0] text-3xl rounded font-serif mx-auto hover:bg-[#00A04A]"
          >
            Submit
          </button>
        </form>
      </main>
    </>
  );
}
