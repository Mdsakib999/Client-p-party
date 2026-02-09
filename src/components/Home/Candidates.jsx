import { HiArrowRight } from "react-icons/hi";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import LeaderCard from "./LeaderCard";

export const Candidates = () => {
  const { t } = useTranslation();
  const candidates = [
    {
      id: "6977f60d315fd66776c74e8c",
      name: "Mr. Tarique Rahman",
      position: "Chairman",
      image:
        "https://i.ibb.co.com/Cs7bbfvy/tarak.jpg",
      highlight: true,
    },
    {
      id: "6977f60d315fd66776c74e8d",
      name: "Mirza Fakhrul Islam Alamgir",
      position: "Secretary General",
      image:
        "https://i.ibb.co.com/Rp0bY4Rk/fakrul.jpg",
      highlight: false,
    },
    {
      id: "6977f60d315fd66776c74e90",
      name: "Salauddin Ahmed",
      position: "Member of National Standing Committee",
      image:
        "https://i.ibb.co.com/gbz2WjMV/salauddin.webp",
      highlight: false,
    },
    {
      id: "6977f60d315fd66776c74e8e",
      name: "Mirza Abbas Uddin Ahmed",
      position: "Member of National Standing Committee",
      image:
        "https://i.ibb.co.com/qMgCB92N/abbaas.webp",
      highlight: false,
    },
    {
      id: "6977f60d315fd66776c74e8f",
      name: "Mr. Amir Khosru Chowdhury",
      position: "Member of National Standing Committee",
      image:
        "https://i.ibb.co.com/whrm3QZh/amir-Kusro.jpg",
      highlight: false,
    },
  ];

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Link to='/candidates' className="inline-flex items-center gap-2 bg-green-700 text-white px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            {t('home_candidates_badge')}
          </Link>

          <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
            {t('home_candidates_title')}
          </h2>

          <p className="text-gray-600 text-lg">
            {t('home_candidates_subtitle')}
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
            {t('home_candidates_view_all')}
            <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};