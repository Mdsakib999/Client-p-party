const FinalInfo = ({
  formData,
  arrayInputs,
  handleArrayInputChange,
  handleInputChange,
  addArrayItem,
  removeArrayItem,
  handleFileChange,
}) => {
  return (
    <div className="space-y-6">
      {/* Location */}
      <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
        <div>
          <label className="block text-sm font-medium">Districts</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add district"
              value={arrayInputs.district}
              onChange={(e) =>
                handleArrayInputChange("district", e.target.value)
              }
              className="flex-1 p-2 border rounded"
            />
            <button
              type="button"
              onClick={() => addArrayItem("district")}
              className="bg-blue-500 text-white px-3 py-2 rounded"
            >
              Add
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
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
          <label className="block text-sm font-medium">Divisions</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add division"
              value={arrayInputs.division}
              onChange={(e) =>
                handleArrayInputChange("division", e.target.value)
              }
              className="flex-1 p-2 border rounded"
            />
            <button
              type="button"
              onClick={() => addArrayItem("division")}
              className="bg-blue-500 text-white px-3 py-2 rounded"
            >
              Add
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
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
