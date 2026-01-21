import candidatesBanner from "../../assets/candidates-banner.jpg";
import { useEffect, useState, useRef } from "react";
import { ChevronLeft, Search } from "lucide-react";
import CandidateCard from "../../components/CandidateCard";
import Pagination from "../../components/Pagination";
import areasData from "../../data/areas.json";
// import { useGetAllCandidatesQuery } from "../../redux/features/candidate/candidate.api";
// import BNPLoader from "../../utils/BNPLoader";
import candidatesData from "../../data/candidates3.json";

const Candidates = () => {
  // const { data: candidatesData, isLoading } = useGetAllCandidatesQuery();
  // const candidates = candidatesData?.data || [];
  const candidates = candidatesData || [];

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

  // if (isLoading) return <BNPLoader />;

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* Banner */}
      <div className="relative h-[410px]">
        <img
          src={candidatesBanner}
          alt="Candidates"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-8">
            Our nominees for the <br /> 2026 elections
          </h2>

          {/* Search Box */}
          <div
            ref={containerRef}
            className="w-full max-w-5xl bg-white rounded-full shadow-2xl p-2 relative"
          >
            <div className="flex flex-col md:flex-row items-center">
              {/* Search */}
              <div
                className="flex-1 px-5 py-3 w-full"
                onClick={() => setActiveSection(null)}
              >
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Search
                </label>
                <input
                  ref={searchInputRef}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search candidate"
                  className="w-full outline-none text-sm text-gray-700"
                />
              </div>

              {/* Division */}
              <div
                onClick={() => setActiveSection("division")}
                className="flex-1 px-5 py-3 w-full cursor-pointer hover:bg-gray-50 rounded-full"
              >
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Division
                </label>
                <div className="text-sm text-gray-600 truncate">
                  {selectedDivision?.name || "Select division"}
                </div>
              </div>

              {/* District */}
              <div
                onClick={() => selectedDivision && setActiveSection("district")}
                className={`flex-1 px-5 py-3 w-full rounded-full ${
                  selectedDivision
                    ? "cursor-pointer hover:bg-gray-50"
                    : "opacity-50 cursor-not-allowed"
                }`}
              >
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  District
                </label>
                <div className="text-sm text-gray-600 truncate">
                  {selectedDistrict?.name || "Select district"}
                </div>
              </div>

              <div className="hidden md:flex items-center justify-center px-6">
                <Search />
              </div>
            </div>

            {/* Dropdown */}
            {activeSection && (
              <div className="absolute left-0 right-0 top-full mt-4 bg-white rounded-2xl shadow-2xl p-6 z-50">
                {activeSection === "division" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {divisions.map((d) => (
                      <button
                        key={d.id}
                        onClick={() => handleDivisionClick(d)}
                        className="p-4 border rounded-xl text-left hover:bg-gray-50 transition"
                      >
                        <div className="font-semibold">{d.name}</div>
                      </button>
                    ))}
                  </div>
                )}

                {activeSection === "district" && (
                  <>
                    <button
                      onClick={() => setActiveSection("division")}
                      className="flex items-center gap-2 mb-4 text-sm font-medium text-gray-600"
                    >
                      <ChevronLeft size={18} /> Back
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {districts.map((d) => (
                        <button
                          key={d.id}
                          onClick={() => handleDistrictClick(d)}
                          className="p-4 border rounded-xl text-left hover:bg-gray-50 transition"
                        >
                          <div className="font-semibold">{d.name}</div>
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
              <CandidateCard
                key={candidate._id}
                // candidate={{
                //   _id: candidate._id,
                //   name: candidate.name,
                //   position: candidate.position,
                //   category: candidate.category,
                //   photo:
                //     candidate.photos?.[0]?.url ||
                //     candidate.photos?.[0]?.secure_url ||
                //     candidate.photos?.[0],
                // }}
                candidate={candidate}
              />
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
