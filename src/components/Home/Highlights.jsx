import { HiArrowRight } from "react-icons/hi";
import { Link } from "react-router";

import HighlightCard from "./HighlightCard";

const Highlights = () => {
  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold  mb-6 tracking-tight">
            Movements, Messages, Momentum
          </h2>

          <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-6">
            Capturing the voices, initiatives, and collective actions that drive
            change and reflect the aspirations of the people.
          </p>



          <Link
              to="/contact"
              className="
      group inline-flex items-center gap-2
      px-7 py-3
      rounded-full
      bg-gradient-to-r from-green-700 to-green-600
      text-white font-semibold
      shadow-lg shadow-green-700/30
      transition-all duration-300
      hover:from-green-800 hover:to-green-700
      hover:shadow-xl hover:-translate-y-0.5
      focus:ring-4 focus:ring-green-300
    "
            >
              Contact Us
              <HiArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
        </div>

        <HighlightCard />
      </div>
    </section>
  );
};

export default Highlights;
