export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col justify-center bg-[#FAF3E0] py-40 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#E8D9B5] rounded-[48px] p-16">
          <h1 className="max-w-5xl mx-auto text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center font-bold text-[#3D405B] mb-8">
            Why was GasHub created?
          </h1>
          <p className="text-2xl sm:text-3xl md:text-4xl text-[#3D405B] mb-8 max-w-6xl mx-auto">
            We're drivers, just like you, and we know how frustrating it is to
            watch gas prices constantly change and feel like you're always
            paying too much. After countless road trips and daily commutes, we
            realized how tough it can be to find affordable gas without wasting
            time and money, so we decided to do something about it that's how
            GasHub was born. Built from real experiences on the road, GasHub is
            designed to help drivers easily find the best gas prices nearby. Our
            mission is simple: save you money, cut down on fuel waste, and take
            the stress out of filling up. Because at the end of the day, you
            should spend less time worrying about gas prices and more time
            enjoying the ride.
          </p>
        </div>
      </div>
    </section>
  );
}
