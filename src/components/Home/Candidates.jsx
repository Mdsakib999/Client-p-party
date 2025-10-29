import { HiArrowRight } from "react-icons/hi";
import { Link } from "react-router";

export const Candidates = () => {
  const candidates = [
    {
      id: 1,
      name: "Begum Khaleda Zia",
      position: "Chairperson",
      image: "./src/assets/bnp-1.jpg",
      highlight: false,
    },
    {
      id: 2,
      name: "Mr. Tarique Rahman",
      position: "Acting Chairman",
      image: "./src/assets/bnp-2.jpg",
      highlight: true,
    },
    {
      id: 3,
      name: "Mr. Mirza Abbas",
      position: "Member Standing Committee",
      image: "./src/assets/bnp-3.jpg",
      highlight: false,
    },
    {
      id: 4,
      name: "Dr. Khandaker Mosharraf Hossain",
      position: "Member Standing Committee",
      image: "./src/assets/bnp-4.jpg",
      highlight: false,
    },
    {
      id: 5,
      name: "Mirza Fakhrul Islam Alamgir",
      position: "Secretary General",
      image: "./src/assets/bnp-5.jpg",
      highlight: false,
    },
  ];

  return (
    <section className="py-16 px-6 bg-white">
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
            Meet our the candidates
          </h2>

          <p className="text-gray-600 text-lg mb-6">
            Who's Running & Why It Matters
          </p>

          <div className="flex items-center justify-center gap-4">
            <Link
              to="/candidates"
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Learn More <HiArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/get-involved"
              className="flex items-center gap-2 bg-green-700 text-white px-6 py-2.5 rounded hover:bg-green-800 transition-colors font-medium"
            >
              Get Involved <HiArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Candidates Grid */}
        <div className="max-w-5xl mx-auto mb-12">
          {/* First Row - 2 cards centered */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6 max-w-3xl mx-auto">
            {candidates.slice(0, 2).map((candidate) => (
              <div
                key={candidate.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow max-w-64 mx-auto"
              >
              <div className="aspect-[3/4] overflow-hidden bg-gray-100">
              <img
              src={candidate.image}
              alt={candidate.name}
              className="w-full h-full object-contain"
              />
              </div>
              <div className="p-2 text-center">
              <h3 className="text-base font-bold mb-1">{candidate.name}</h3>
                  <p
                    className={
                      candidate.highlight
                        ? "text-green-600 font-medium text-sm"
                        : "text-gray-600 text-sm"
                    }
                  >
                    {candidate.position}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Second Row - 3 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {candidates.slice(2, 5).map((candidate) => (
              <div
                key={candidate.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow max-w-64 mx-auto"
              >
              <div className="aspect-[3/4] overflow-hidden bg-gray-100">
              <img
              src={candidate.image}
              alt={candidate.name}
              className="w-full h-full object-contain"
              />
              </div>
              <div className="p-2 text-center">
              <h3 className="text-base font-bold mb-1">{candidate.name}</h3>
                  <p
                    className={
                      candidate.highlight
                        ? "text-green-600 font-medium text-sm"
                        : "text-gray-600 text-sm"
                    }
                  >
                    {candidate.position}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All Button */}
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
