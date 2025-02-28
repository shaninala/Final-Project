export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col jusity-center bg-[#CFE1B9] py-20 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="max-w-7xl mx-auto text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-center font-bold text-[#3D405B] mb-8">
          Why was GasHub created?
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl text-[#3D405B] mb-8 max-w-6xl mx-auto">
          We're drivers, just like you, and we know how frustrating it is to
          watch gas prices constantly change and feel like you're always paying
          too much. After countless road trips and daily commutes, we realized
          how tough it can be to find affordable gas without wasting time and
          money, so we decided to do something about it—that's how GasHub was
          born. Built from real experiences on the road, GasHub is designed to
          help drivers easily find the best gas prices nearby. Our mission is
          simple: save you money, cut down on fuel waste, and take the stress
          out of filling up. Because at the end of the day, you should spend
          less time worrying about gas prices and more time enjoying the ride.
        </p>
      </div>
    </section>
  );
}
