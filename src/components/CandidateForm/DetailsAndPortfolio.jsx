const DetailsAndPortfolio = ({
  formData,
  handleDynamicArrayChange,
  addDynamicArrayItem,
  removeDynamicArrayItem,
  handleAutoTranslate,
}) => {
  const inputClass =
    "w-full p-2.5 border border-gray-200 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:border-green-500 focus:ring-green-100";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1.5";

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="w-1 h-6 bg-green-500 rounded-full"></span>
          Portfolio
        </h3>
        <div>
          <label className={labelClass}>Portfolio Items</label>
          <div className="space-y-3">
            {formData?.portfolio?.map((item, idx) => (
              <div key={idx} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Led a clear water initiative"
                  value={item}
                  onChange={(e) =>
                    handleDynamicArrayChange("portfolio", idx, e.target.value)
                  }
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => removeDynamicArrayItem("portfolio", idx)}
                  className="text-red-500 hover:text-red-700 px-2"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => addDynamicArrayItem("portfolio")}
            className="mt-3 text-sm text-green-600 font-semibold hover:text-green-700 flex items-center gap-1"
          >
            + Add Portfolio Item
          </button>
        </div>
      </div>

      {/* Previous Designations */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="w-1 h-6 bg-green-500 rounded-full"></span>
          Previous Designations
        </h3>
        <div>
          <label className={labelClass}>Designations</label>
          <div className="space-y-3">
            {formData?.previous_designations?.map((item, idx) => (
              <div key={idx} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Former MP"
                  value={item}
                  onChange={(e) =>
                    handleDynamicArrayChange("previous_designations", idx, e.target.value)
                  }
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => removeDynamicArrayItem("previous_designations", idx)}
                  className="text-red-500 hover:text-red-700 px-2"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => addDynamicArrayItem("previous_designations")}
            className="mt-3 text-sm text-green-600 font-semibold hover:text-green-700 flex items-center gap-1"
          >
            + Add Designation
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsAndPortfolio;
