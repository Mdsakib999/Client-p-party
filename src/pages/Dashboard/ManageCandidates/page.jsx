import { useState } from "react";
import { useNavigate } from "react-router";
import {
  useGetAllCandidatesQuery,
  useDeleteCandidateMutation,
} from "../../../redux/features/candidate/candidate.api";
import { FiEdit2, FiTrash2, FiEye } from "react-icons/fi";

const ManageCandidates = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetAllCandidatesQuery();
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

  const handleEdit = (candidateId) => {
    navigate(`/dashboard/edit-candidate/${candidateId}`);
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading candidates...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error loading candidates: {error?.data?.message || error?.message}
        </div>
      </div>
    );
  }

  const candidates = data?.data || [];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Manage Candidates</h2>
        <button
          onClick={() => navigate("/dashboard/create-candidate")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
        >
          + Add New Candidate
        </button>
      </div>

      {candidates.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-600 text-lg">No candidates found</p>
          <button
            onClick={() => navigate("/dashboard/create-candidate")}
            className="mt-4 text-blue-500 hover:text-blue-600 font-semibold"
          >
            Create your first candidate
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
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
                <tr key={candidate._id} className="hover:bg-gray-50">
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
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
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
                        className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded transition-colors"
                        title="View Details"
                      >
                        <FiEye size={18} />
                      </button>
                      <button
                        onClick={() => handleEdit(candidate._id)}
                        className="text-yellow-600 hover:text-yellow-900 p-2 hover:bg-yellow-50 rounded transition-colors"
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
      )}

      {/* View Details Modal */}
      {selectedCandidate && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedCandidate(null)}
        >
          <div
            className="bg-white rounded-lg p-6 max-w-2xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold">{selectedCandidate.name}</h3>
              <button
                onClick={() => setSelectedCandidate(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4">
                {selectedCandidate.photos?.map((photo, idx) => (
                  <img
                    key={idx}
                    src={photo.secure_url}
                    alt={`${selectedCandidate.name} ${idx + 1}`}
                    className="h-32 w-32 object-cover rounded"
                  />
                ))}
              </div>

              <div>
                <h4 className="font-semibold text-gray-700">Position:</h4>
                <p>{selectedCandidate.position}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700">Category:</h4>
                <p>{selectedCandidate.category}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700">Portfolio:</h4>
                <ul className="list-disc list-inside">
                  {selectedCandidate.portfolio?.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700">Districts:</h4>
                <p>{selectedCandidate.district?.join(", ")}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700">Divisions:</h4>
                <p>{selectedCandidate.division?.join(", ")}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700">Summary:</h4>
                <p className="text-sm text-gray-600">
                  {selectedCandidate.overall_summary}
                </p>
              </div>

              <div className="flex gap-2 mt-6">
                <button
                  onClick={() => {
                    setSelectedCandidate(null);
                    handleEdit(selectedCandidate._id);
                  }}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => setSelectedCandidate(null)}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCandidates;
