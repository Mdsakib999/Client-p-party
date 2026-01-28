import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  useGetAllCandidatesQuery,
  useDeleteCandidateMutation,
} from "../../../redux/features/candidate/candidate.api";
import { FiEdit2, FiTrash2, FiEye, FiSearch } from "react-icons/fi";
import BNPLoader from "../../../utils/BNPLoader";
import Pagination from "../../../components/Pagination";
import areasData from "../../../data/areas.json";

const ManageCandidates = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 20;

  const [searchTerm, setSearchTerm] = useState("");
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  useEffect(() => {
    const divs = Object.keys(areasData).map((d) => ({
      name: d,
    }));
    setDivisions(divs);
  }, []);

  const { data, isLoading, error } = useGetAllCandidatesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [deleteCandidate, { isLoading: isDeleting }] =
    useDeleteCandidateMutation();
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await deleteCandidate(id).unwrap();
        alert("Candidate deleted successfully");
      } catch (error) {
        console.error("Failed to delete candidate:", error);
        alert(error?.data?.message || "Failed to delete candidate");
      }
    }
  };

  const handleEdit = (candidate) => {
    navigate(`/dashboard/edit-candidate/${candidate._id}`);
  };

  if (isLoading) {
    return (
      <BNPLoader />
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
          Error loading candidates: {error?.data?.message || error?.message}
        </div>
      </div>
    );
  }

  const candidates = data?.data || [];

  const handleDivisionChange = (e) => {
    const divName = e.target.value;
    setSelectedDivision(divName);
    setSelectedDistrict("");
    setCurrentPage(1);

    if (divName) {
      const divisionDistricts = areasData[divName]
        ? Object.keys(areasData[divName])
        : [];
      setDistricts(divisionDistricts.map(d => ({ name: d })));
    } else {
      setDistricts([]);
    }
  };

  const filteredCandidates = candidates.filter((c) => {
    const matchSearch = searchTerm
      ? c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.designation?.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    const matchDivision = selectedDivision
      ? c.division?.includes(selectedDivision)
      : true;

    const matchDistrict = selectedDistrict
      ? c.district?.includes(selectedDistrict)
      : true;

    return matchSearch && matchDivision && matchDistrict;
  });

  const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage);
  const paginatedCandidates = filteredCandidates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto overflow-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Manage Candidates</h2>
        <button
          onClick={() => navigate("/dashboard/create-candidate")}
          className="cursor-pointer w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md"
        >
          + Add New Candidate
        </button>
      </div>

      {candidates.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-600 text-lg">No candidates found</p>
          <button
            onClick={() => navigate("/dashboard/create-candidate")}
            className="mt-4 text-emerald-600 hover:text-emerald-700 font-semibold"
          >
            Create your first candidate
          </button>
        </div>
      ) : (
        <>
          {/* Search and Filters */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search candidates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
              />
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>

            {/* Division Filter */}
            <div className="relative">
              <select
                value={selectedDivision}
                onChange={handleDivisionChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white text-sm text-gray-600"
              >
                <option value="">All Divisions</option>
                {divisions.map((div) => (
                  <option key={div.name} value={div.name}>
                    {div.name}
                  </option>
                ))}
              </select>
            </div>

            {/* District Filter */}
            <div className="relative">
              <select
                value={selectedDistrict}
                onChange={(e) => {
                  setSelectedDistrict(e.target.value);
                  setCurrentPage(1);
                }}
                disabled={!selectedDivision}
                className={`w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white text-sm text-gray-600 ${!selectedDivision ? "opacity-50 cursor-not-allowed" : ""
                  }`}
              >
                <option value="">All Districts</option>
                {districts.map((dist) => (
                  <option key={dist.name} value={dist.name}>
                    {dist.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {filteredCandidates.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-lg p-8 text-center text-gray-500">
              No candidates found matching your specific search.
            </div>
          )}

          {filteredCandidates.length > 0 && (
            <>
              {/* Desktop Table View */}
              <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">

                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        No
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Photo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Position/Designation
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Election constituencies
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Districts
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedCandidates.map((candidate, index) => (
                      <tr key={candidate._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img
                            src={candidate.photos?.[0]?.secure_url || "/placeholder.png"}
                            alt={candidate.name}
                            className="h-12 w-12 rounded-full object-cover"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900 max-w-32">
                            {candidate.name}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-40">
                            {candidate.designation}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-40">
                            {candidate.election_constituencies.map(area => area.actual_place_name) || "N/A"}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {candidate.district?.join(", ") || "N/A"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => setSelectedCandidate(candidate)}
                              className="text-emerald-600 hover:text-emerald-900 p-2 hover:bg-emerald-50 rounded transition-colors"
                              title="View Details"
                            >
                              <FiEye size={18} />
                            </button>
                            <button
                              onClick={() => handleEdit(candidate)}
                              className="text-amber-600 hover:text-amber-900 p-2 hover:bg-amber-50 rounded transition-colors"
                              title="Edit"
                            >
                              <FiEdit2 size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(candidate._id, candidate.name)}
                              disabled={isDeleting}
                              className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
                              title="Delete"
                            >
                              <FiTrash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-4">
                {paginatedCandidates.map((candidate) => (
                  <div key={candidate._id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4 mb-3">
                      <img
                        src={candidate.photos?.[0]?.secure_url || "/placeholder.png"}
                        alt={candidate.name}
                        className="h-16 w-16 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {candidate.name}
                        </h3>
                        <p className="text-sm text-gray-600 truncate">{candidate.designation}</p>
                        <span className="inline-block mt-1 px-2 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800">
                          {candidate.profession}
                        </span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Districts:</span> {candidate.district?.join(", ") || "N/A"}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedCandidate(candidate)}
                        className="flex-1 flex items-center justify-center gap-2 text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-lg transition-colors font-medium"
                      >
                        <FiEye size={16} />
                        View
                      </button>
                      <button
                        onClick={() => handleEdit(candidate)}
                        className="flex-1 flex items-center justify-center gap-2 text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 px-4 py-2 rounded-lg transition-colors font-medium"
                      >
                        <FiEdit2 size={16} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(candidate._id, candidate.name)}
                        disabled={isDeleting}
                        className="flex items-center justify-center gap-2 text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg transition-colors font-medium disabled:opacity-50"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}

      {/* View Details Modal */}
      {selectedCandidate && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedCandidate(null)}
        >
          <div
            className="bg-white rounded-lg p-4 md:p-6 max-w-4xl w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
                  {selectedCandidate.name}
                </h3>
                <p className="text-emerald-600 font-medium">
                  {selectedCandidate.designation || selectedCandidate.position}
                </p>
              </div>
              <button
                onClick={() => setSelectedCandidate(null)}
                className="text-gray-400 hover:text-gray-600 text-3xl leading-none"
              >
                &times;
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <h4 className="border-b pb-2 text-lg font-semibold text-gray-800 mb-3">
                    Personal Information
                  </h4>
                  <div className="space-y-2 text-gray-600">
                    <p>
                      <span className="font-medium text-gray-700">Category:</span>{" "}
                      {selectedCandidate.profession || selectedCandidate.category}
                    </p>
                    <p>
                      <span className="font-medium text-gray-700">Birth Date:</span>{" "}
                      {selectedCandidate.personal_info?.birth_date}
                    </p>
                    <p>
                      <span className="font-medium text-gray-700">
                        Birth Place:
                      </span>{" "}
                      {selectedCandidate.personal_info?.birth_place}
                    </p>
                    <p>
                      <span className="font-medium text-gray-700">
                        Nationality:
                      </span>{" "}
                      {selectedCandidate.personal_info?.nationality}
                    </p>
                    <p>
                      <span className="font-medium text-gray-700">
                        Mobile No:
                      </span>{" "}
                      {selectedCandidate.personal_info?.mobileNo || "N/A"}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="border-b pb-2 text-lg font-semibold text-gray-800 mb-3">
                    Contact & Social
                  </h4>
                  <ul className="space-y-1 text-gray-600">
                    {selectedCandidate.personal_info?.website_or_social?.length > 0 ? (
                      selectedCandidate.personal_info.website_or_social.map((link, idx) => (
                        <li key={idx}>
                          <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{link}</a>
                        </li>
                      ))
                    ) : (
                      <li>No social links provided</li>
                    )}
                  </ul>
                </div>

                <div>
                  <h4 className="border-b pb-2 text-lg font-semibold text-gray-800 mb-3">
                    Locations
                  </h4>
                  <p className="text-gray-600">
                    <span className="font-medium text-gray-700">Districts:</span>{" "}
                    {selectedCandidate.district?.join(", ") || "N/A"}
                  </p>
                  <p className="text-gray-600 mt-2">
                    <span className="font-medium text-gray-700">Divisions:</span>{" "}
                    {selectedCandidate.division?.join(", ") || "N/A"}
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <h4 className="border-b pb-2 text-lg font-semibold text-gray-800 mb-3">
                    Photos
                  </h4>
                  <div className="flex gap-4 flex-wrap">
                    {selectedCandidate.photos?.map((photo, idx) => (
                      <img
                        key={idx}
                        src={photo.secure_url}
                        alt={`${selectedCandidate.name} ${idx + 1}`}
                        className="h-24 w-24 md:h-32 md:w-32 object-cover rounded-lg shadow-sm"
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="border-b pb-2 text-lg font-semibold text-gray-800 mb-3">
                    Portfolio & Designations
                  </h4>
                  <div className="mb-4">
                    <p className="font-medium text-gray-700 mb-1">Portfolio:</p>
                    <ul className="list-disc list-inside text-gray-600">
                      {selectedCandidate.portfolio?.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      )) || <li>N/A</li>}
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700 mb-1">Previous Designations:</p>
                    <ul className="list-disc list-inside text-gray-600">
                      {selectedCandidate.previous_designations?.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      )) || <li>N/A</li>}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <h4 className="border-b pb-2 text-lg font-semibold text-gray-800 mb-3">
                  Summary
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {selectedCandidate.overall_summary}
                </p>
              </div>

              {selectedCandidate.political_career?.length > 0 && (
                <div>
                  <h4 className="border-b pb-2 text-lg font-semibold text-gray-800 mb-3">
                    Political Career
                  </h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    {selectedCandidate.political_career.map((career, idx) => (
                      <div key={idx} className="bg-gray-50 p-3 rounded">
                        <span className="font-bold block text-emerald-600">{career.year}</span>
                        <span className="text-gray-700">{career.event}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedCandidate.election_constituencies?.length > 0 && (
                <div>
                  <h4 className="border-b pb-2 text-lg font-semibold text-gray-800 mb-3">
                    Election Constituencies
                  </h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    {selectedCandidate.election_constituencies.map((ec, idx) => (
                      <div key={idx} className="bg-gray-50 p-3 rounded">
                        <span className="font-bold block text-emerald-600">{ec.election_area_name}</span>
                        <span className="text-gray-700">{ec.actual_place_name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t">
              <button
                onClick={() => {
                  setSelectedCandidate(null);
                  handleEdit(selectedCandidate);
                }}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg transition-colors font-medium shadow-sm"
              >
                Edit Candidate
              </button>
              <button
                onClick={() => setSelectedCandidate(null)}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-3 rounded-lg transition-colors font-medium shadow-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
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
  );
};

export default ManageCandidates;
