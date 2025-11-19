import { useState } from "react";
import areasData from "../../data/areas.json";

const FinalInfo = ({
  formData,
  arrayInputs,
  handleArrayInputChange,
  handleInputChange,
  addArrayItem,
  removeArrayItem,
  handleFileChange,
  handleNestedArrayInput,
  addElectionConstituency,
  removeElectionConstituency,
}) => {
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedConstituency, setSelectedConstituency] = useState("");
  const [electionAreaName, setElectionAreaName] = useState("");

  const divisions = Object.keys(areasData);
  const districts = selectedDivision ? Object.keys(areasData[selectedDivision]) : [];
  const constituencies =
    selectedDivision && selectedDistrict
      ? areasData[selectedDivision][selectedDistrict] || []
      : [];

  const handleAddDistrict = () => {
    if (!selectedDistrict || !selectedDivision) return;

    // Add district if not already added
    if (!formData.district.includes(selectedDistrict)) {
      handleArrayInputChange("district", selectedDistrict);
      setTimeout(() => addArrayItem("district"), 0);
    }

    // Add division if not already added
    if (!formData.division.includes(selectedDivision)) {
      handleArrayInputChange("division", selectedDivision);
      setTimeout(() => addArrayItem("division"), 0);
    }

    // Reset selections
    setSelectedDistrict("");
  };

  const handleAddConstituency = () => {
    if (!selectedConstituency || !electionAreaName.trim()) {
      alert("Please select a constituency and enter the election area name");
      return;
    }

    // Check if not already added
    const exists = formData.election_constituencies.some(
      (c) => c.actual_place_name === selectedConstituency
    );

    if (exists) {
      alert("This constituency has already been added");
      return;
    }

    // Create the constituency object
    const newConstituency = {
      actual_place_name: selectedConstituency,
      election_area_name: electionAreaName,
    };

    // Add directly by passing the data to the function
    addElectionConstituency(newConstituency);
    
    // Reset form
    setSelectedConstituency("");
    setElectionAreaName("");
  };

  return (
    <div className="space-y-6">
      {/* Location - Division, District, Constituency */}
      <div className="bg-gray-50 p-4 rounded-lg space-y-4">
        <h3 className="text-lg font-semibold">Location Selection</h3>

        {/* Division and District Selection */}
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="block text-sm font-medium mb-1">Division</label>
            <select
              value={selectedDivision}
              onChange={(e) => {
                setSelectedDivision(e.target.value);
                setSelectedDistrict("");
                setSelectedConstituency("");
              }}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Division</option>
              {divisions.map((div) => (
                <option key={div} value={div}>
                  {div}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">District</label>
            <select
              value={selectedDistrict}
              onChange={(e) => {
                setSelectedDistrict(e.target.value);
                setSelectedConstituency("");
              }}
              disabled={!selectedDivision}
              className="w-full p-2 border rounded disabled:bg-gray-100"
            >
              <option value="">Select District</option>
              {districts.map((dist) => (
                <option key={dist} value={dist}>
                  {dist}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="button"
              onClick={handleAddDistrict}
              disabled={!selectedDistrict}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white px-4 py-2 rounded transition-colors"
            >
              Add District
            </button>
          </div>
        </div>

        {/* Selected Districts and Divisions */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Selected Districts
            </label>
            <div className="flex flex-wrap gap-2">
              {formData.district.length === 0 && (
                <span className="text-gray-400 text-sm">No districts added</span>
              )}
              {formData.district.map((item, idx) => (
                <span
                  key={idx}
                  className="bg-teal-100 text-teal-800 px-2 py-1 rounded flex items-center gap-2 text-sm"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => removeArrayItem("district", idx)}
                    className="text-red-600 font-bold"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Selected Divisions
            </label>
            <div className="flex flex-wrap gap-2">
              {formData.division.length === 0 && (
                <span className="text-gray-400 text-sm">No divisions added</span>
              )}
              {formData.division.map((item, idx) => (
                <span
                  key={idx}
                  className="bg-cyan-100 text-cyan-800 px-2 py-1 rounded flex items-center gap-2 text-sm"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => removeArrayItem("division", idx)}
                    className="text-red-600 font-bold"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Election Constituencies */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Election Constituencies</h3>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Division</label>
            <select
              value={selectedDivision}
              onChange={(e) => {
                setSelectedDivision(e.target.value);
                setSelectedDistrict("");
                setSelectedConstituency("");
                setElectionAreaName("");
              }}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Division</option>
              {divisions.map((div) => (
                <option key={div} value={div}>
                  {div}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">District</label>
            <select
              value={selectedDistrict}
              onChange={(e) => {
                setSelectedDistrict(e.target.value);
                setSelectedConstituency("");
                setElectionAreaName("");
              }}
              disabled={!selectedDivision}
              className="w-full p-2 border rounded disabled:bg-gray-100"
            >
              <option value="">Select District</option>
              {districts.map((dist) => (
                <option key={dist} value={dist}>
                  {dist}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Constituency</label>
            <select
              value={selectedConstituency}
              onChange={(e) => setSelectedConstituency(e.target.value)}
              disabled={!selectedDistrict}
              className="w-full p-2 border rounded disabled:bg-gray-100"
            >
              <option value="">Select Constituency</option>
              {constituencies.map((constituency) => (
                <option key={constituency} value={constituency}>
                  {constituency}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Election Area Name Input */}
        {selectedConstituency && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Election Area Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={electionAreaName}
              onChange={(e) => setElectionAreaName(e.target.value)}
              placeholder="e.g., porshuram Upazila, chagolnaiya upazila, fulgazi upozila"
              className="w-full p-2 border rounded"
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter the specific upazilas or areas for <strong>{selectedConstituency}</strong>
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={handleAddConstituency}
          disabled={!selectedConstituency || !electionAreaName.trim()}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white px-4 py-2 rounded mb-4 transition-colors"
        >
          Add Constituency
        </button>

        <div className="space-y-2">
          {formData.election_constituencies.length === 0 && (
            <p className="text-gray-400 text-sm">No constituencies added</p>
          )}
          {formData.election_constituencies.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border rounded p-3 flex justify-between items-center"
            >
              <span className="text-sm">
                <strong>{item.actual_place_name}</strong> - {item.election_area_name}
              </span>
              <button
                type="button"
                onClick={() => removeElectionConstituency(idx)}
                className="text-red-600 font-bold text-lg hover:text-red-800"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Other Information */}
      <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
        <div>
          <label className="block text-sm font-medium">
            Other Income Sources
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add source"
              value={arrayInputs.other_income_sources}
              onChange={(e) =>
                handleArrayInputChange("other_income_sources", e.target.value)
              }
              className="flex-1 p-2 border rounded"
            />
            <button
              type="button"
              onClick={() => addArrayItem("other_income_sources")}
              className="bg-blue-500 text-white px-3 py-2 rounded"
            >
              Add
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.other_income_sources.map((item, idx) => (
              <span
                key={idx}
                className="bg-lime-100 text-lime-800 px-2 py-1 rounded flex items-center gap-2 text-sm"
              >
                {item}
                <button
                  type="button"
                  onClick={() => removeArrayItem("other_income_sources", idx)}
                  className="text-red-600 font-bold"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Social Links</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add social link"
              value={arrayInputs.social_links}
              onChange={(e) =>
                handleArrayInputChange("social_links", e.target.value)
              }
              className="flex-1 p-2 border rounded"
            />
            <button
              type="button"
              onClick={() => addArrayItem("social_links")}
              className="bg-blue-500 text-white px-3 py-2 rounded"
            >
              Add
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.social_links.map((item, idx) => (
              <span
                key={idx}
                className="bg-slate-100 text-slate-800 px-2 py-1 rounded flex items-center gap-2 text-xs break-all"
              >
                {item}
                <button
                  type="button"
                  onClick={() => removeArrayItem("social_links", idx)}
                  className="text-red-600 font-bold"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Photos */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Photos</h3>
        <label className="block text-sm font-medium mb-2">
          Upload Photos (Max 4)
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2 border rounded"
        />
        {formData.photos && (
          <p className="text-sm text-gray-600 mt-2">
            {formData.photos.length} file(s) selected
          </p>
        )}
      </div>

      {/* Summary */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Overall Summary</h3>
        <textarea
          name="overall_summary"
          value={formData.overall_summary}
          onChange={handleInputChange}
          required
          rows="5"
          className="w-full p-2 border rounded"
          placeholder="Provide a comprehensive summary of the candidate"
        />
      </div>
    </div>
  );
};

export default FinalInfo;
