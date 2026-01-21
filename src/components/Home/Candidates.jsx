import { HiArrowRight } from "react-icons/hi";
import { Link } from "react-router";
import LeaderCard from "./LeaderCard";

export const Candidates = () => {
  const candidates = [
    {
      id: 1,
      name: "Begum Khaleda Zia",
      position: "Chairperson",
      image: "https://api.bnpbd.org/api/upload/images/begum-khaleda-599985.jpg",
      highlight: false,
    },
    {
      id: 2,
      name: "Mr. Tarique Rahman",
      position: "Acting Chairman",
      image:
        "https://www.aljazeera.com/wp-content/uploads/2024/01/349B2U6-highres-1704353492.jpg?resize=1800%2C1800",
      highlight: true,
    },
    {
      id: 5,
      name: "Mirza Fakhrul Islam Alamgir",
      position: "Secretary General - BNP",
      image:
        "https://api.bnpbd.org/api/upload/images/bnp-press-release-4--6726.jpg",
      highlight: false,
    },
    {
      id: 3,
      name: "Salauddin Ahmed",
      position: "Member of National Standing Committee - BNP",
      image:
        "https://i0.wp.com/asiatimes.com/wp-content/uploads/2025/11/Bangladesh-Salahuddin-Ahmed.jpg?fit=1200%2C800&quality=89&ssl=1",
      highlight: false,
    },
    {
      id: 4,
      name: "Mr. Amir Khosru Chowdhury",
      position: "Member of National Standing Committee - BNP",
      image: "https://api.bnpbd.org/api/upload/images/13-1037d.jpg",
      highlight: false,
    },
  ];

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-green-700 text-white px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            Candidates
          </span>

          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 tracking-tight">
            Meet Our Candidates
          </h2>

          <p className="text-gray-600 text-lg mb-6">
            Leaders dedicated to representing the voices of the people
          </p>

          <div className="flex items-center justify-center gap-6">
            {/* OUTLINE BUTTON */}
            <Link
              to="/news"
              className="
      group flex items-center gap-2
      px-6 py-2.5
      rounded-full
      border-2 border-green-700
      text-green-800 font-medium
      bg-white/70 backdrop-blur
      transition-all duration-300
      hover:bg-green-50 hover:border-green-800
      hover:shadow-md hover:-translate-y-0.5
    "
            >
              Learn More
              <HiArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* PRIMARY BUTTON */}
            <Link
              to="/candidates"
              className="
      group flex items-center gap-2
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
              Our Leadership
              <HiArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Candidates Grid */}

        <div className="max-w-5xl mx-auto mb-16">
          {/* TOP ROW – 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12 max-w-xl mx-auto">
            {candidates.slice(0, 2).map((c) => (
              <LeaderCard key={c.id} candidate={c} />
            ))}
          </div>

          {/* BOTTOM ROW – 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {candidates.slice(2, 5).map((c) => (
              <LeaderCard key={c.id} candidate={c} />
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <Link
            to="/candidates"
            className="flex items-center gap-2 bg-green-700 text-white px-8 py-3 rounded-lg hover:bg-green-800 transition-colors font-medium text-lg"
          >
            View All <HiArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};
