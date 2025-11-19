import { useState, useEffect } from "react";
import { useUpdateCandidateMutation } from "../redux/features/candidate/candidate.api";

const EditCandidateModal = ({ candidate, onClose, onSuccess }) => {
  const [updateCandidate, { isLoading }] = useUpdateCandidateMutation();
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    category: "",
    overall_summary: "",
    life_activities: "",
  });

  useEffect(() => {
    if (candidate) {
      setFormData({
        name: candidate.name || "",
        position: candidate.position || "",
        category: candidate.category || "",
        overall_summary: candidate.overall_summary || "",
        life_activities: candidate.life_activities || "",
      });
    }
  }, [candidate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCandidate({
        id: candidate._id,
        updatedData: formData,
      }).unwrap();
      alert("Candidate updated successfully");
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to update candidate:", error);
      alert(error?.data?.message || "Failed to update candidate");
    }
  };

  if (!candidate) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Edit Candidate</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-3xl font-bold"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Photos Display */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Current Photos</h3>
            <div className="flex gap-4 flex-wrap">
              {candidate.photos?.map((photo, idx) => (
                <img
                  key={idx}
                  src={photo.secure_url}
                  alt={`${candidate.name} ${idx + 1}`}
                  className="h-24 w-24 object-cover rounded border"
                />
              ))}
            </div>
          </div>

          {/* Basic Information */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Position <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Life Activities
                </label>
                <input
                  type="text"
                  name="life_activities"
                  value={formData.life_activities}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">
              Overall Summary <span className="text-red-500">*</span>
            </h3>
            <textarea
              name="overall_summary"
              value={formData.overall_summary}
              onChange={handleChange}
              required
              rows="6"
              className="w-full p-2 border rounded"
              placeholder="Provide a comprehensive summary of the candidate"
            />
          </div>

          {/* Portfolio (Read-only) */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Portfolio</h3>
            <ul className="list-disc list-inside space-y-1">
              {candidate.portfolio?.map((item, idx) => (
                <li key={idx} className="text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Location Info (Read-only) */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Location Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-sm text-gray-700 mb-1">
                  Districts:
                </h4>
                <p className="text-sm">{candidate.district?.join(", ") || "N/A"}</p>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-gray-700 mb-1">
                  Divisions:
                </h4>
                <p className="text-sm">{candidate.division?.join(", ") || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Election Constituencies (Read-only) */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Election Constituencies</h3>
            <div className="space-y-2">
              {candidate.election_constituencies?.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white border rounded p-2 text-sm"
                >
                  <strong>{item.actual_place_name}</strong> - {item.election_area_name}
                </div>
              ))}
            </div>
          </div>

          {/* Designations (Read-only) */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Designations</h3>
            <div className="flex flex-wrap gap-2">
              {candidate.designations?.map((item, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t sticky bottom-0 bg-white">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              {isLoading ? "Updating..." : "Update Candidate"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCandidateModal;
