import { HiArrowRight } from "react-icons/hi";
import { Link } from "react-router";

import HighlightCard from "./HighlightCard";

const Highlights = () => {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="ttext-3xl md:text-4xl font-bold  mb-6 tracking-tight">
            Movements, Messages, Momentum
          </h2>

          <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-6">
            We Focus on the details of everything we do. All to help businesses
            around the world Focus on what's most important to them.
          </p>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-green-700 text-white px-6 py-2.5 rounded hover:bg-green-800 transition-colors font-medium"
          >
            Contact Us <HiArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <HighlightCard />
      </div>
    </section>
  );
};

export default Highlights;
