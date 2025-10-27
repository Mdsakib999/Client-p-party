const Hero = () => {
  return (
    <section className="w-full h-[500px] md:h-[600px] lg:h-[550px] max-w-8xl mx-auto overflow-visible p-6 relative mb-12">
      <img
        src="./src/assets/hero-banner.png"
        alt="Bangladesh National Party Hero Banner"
        className="w-full h-full object-cover rounded-md"
      />

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 translate-y-1/2">
        <button className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg transition-colors">
          Join Us
        </button>
      </div>
    </section>
  );
};

export default Hero;
