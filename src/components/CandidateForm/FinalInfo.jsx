import { useState } from "react";
import areasData from "../../data/areas.json";

const FinalInfo = ({
  formData,
  errors,
  handleInputChange,
  handleFileChange,
  addElectionConstituency,
  removeElectionConstituency,
  handleAddLocation,
  handleDynamicArrayChange,
  addDynamicArrayItem,
  removeDynamicArrayItem,
}) => {
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedConstituency, setSelectedConstituency] = useState("");
  const [electionAreaName, setElectionAreaName] = useState("");

  const divisions = Object.keys(areasData);
  const districts = selectedDivision
    ? Object.keys(areasData[selectedDivision])
    : [];
  const constituencies =
    selectedDivision && selectedDistrict
      ? areasData[selectedDivision][selectedDistrict] || []
      : [];

  const handleAddDistrict = () => {
    if (!selectedDistrict || !selectedDivision) return;
    handleAddLocation(selectedDivision, selectedDistrict);
    setSelectedDistrict("");
  };

  const handleAddConstituency = () => {
    if (!selectedConstituency || !electionAreaName.trim()) {
      alert("Please select a constituency and enter the election area name");
      return;
    }

    const exists = formData.election_constituencies.some(
      (c) => c.actual_place_name === selectedConstituency
    );

    if (exists) {
      alert("This constituency has already been added");
      return;
    }

    const newConstituency = {
      actual_place_name: selectedConstituency,
      election_area_name: electionAreaName,
    };

    addElectionConstituency(newConstituency);
    setSelectedConstituency("");
    setElectionAreaName("");
  };

  const inputClass = (
    error
  ) => `w-full p-2.5 border rounded-lg transition-colors focus:outline-none focus:ring-2 ${error
    ? "border-red-500 focus:ring-red-200"
    : "border-gray-200 focus:border-green-500 focus:ring-green-100"
  }`;

  const selectClass =
    "w-full p-2.5 border border-gray-200 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:border-green-500 focus:ring-green-100 disabled:bg-gray-100 disabled:text-gray-400";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1.5";
  const buttonClass =
    "bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2.5 rounded-lg font-medium transition-colors w-full";

  const renderChip = (label, onRemove, color = "teal") => {
    const bgColors = {
      teal: "bg-teal-50 border-teal-100 text-teal-700",
      cyan: "bg-cyan-50 border-cyan-100 text-cyan-700",
      lime: "bg-lime-50 border-lime-100 text-lime-700",
      slate: "bg-slate-100 border-slate-200 text-slate-700",
    };

    return (
      <span
        className={`${bgColors[color]} border px-3 py-1 rounded-full flex items-center gap-2 text-sm transition-all hover:shadow-sm`}
      >
        <span className="truncate max-w-[200px]">{label}</span>
        <button
          type="button"
          onClick={onRemove}
          className="hover:text-red-500 transition-colors w-5 h-5 flex items-center justify-center rounded-full hover:bg-white/50"
        >
          ×
        </button>
      </span>
    );
  };

  return (
    <div className="space-y-8">
      {/* Location - Division, District, Constituency */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="w-1 h-6 bg-green-500 rounded-full"></span>
          Location Selection
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
          <div className="md:col-span-4">
            <label className={labelClass}>Division</label>
            <select
              value={selectedDivision}
              onChange={(e) => {
                setSelectedDivision(e.target.value);
                setSelectedDistrict("");
                setSelectedConstituency("");
              }}
              className={selectClass}
            >
              <option value="">Select Division</option>
              {divisions.map((div) => (
                <option key={div} value={div}>
                  {div}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-4">
            <label className={labelClass}>District</label>
            <select
              value={selectedDistrict}
              onChange={(e) => {
                setSelectedDistrict(e.target.value);
                setSelectedConstituency("");
              }}
              disabled={!selectedDivision}
              className={selectClass}
            >
              <option value="">Select District</option>
              {districts.map((dist) => (
                <option key={dist} value={dist}>
                  {dist}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-4 flex items-end">
            <button
              type="button"
              onClick={handleAddDistrict}
              disabled={!selectedDistrict}
              className={buttonClass}
            >
              Add District
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg">
          <div>
            <label className={labelClass}>Selected Districts</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData?.district?.length === 0 && (
                <span className="text-gray-400 text-sm italic">
                  No districts added
                </span>
              )}
              {formData?.district?.map((item, idx) => (
                <div key={idx}>
                  {renderChip(item, () => removeDynamicArrayItem("district", idx), "teal")}
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className={labelClass}>Selected Divisions</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData?.division?.length === 0 && (
                <span className="text-gray-400 text-sm italic">
                  No divisions added
                </span>
              )}
              {formData?.division?.map((item, idx) => (
                <div key={idx}>
                  {renderChip(item, () => removeDynamicArrayItem("division", idx), "cyan")}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Election Constituencies */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="w-1 h-6 bg-green-500 rounded-full"></span>
          Election Constituencies
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className={labelClass}>Division</label>
            <select
              value={selectedDivision}
              onChange={(e) => {
                setSelectedDivision(e.target.value);
                setSelectedDistrict("");
                setSelectedConstituency("");
                setElectionAreaName("");
              }}
              className={selectClass}
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
            <label className={labelClass}>District</label>
            <select
              value={selectedDistrict}
              onChange={(e) => {
                setSelectedDistrict(e.target.value);
                setSelectedConstituency("");
                setElectionAreaName("");
              }}
              disabled={!selectedDivision}
              className={selectClass}
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
            <label className={labelClass}>Constituency</label>
            <select
              value={selectedConstituency}
              onChange={(e) => setSelectedConstituency(e.target.value)}
              disabled={!selectedDistrict}
              className={selectClass}
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

        {selectedConstituency && (
          <div className="mb-4 p-4 bg-green-50 rounded-lg border border-green-100">
            <label className={labelClass}>
              Election Area Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={electionAreaName}
              onChange={(e) => setElectionAreaName(e.target.value)}
              placeholder="e.g., porshuram Upazila, chagolnaiya upazila"
              className={inputClass(errors?.election_area_name)}
            />
            <p className="text-xs text-green-700 mt-2">
              Enter the specific upazilas or areas for{" "}
              <strong>{selectedConstituency}</strong>
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={handleAddConstituency}
          disabled={!selectedConstituency || !electionAreaName.trim()}
          className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-lg font-medium transition-colors mb-6"
        >
          Add Constituency
        </button>

        <div className="space-y-3">
          {formData?.election_constituencies?.length === 0 && (
            <p className="text-gray-400 text-sm italic text-center py-4">
              No constituencies added
            </p>
          )}
          {formData?.election_constituencies?.map((item, idx) => (
            <div
              key={idx}
              className="bg-gray-50 border border-gray-100 rounded-lg p-3 flex justify-between items-center group hover:bg-gray-100 transition-colors"
            >
              <span className="text-sm">
                <strong className="text-gray-800">
                  {item.actual_place_name}
                </strong>{" "}
                <span className="text-gray-500 mx-1">-</span>
                <span className="text-gray-600">{item.election_area_name}</span>
              </span>
              <button
                type="button"
                onClick={() => removeElectionConstituency(idx)}
                className="text-gray-400 hover:text-red-600 transition-colors p-1"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Other Information */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="w-1 h-6 bg-green-500 rounded-full"></span>
          Additional Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Other Income Sources</label>
            <div className="space-y-3">
              {formData?.other_income_sources?.map((item, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add source"
                    value={item}
                    onChange={(e) =>
                      handleDynamicArrayChange(
                        "other_income_sources",
                        idx,
                        e.target.value
                      )
                    }
                    className={inputClass()}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      removeDynamicArrayItem("other_income_sources", idx)
                    }
                    className="text-red-500 hover:text-red-700 px-2"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => addDynamicArrayItem("other_income_sources")}
              className="mt-3 text-sm text-green-600 font-semibold hover:text-green-700 flex items-center gap-1"
            >
              + Add Source
            </button>
          </div>

          <div>
            <label className={labelClass}>Social Links</label>
            <div className="space-y-3">
              {formData?.social_links?.map((item, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add social link"
                    value={item}
                    onChange={(e) =>
                      handleDynamicArrayChange("social_links", idx, e.target.value)
                    }
                    className={inputClass()}
                  />
                  <button
                    type="button"
                    onClick={() => removeDynamicArrayItem("social_links", idx)}
                    className="text-red-500 hover:text-red-700 px-2"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => addDynamicArrayItem("social_links")}
              className="mt-3 text-sm text-green-600 font-semibold hover:text-green-700 flex items-center gap-1"
            >
              + Add Link
            </button>
          </div>
        </div>
      </div>

      {/* Photos */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="w-1 h-6 bg-green-500 rounded-full"></span>
          Photos
        </h3>
        <label className={labelClass}>
          Upload Photo <span className="text-red-500">*</span>
        </label>
        <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-green-500 transition-colors bg-gray-50 hover:bg-green-50 group cursor-pointer relative">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="space-y-1 text-center">
            <div className="text-gray-400 group-hover:text-green-500 transition-colors mx-auto h-12 w-12 flex items-center justify-center">
              <svg className="h-10 w-10 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="flex text-sm text-gray-600 justify-center">
              <span className="font-medium text-green-600 hover:text-green-500">Upload a file</span>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">
              PNG, JPG, GIF up to 5MB
            </p>
          </div>
        </div>

        {errors?.photos && (
          <p className="text-red-500 text-sm mt-2">{errors.photos}</p>
        )}

        {formData.photos && formData.photos.length > 0 && (
          <div className="mt-4 p-4 bg-green-50 rounded-lg flex items-center gap-3">
            <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
              📸
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{formData.photos.length} file(s) selected</p>
              <p className="text-xs text-gray-500">Ready to upload</p>
            </div>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="w-1 h-6 bg-green-500 rounded-full"></span>
          Overall Summary
        </h3>
        <label className={labelClass}>
          Candidate Summary <span className="text-red-500">*</span>
        </label>
        <textarea
          name="overall_summary"
          value={formData.overall_summary}
          onChange={handleInputChange}
          required
          rows="5"
          className={inputClass(errors?.overall_summary)}
          placeholder="Provide a comprehensive summary of the candidate's background, vision, and goals..."
        />
        {errors?.overall_summary && (
          <p className="text-red-500 text-xs mt-1">{errors.overall_summary}</p>
        )}
      </div>
    </div>
  );
};

export default FinalInfo;
