import { useState } from "react";
import { useNavigate } from "react-router";
import {
  useGetAllCandidatesQuery,
  useDeleteCandidateMutation,
} from "../../../redux/features/candidate/candidate.api";
import { FiEdit2, FiTrash2, FiEye } from "react-icons/fi";
import EditCandidateModal from "../../../components/EditCandidateModal";

const ManageCandidates = () => {
  const navigate = useNavigate();
  const { data, isLoading, error, refetch } = useGetAllCandidatesQuery();
  const [deleteCandidate, { isLoading: isDeleting }] =
    useDeleteCandidateMutation();
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [editingCandidate, setEditingCandidate] = useState(null);

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
    setEditingCandidate(candidate);
  };

  if (isLoading) {
    return (
      <div className="p-4 md:p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading candidates...</div>
        </div>
      </div>
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

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Manage Candidates</h2>
        <button
          onClick={() => navigate("/dashboard/create-candidate")}
          className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md"
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
          {/* Desktop Table View */}
          <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Photo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
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
                {candidates.map((candidate) => (
                  <tr key={candidate._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={candidate.photos?.[0]?.secure_url || "/placeholder.png"}
                        alt={candidate.name}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {candidate.name}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {candidate.position}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">
                        {candidate.category}
                      </span>
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
            {candidates.map((candidate) => (
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
                    <p className="text-sm text-gray-600 truncate">{candidate.position}</p>
                    <span className="inline-block mt-1 px-2 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800">
                      {candidate.category}
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

      {/* View Details Modal */}
      {selectedCandidate && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedCandidate(null)}
        >
          <div
            className="bg-white rounded-lg p-4 md:p-6 max-w-2xl w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl md:text-2xl font-bold text-gray-800">{selectedCandidate.name}</h3>
              <button
                onClick={() => setSelectedCandidate(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4 flex-wrap">
                {selectedCandidate.photos?.map((photo, idx) => (
                  <img
                    key={idx}
                    src={photo.secure_url}
                    alt={`${selectedCandidate.name} ${idx + 1}`}
                    className="h-24 w-24 md:h-32 md:w-32 object-cover rounded-lg"
                  />
                ))}
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 mb-1">Position:</h4>
                <p className="text-gray-600">{selectedCandidate.position}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 mb-1">Category:</h4>
                <p className="text-gray-600">{selectedCandidate.category}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 mb-1">Portfolio:</h4>
                <ul className="list-disc list-inside text-gray-600">
                  {selectedCandidate.portfolio?.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 mb-1">Districts:</h4>
                <p className="text-gray-600">{selectedCandidate.district?.join(", ")}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 mb-1">Divisions:</h4>
                <p className="text-gray-600">{selectedCandidate.division?.join(", ")}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 mb-1">Summary:</h4>
                <p className="text-sm text-gray-600">
                  {selectedCandidate.overall_summary}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t">
                <button
                  onClick={() => {
                    setSelectedCandidate(null);
                    handleEdit(selectedCandidate);
                  }}
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-white px-4 py-3 rounded-lg transition-colors font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => setSelectedCandidate(null)}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-3 rounded-lg transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Candidate Modal */}
      {editingCandidate && (
        <EditCandidateModal
          candidate={editingCandidate}
          onClose={() => setEditingCandidate(null)}
          onSuccess={refetch}
        />
      )}
    </div>
  );
};

export default ManageCandidates;
