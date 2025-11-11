import axios from "axios";
import candidatesBanner from "../../assets/candidates-banner.jpg";
import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ListFilter, Search } from "lucide-react";
import candidatesData from "../../data/candidates3.json";
import CandidateCard from "../../components/CandidateCard";
import Pagination from "../../components/Pagination";

const Candidates = () => {
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSection, setActiveSection] = useState(null);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const containerRef = useRef(null);
  const searchInputRef = useRef(null);
  const scrollRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const allDivisions = candidatesData.flatMap(
      (candidate) => candidate.division || []
    );
    const uniqueDivisions = [...new Set(allDivisions)];
    setDivisions(
      uniqueDivisions.map((div, index) => ({
        id: index + 1,
        name: div,
        bn_name: div,
      }))
    );
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsMobileExpanded(false);
        setActiveSection(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (activeSection === "search" && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [activeSection]);

  const fetchDistricts = async (divisionId) => {
    try {
      const { data } = await axios.get(
        `https://bdapi.vercel.app/api/v.1/district/${divisionId}`
      );
      setDistricts(data?.data || []);
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  const handleDivisionClick = (division) => {
    setSelectedDivision(division);
    setSelectedDistrict(null);
    fetchDistricts(division.id);
    setActiveSection("district");
  };

  const handleDistrictClick = (district) => {
    setSelectedDistrict(district);
    setActiveSection(null);
    setIsMobileExpanded(false);
  };

  const filteredDivisions = divisions.filter(
    (d) =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.bn_name.includes(searchTerm)
  );

  const filteredDistricts = districts.filter(
    (d) =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.bn_name.includes(searchTerm)
  );

  const filteredCandidates = selectedDivision
    ? candidatesData.filter((c) => c.division?.includes(selectedDivision.name))
    : candidatesData;

  const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setTimeout(
      () => scrollRef.current?.scrollIntoView({ behavior: "smooth" }),
      0
    );
  };

  return (
    <div className="min-h-screen w-full">
      <div className="relative w-full h-[500px] sm:h-[550px] md:h-[600px]">
        <img
          src={candidatesBanner}
          alt="Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center px-3 sm:px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight text-center">
            Our nominees for the <br /> 2025 elections
          </h2>
          {/* <div className="w-full max-w-5xl">
            <div ref={containerRef} className="relative z-10">
              <div className="bg-white rounded-xl md:rounded-full shadow-2xl p-2.5"> */}
          {/* Mobile Search Button */}
          {/* <div className="md:hidden flex justify-center">
                  <button
                    onClick={() => {
                      setIsMobileExpanded(!isMobileExpanded);
                      if (!isMobileExpanded) {
                        setTimeout(() => {
                          searchInputRef.current?.focus();
                        }, 100);
                      }
                    }}
                    className="bg-gradient-to-r from-zinc-900 to-zinc-800 text-white rounded-xl px-6 py-3 font-medium flex items-center gap-2 w-full justify-center"
                  >
                    <Search size={20} />
                    <span>Search Location</span>
                  </button>
                </div> */}

          {/* <div
                  className={`${
                    !isMobileExpanded && "hidden md:block"
                  } transition-all duration-300 ${
                    isMobileExpanded ? "mt-3" : ""
                  }`}
                >
                  <div className="flex flex-col md:flex-row gap-2 md:gap-0">
                    <div
                      className="flex-1 px-4 md:px-6 py-3 md:py-2 rounded-xl md:rounded-full hover:bg-gray-50 transition cursor-text"
                      onClick={() => {
                        setActiveSection("search");
                        searchInputRef.current?.focus();
                      }}
                    >
                      <label className="block text-xs font-bold text-gray-900 mb-1 md:mb-2">
                        Where
                      </label>
                      <input
                        ref={searchInputRef}
                        type="text"
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          setActiveSection("search");
                        }}
                        placeholder="Search destinations"
                        className="w-full bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none"
                      />
                    </div>

                    <div
                      onClick={() => {
                        setActiveSection("division");
                        setIsMobileExpanded(true);
                      }}
                      className="flex-1 px-4 md:px-6 py-3 md:py-2 rounded-xl hover:bg-gray-50 transition cursor-pointer"
                    >
                      <label className="block text-xs font-bold text-gray-900 mb-1 md:mb-2">
                        Division
                      </label>
                      <div className="text-sm text-gray-600 truncate">
                        {selectedDivision?.name || "Add division"}
                      </div>
                    </div>

                    <div
                      onClick={() => {
                        if (selectedDivision) {
                          setActiveSection("district");
                          setIsMobileExpanded(true);
                        }
                      }}
                      className={`flex-1 px-4 md:px-6 py-3 md:py-2 rounded-xl transition ${
                        selectedDivision
                          ? "hover:bg-gray-50"
                          : "opacity-60 cursor-not-allowed"
                      }`}
                    >
                      <label className="block text-xs font-bold text-gray-900 mb-1 md:mb-2">
                        District
                      </label>
                      <div className="text-sm text-gray-600 truncate">
                        {selectedDistrict?.name || "Add district"}
                      </div>
                    </div>

                    <button
                      onClick={() => setIsMobileExpanded(false)}
                      className="hidden md:flex bg-gradient-to-r from-zinc-900 to-zinc-800 hover:from-zinc-950 hover:to-zinc-700 text-white rounded-full font-semibold transition items-center justify-center shadow-lg p-5"
                    >
                      <Search />
                    </button>
                  </div>

                  {isMobileExpanded && (
                    <div className="md:hidden flex justify-center mt-3">
                      <button
                        onClick={() => {
                          setActiveSection(null);
                          setIsMobileExpanded(false);
                        }}
                        className="text-gray-600 text-sm font-medium"
                      >
                        Close
                      </button>
                    </div>
                  )}
                </div> */}
        </div>

        {/* Dropdown */}
        {/* {activeSection && (
                <div
                  className={`fixed md:absolute left-0 right-0 md:mt-4 mx-3 md:mx-0 bg-white rounded-2xl shadow-2xl overflow-hidden z-50 transition-all duration-300 ease-in-out ${
                    isMobileExpanded
                      ? "top-[180px] max-h-[calc(100vh-200px)]"
                      : "top-[100px] max-h-[calc(100vh-120px)]"
                  } md:top-full md:max-h-[500px]`}
                > */}
        {/* Search Results */}
        {/* {activeSection === "search" && searchTerm && (
                    <div className="max-h-full overflow-y-auto">
                      {filteredDivisions.length > 0 && (
                        <div className="p-4 sm:p-6">
                          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
                            Divisions
                          </h3>
                          <div className="space-y-1">
                            {filteredDivisions.map((division) => (
                              <button
                                key={division.id}
                                onClick={() => {
                                  handleDivisionClick(division);
                                  setSearchTerm("");
                                }}
                                className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 transition"
                              >
                                <div className="font-medium text-gray-900">
                                  {division.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {division.bn_name}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedDivision && filteredDistricts.length > 0 && (
                        <div className="p-4 sm:p-6 border-t">
                          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
                            Districts
                          </h3>
                          <div className="space-y-1">
                            {filteredDistricts.map((district) => (
                              <button
                                key={district.id}
                                onClick={() => {
                                  handleDistrictClick(district);
                                  setSearchTerm("");
                                }}
                                className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 transition"
                              >
                                <div className="font-medium text-gray-900">
                                  {district.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {district.bn_name}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {filteredDivisions.length === 0 &&
                        filteredDistricts.length === 0 && (
                          <div className="p-12 text-center">
                            <div className="text-gray-400 w-12 h-12 mx-auto mb-3">
                              <Search size={48} className="mx-auto" />
                            </div>
                            <p className="text-gray-600 font-medium">
                              No results found
                            </p>
                            <p className="text-sm text-gray-400 mt-1">
                              Try a different search term
                            </p>
                          </div>
                        )}
                    </div>
                  )} */}

        {/* Division List */}
        {/* {activeSection === "division" && (
                    <div className="max-h-full overflow-y-auto p-4 sm:p-6">
                      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
                        Select Division
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {divisions.map((division) => (
                          <button
                            key={division.id}
                            onClick={() => handleDivisionClick(division)}
                            className={`text-left p-4 rounded-xl border-2 transition ${
                              selectedDivision?.id === division.id
                                ? "border-pink-500 bg-pink-50"
                                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                            }`}
                          >
                            <div className="font-semibold text-gray-900">
                              {division.name}
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                              {division.bn_name}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )} */}

        {/* District List */}
        {/* {activeSection === "district" && selectedDivision && (
                    <div className="max-h-full overflow-y-auto p-4 sm:p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <button
                          onClick={() => setActiveSection("division")}
                          className="p-2 hover:bg-gray-100 rounded-lg transition"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <div>
                          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                            Select District
                          </h3>
                          <p className="text-xs text-gray-400 mt-0.5">
                            in {selectedDivision.name}
                          </p>
                        </div>
                      </div>

                      {districts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {districts.map((district) => (
                            <button
                              key={district.id}
                              onClick={() => handleDistrictClick(district)}
                              className={`text-left p-4 rounded-xl border-2 transition ${
                                selectedDistrict?.id === district.id
                                  ? "border-blue-200 bg-blue-50"
                                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                              }`}
                            >
                              <div className="font-semibold text-gray-900">
                                {district.name}
                              </div>
                              <div className="text-sm text-gray-500 mt-1">
                                {district.bn_name}
                              </div>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="py-12 text-center text-gray-400">
                          Loading districts...
                        </div>
                      )}
                    </div>
                  )} */}
        {/* </div>
              )} */}
        {/* </div>
          </div>
        </div> */}
      </div>

      <div className="w-full max-w-7xl mx-auto my-10 px-4 md:px-6 lg:px-8">
        {/* DIVISION LIST */}
        <section
          className="relative py-4 mb-6"
          ref={scrollRef} //for scrolling
        >
          <div className="flex justify-center overflow-x-auto gap-3 pb-2 scrollbar-hide">
            <div className="flex items-center gap-3 md:gap-4">
              <div
                className={`flex items-center gap-x-2 text-sm md:text-base whitespace-nowrap flex-shrink-0 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded ${
                  !selectedDivision ? "bg-blue-100" : ""
                }`}
                onClick={() => {
                  setSelectedDivision(null);
                  setSelectedDistrict(null);
                  setCurrentPage(1);
                }}
              >
                <span className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full border border-gray-300 bg-gray-300"></span>
                <span>All</span>
              </div>
              {divisions.map((division) => (
                <div
                  className={`flex items-center gap-x-2 text-sm md:text-base whitespace-nowrap flex-shrink-0 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded ${
                    selectedDivision?.id === division.id ? "bg-blue-100" : ""
                  }`}
                  key={division.id}
                  onClick={() => {
                    setSelectedDivision(
                      selectedDivision?.id === division.id ? null : division
                    );
                    setSelectedDistrict(null);
                    setCurrentPage(1);
                  }}
                >
                  <span className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full border border-gray-300 bg-gray-300"></span>
                  <span>{division?.name}</span>
                </div>
              ))}
              <div className="border border-gray-400 rounded-full flex items-center gap-x-2 px-4 py-2 whitespace-nowrap text-sm md:text-base flex-shrink-0">
                <ListFilter size={16} /> Filters
              </div>
            </div>
          </div>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredCandidates
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((candidate) => (
              <CandidateCard key={candidate?._id} candidate={candidate} />
            ))}
        </section>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Candidates;
