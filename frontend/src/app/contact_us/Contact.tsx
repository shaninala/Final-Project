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
          className=""
        >
          <div className="mb-5">
            <label htmlFor="email" className="">
              Your Email Address:
            </label>
            <input type="email" id="email" name="email" className="" required />
          </div>

          <div className="mb-5">
            <label htmlFor="subject" className="">
              Subject:
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              className=""
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="message" className="">
              Please provide any additional information:
            </label>
            <textarea
              id="message"
              name="message"
              className=""
              rows={8}
              required // makes it mandatory field
            />
          </div>
          <button type="submit" className="">
            Submit
          </button>
        </form>
      </main>
    </>
  );
}
