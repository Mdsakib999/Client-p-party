import { HiArrowRight } from "react-icons/hi";
import { Link } from "react-router";
import LeaderCard from "./LeaderCard";

export const Candidates = () => {
  const candidates = [
    {
      id: "6977f60d315fd66776c74e8c",
      name: "Mr. Tarique Rahman",
      position: "Chairman",
      image:
        "https://sgp1.digitaloceanspaces.com/dc2/news/TZ8F90UQut3CyaX2i2ooybLGUedSfZqfwuISKfaT.jpg",
      highlight: true,
    },
    {
      id: "6977f60d315fd66776c74e8d",
      name: "Mirza Fakhrul Islam Alamgir",
      position: "Secretary General - BNP",
      image:
        "https://api.bnpbd.org/api/upload/images/bnp-press-release-4--6726.jpg",
      highlight: false,
    },
    {
      id: "6977f60d315fd66776c74e90",
      name: "Salauddin Ahmed",
      position: "Member of National Standing Committee - BNP",
      image:
        "https://i0.wp.com/asiatimes.com/wp-content/uploads/2025/11/Bangladesh-Salahuddin-Ahmed.jpg?fit=1200%2C800&quality=89&ssl=1",
      highlight: false,
    },
    {
      id: "6977f60d315fd66776c74e8e",
      name: "Mirza Abbas Uddin Ahmed",
      position: "Member of National Standing Committee - BNP",
      image:
        "https://www.bssnews.net/assets/news_photos/2025/10/28/image-325864-1761651827.jpg",
      highlight: false,
    },
    {
      id: "6977f60d315fd66776c74e8f",
      name: "Mr. Amir Khosru Chowdhury",
      position: "Member of National Standing Committee - BNP",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZicoZBVLiVJL-iEFshJGb-chJZxBeb9_Y4A&s",
      highlight: false,
    },
  ];

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-green-700 text-white px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            Candidates
          </span>

          <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
            Meet Our Candidates
          </h2>

          <p className="text-gray-600 text-lg">
            Leaders dedicated to representing the voices of the people
          </p>
        </div>

        {/* Candidates Grid */}
        <div className="max-w-5xl mx-auto mb-16">
          {/* TOP ROW – 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12 max-w-xl mx-auto">
            {candidates.slice(0, 2).map((c) => (
              <Link key={c.id} to={`/candidates/${c.id}`}>
                <LeaderCard candidate={c} />
              </Link>
            ))}
          </div>

          {/* BOTTOM ROW – 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {candidates.slice(2, 5).map((c) => (
              <Link key={c.id} to={`/candidates/${c.id}`}>
                <LeaderCard candidate={c} />
              </Link>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <Link
            to="/candidates"
            className="group flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-green-700 to-green-600 text-white font-semibold shadow-lg transition-all"
          >
            View All
            <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};