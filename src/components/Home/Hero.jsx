import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import bnpBanner from "../../assets/hero-banner.jpg";

const Hero = () => {
  return (
    <section className="w-full h-[500px] md:h-[600px] lg:h-[550px] max-w-7xl mx-auto overflow-visible p-4 relative mb-12">
      <img
        src={bnpBanner}
        alt="Bangladesh National Party Hero Banner"
        className="w-full h-full object-cover object-[32%_40%] md:object-center rounded-md"
      />

      <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-end md:justify-end mb-12">
        <div className="text-center text-green-900 px-6 max-w-3xl">
          <blockquote className="text-2xl md:text-4xl lg:text-4xl font-bold leading-tight tracking-tight mb-8  bg-white/80">
            <FaQuoteLeft className="inline mr-2" />
            Together, let's build Bangladesh into a democratic and developed
            nation
            <FaQuoteRight className="inline ml-2" />
          </blockquote>
        </div>
      </div>

      {/* Join Us Button at Bottom */}
      <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2">
        <button className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg transition-colors">
          Join Us
        </button>
      </div>
    </section>
  );
};

export default Hero;
