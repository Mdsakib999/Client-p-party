import candidatesBanner from "../../assets/bg.png";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, Search } from "lucide-react";
import CandidateCard from "../../components/CandidateCard";
import Pagination from "../../components/Pagination";
import areasData from "../../data/areas.json";
import { useGetAllCandidatesQuery } from "../../redux/features/candidate/candidate.api";
import CandidateSkeleton from "../../utils/CandidateSkeleton";
import { translateArea } from "../../utils/areaTranslator";
import { useTranslation } from "react-i18next";

const ITEMS_PER_PAGE = 9;

const Candidates = () => {
  const { t, i18n } = useTranslation();
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSection, setActiveSection] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const containerRef = useRef(null);

  const { data, isLoading, isFetching } = useGetAllCandidatesQuery({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    division: selectedDivision?.name,
    district: selectedDistrict?.name,
    search: searchTerm || undefined,
  });

  const candidates = data?.data?.data || [];
  const totalPages = Math.ceil((data?.data?.total || 0) / ITEMS_PER_PAGE);

  useEffect(() => {
    const divs = Object.keys(areasData).map((d) => ({
      id: d,
      name: d,
      bn_name: d,
    }));
    setDivisions(divs);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setActiveSection(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDivisionClick = (division) => {
    setSelectedDivision(division);
    setSelectedDistrict(null);
    setCurrentPage(1);

    const divisionDistricts = areasData[division.name]
      ? Object.keys(areasData[division.name])
      : [];

    setDistricts(
      divisionDistricts.map((d) => ({
        id: d,
        name: d,
        bn_name: d,
      })),
    );

    setActiveSection("district");
  };

  // ✅ DISTRICT CLICK
  const handleDistrictClick = (district) => {
    setSelectedDistrict(district);
    setCurrentPage(1);
    setActiveSection(null);
  };

  // ✅ PAGE CHANGE
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0 });
  };

  if (isLoading) return <CandidateSkeleton />;

  return (
    <div className="min-h-screen w-full bg-gray-50 py-20">
      {/* Banner */}
      <div className="relative h-[470px]">
        <img
          src={candidatesBanner}
          alt="Candidates"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-8">
            {/* {t('candidates_banner_title')} */}
            Meet Our Candidates for the <br /> 2026 Electoral Journey
          </h2>

          {/* Search Box */}
          <div
            ref={containerRef}
            className="w-full max-w-5xl bg-white rounded-full shadow-2xl p-2 relative"
          >
            <div className="flex flex-row items-center gap-2 md:gap-0">
              {/* Search */}
              <div className="flex-1 px-3 md:px-5 py-3">
                <input
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder={t('search_placeholder')}
                  className="w-full outline-none bg-transparent"
                />
              </div>

              <div className="w-px h-10 bg-gray-200" />

              {/* Division */}
              <div
                onClick={() => setActiveSection("division")}
                className="flex-1 px-5 py-3 cursor-pointer"
              >
                {translateArea(selectedDivision?.name, i18n.language) || t('division_select')}
              </div>

              <div className="w-px h-10 bg-gray-200" />

              {/* District */}
              <div
                onClick={() => selectedDivision && setActiveSection("district")}
                className={`flex-1 px-5 py-3 ${selectedDivision
                  ? "cursor-pointer"
                  : "opacity-50 cursor-not-allowed"
                  }`}
              >
                {translateArea(selectedDistrict?.name, i18n.language) || t('district_select')}
              </div>

              <button className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center">
                <Search className="text-white" size={18} />
              </button>
            </div>

            {/* Dropdown */}
            {activeSection && (
              <div className="absolute left-0 right-0 top-full mt-4 bg-white rounded-2xl shadow-2xl p-6 z-50">
                {activeSection === "division" && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-emerald-50 p-4 rounded-lg">
                    {divisions.map((d) => (
                      <button
                        className="shadow bg-emerald-100 text-emerald-700 font-semibold md:p-2 rounded-2xl cursor-pointer hover:bg-emerald-200 transition-colors"
                        key={d.id}
                        onClick={() => handleDivisionClick(d)}
                      >
                        {translateArea(d.name, i18n.language)}
                      </button>
                    ))}
                  </div>
                )}

                {activeSection === "district" && (
                  <>
                    <button
                      onClick={() => setActiveSection("division")}
                      className="flex items-center gap-2 mb-4 cursor-pointer"
                    >
                      <ChevronLeft size={18} /> Back
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-emerald-50 p-4 rounded-lg">
                      {districts.map((d) => (
                        <button
                          key={d.id}
                          onClick={() => handleDistrictClick(d)}
                          className="shadow bg-emerald-100 text-emerald-700 font-semibold md:p-2 rounded-2xl cursor-pointer hover:bg-emerald-200 transition-colors"
                        >
                          {translateArea(d.name, i18n.language)}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Candidate List */}
      <div className="max-w-7xl mx-auto px-4 py-14">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isFetching ? (
            Array.from({ length: 9 }).map((_, index) => (
              <div
                key={index}
                className="border border-green-200 rounded-xl p-4 bg-white shadow-sm animate-pulse"
              >
                {/* Image */}
                <div className="h-40 w-full bg-green-100 rounded-lg mb-4" />

                {/* Name */}
                <div className="h-4 w-3/4 bg-green-200 rounded mb-2" />

                {/* Position */}
                <div className="h-3 w-1/2 bg-green-100 rounded mb-1" />

                {/* Location */}
                <div className="h-3 w-2/3 bg-green-100 rounded" />
              </div>
            ))
          ) : candidates.length > 0 ? (
            candidates.map((candidate) => (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500">{t('no_candidates')}</p>
            </div>
          )}
        </section>

        {totalPages > 1 && !isFetching && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default Candidates;
