import candidatesBanner from "../../assets/bg.png";
import { useEffect, useState, useRef } from "react";
import { ChevronLeft, Search } from "lucide-react";
import CandidateCard from "../../components/CandidateCard";
import Pagination from "../../components/Pagination";
import areasData from "../../data/areas.json";
import { useGetAllCandidatesQuery } from "../../redux/features/candidate/candidate.api";
import BNPLoader from "../../utils/BNPLoader";

const Candidates = () => {
  const { data: candidatesData, isLoading } = useGetAllCandidatesQuery();
  const candidates = candidatesData?.data || [];

  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSection, setActiveSection] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const containerRef = useRef(null);
  const searchInputRef = useRef(null);

  const itemsPerPage = 9;

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

  const handleDistrictClick = (district) => {
    setSelectedDistrict(district);
    setActiveSection(null);
    setCurrentPage(1);
  };

  const filteredCandidates = candidates.filter((c) => {
    const matchDivision = selectedDivision
      ? c.division?.includes(selectedDivision.name)
      : true;

    const matchDistrict = selectedDistrict
      ? c.district?.includes(selectedDistrict.name)
      : true;

    const matchSearch = searchTerm
      ? c.name?.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    return matchDivision && matchDistrict && matchSearch;
  });

  const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage);

  if (isLoading) return <BNPLoader />;

  return (
    <div className="min-h-screen w-full bg-gray-50">
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
            Meet Our Candidates for the <br /> 2026 Electoral Journey
          </h2>

          {/* Search Box */}
          <div
            ref={containerRef}
            className="w-full max-w-5xl bg-white rounded-full shadow-2xl p-2 relative"
          >
            <div className="flex flex-row items-center gap-2 md:gap-0">
              {/* Search */}
              <div
                className="flex-1 px-3 md:px-5 py-3 w-full min-w-0"
                onClick={() => setActiveSection(null)}
              >
                <label className="hidden md:block text-xs font-semibold text-gray-700 mb-1">
                  Search
                </label>
                <input
                  ref={searchInputRef}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search candidate"
                  className="w-full outline-none text-sm text-gray-700 bg-transparent"
                />
              </div>

              {/* Divider */}
              <div className="w-px h-8 md:h-12 bg-gray-200"></div>

              {/* Division */}
              <div
                onClick={() => setActiveSection("division")}
                className="flex-1 px-3 md:px-5 py-3 w-full min-w-0 cursor-pointer hover:bg-gray-50 rounded-full transition-colors"
              >
                <div className="w-full">
                  <label className="hidden md:block text-xs font-semibold text-gray-700 mb-1">
                    Division
                  </label>
                  <div className="text-xs md:text-sm text-gray-600 truncate">
                    {selectedDivision?.name || "Division Select"}
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="w-px h-8 md:h-12 bg-gray-200"></div>

              {/* District */}
              <div
                onClick={() => selectedDivision && setActiveSection("district")}
                className={`flex-1 px-3 md:px-5 py-3 w-full min-w-0 rounded-full transition-colors ${
                  selectedDivision
                    ? "cursor-pointer hover:bg-gray-50"
                    : "opacity-50 cursor-not-allowed"
                }`}
              >
                <div className="w-full">
                  <label className="hidden md:block text-xs font-semibold text-gray-700 mb-1">
                    District
                  </label>
                  <div className="text-xs md:text-sm text-gray-600 truncate">
                    {selectedDistrict?.name || "District Select"}
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <button className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-gray-400 hover:bg-gray-600 rounded-full md:mx-2 transition-colors flex-shrink-0">
                <Search className="text-white" size={18} />
              </button>
            </div>

            {/* Dropdown */}
            {activeSection && (
              <div className="absolute left-0 right-0 top-full mt-2 md:mt-4 bg-white rounded-2xl shadow-2xl p-4 md:p-6 z-50 max-h-[70vh] overflow-y-auto">
                {activeSection === "division" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                    {divisions.map((d) => (
                      <button
                        key={d.id}
                        onClick={() => handleDivisionClick(d)}
                        className="p-3 md:p-4 border border-gray-200 rounded-xl text-left hover:bg-gray-50 hover:border-blue-300 transition-all active:scale-95"
                      >
                        <div className="font-semibold text-sm md:text-base">
                          {d.name}
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {activeSection === "district" && (
                  <>
                    <button
                      onClick={() => setActiveSection("division")}
                      className="flex items-center gap-2 mb-4 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <ChevronLeft size={18} /> Back to Divisions
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                      {districts.map((d) => (
                        <button
                          key={d.id}
                          onClick={() => handleDistrictClick(d)}
                          className="p-3 md:p-4 border border-gray-200 rounded-xl text-left hover:bg-gray-50 hover:border-blue-300 transition-all active:scale-95"
                        >
                          <div className="font-semibold text-sm md:text-base">
                            {d.name}
                          </div>
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
          {filteredCandidates
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((candidate) => (
              <CandidateCard key={candidate._id} candidate={candidate} />
            ))}
        </section>

        {totalPages > 1 && (
          <div className="mt-10">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Candidates;
