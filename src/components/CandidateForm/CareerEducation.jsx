const CareerEducation = ({
  formData,
  handleNestedChange,
  handleDynamicArrayChange,
  addDynamicArrayItem,
  removeDynamicArrayItem,
  handleNestedDynamicArrayChange,
  addNestedDynamicArrayItem,
  removeNestedDynamicArrayItem,
  addPoliticalCareer,
  removePoliticalCareer,
  handlePoliticalCareerChange,
  handleAutoTranslate,
}) => {
  const inputClass =
    "w-full p-2.5 border border-gray-200 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:border-green-500 focus:ring-green-100";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1.5";

  return (
    <div className="space-y-8">
      {/* Academic Career */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="w-1 h-6 bg-green-500 rounded-full"></span>
          Academic Career
        </h3>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Schools</label>
              <div className="space-y-3">
                {formData?.academic_career?.schools?.map((item, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. Dhaka Residential Model College"
                      value={item}
                      onChange={(e) =>
                        handleNestedDynamicArrayChange(
                          "academic_career",
                          "schools",
                          idx,
                          e.target.value
                        )
                      }
                      className={inputClass}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        removeNestedDynamicArrayItem(
                          "academic_career",
                          "schools",
                          idx
                        )
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
                onClick={() =>
                  addNestedDynamicArrayItem("academic_career", "schools")
                }
                className="mt-3 text-sm text-green-600 font-semibold hover:text-green-700 flex items-center gap-1"
              >
                + Add School
              </button>
            </div>

            <div>
              <label className={labelClass}>College</label>
              <input
                type="text"
                value={formData?.academic_career?.college || ""}
                onChange={(e) =>
                  handleNestedChange(
                    "academic_career",
                    "college",
                    e.target.value
                  )
                }
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>University</label>
              <div className="space-y-3">
                {formData?.academic_career?.university?.map((item, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. Dhaka University"
                      value={item}
                      onChange={(e) =>
                        handleNestedDynamicArrayChange(
                          "academic_career",
                          "university",
                          idx,
                          e.target.value
                        )
                      }
                      className={inputClass}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        removeNestedDynamicArrayItem(
                          "academic_career",
                          "university",
                          idx
                        )
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
                onClick={() =>
                  addNestedDynamicArrayItem("academic_career", "university")
                }
                className="mt-3 text-sm text-green-600 font-semibold hover:text-green-700 flex items-center gap-1"
              >
                + Add University
              </button>
            </div>

            <div>
              <label className={labelClass}>Degrees</label>
              <div className="space-y-3">
                {formData?.academic_career?.degree?.map((item, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. BSC in CST"
                      value={item}
                      onChange={(e) =>
                        handleNestedDynamicArrayChange(
                          "academic_career",
                          "degree",
                          idx,
                          e.target.value
                        )
                      }
                      className={inputClass}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        removeNestedDynamicArrayItem(
                          "academic_career",
                          "degree",
                          idx
                        )
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
                onClick={() =>
                  addNestedDynamicArrayItem("academic_career", "degree")
                }
                className="mt-3 text-sm text-green-600 font-semibold hover:text-green-700 flex items-center gap-1"
              >
                + Add Degree
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Career */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="w-1 h-6 bg-green-500 rounded-full"></span>
          Business / Professional Career
        </h3>
        <div>
          <label className={labelClass}>Careers / Business Sources</label>
          <div className="space-y-3">
            {formData?.business_income_source_professional_career?.map(
              (item, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. Managing Director at ABC Corp"
                    value={item}
                    onChange={(e) =>
                      handleDynamicArrayChange(
                        "business_income_source_professional_career",
                        idx,
                        e.target.value
                      )
                    }
                    className={inputClass}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      removeDynamicArrayItem(
                        "business_income_source_professional_career",
                        idx
                      )
                    }
                    className="text-red-500 hover:text-red-700 px-2"
                  >
                    Remove
                  </button>
                </div>
              )
            )}
          </div>
          <button
            type="button"
            onClick={() =>
              addDynamicArrayItem("business_income_source_professional_career")
            }
            className="mt-3 text-sm text-green-600 font-semibold hover:text-green-700 flex items-center gap-1"
          >
            + Add Career Source
          </button>
        </div>
      </div>

      {/* Political Career */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="w-1 h-6 bg-green-500 rounded-full"></span>
          Political Career
        </h3>
        <div className="space-y-4">
          <label className={labelClass}>History</label>
          {formData?.political_career?.map((item, idx) => (
            <div
              key={idx}
              className="bg-gray-50 border border-gray-100 rounded-lg p-4 relative group"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-1">
                  <label className="text-xs text-gray-500 mb-1 block">
                    Year
                  </label>
                  <input
                    type="text"
                    placeholder="2010-2015"
                    value={item?.year || ""}
                    onChange={(e) =>
                      handlePoliticalCareerChange(idx, "year", e.target.value)
                    }
                    className={inputClass}
                  />
                </div>
                <div className="md:col-span-3">
                  <label className="text-xs text-gray-500 mb-1 block">
                    Event
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Elected as General Secretary"
                    value={item?.event || ""}
                    onChange={(e) =>
                      handlePoliticalCareerChange(idx, "event", e.target.value)
                    }
                    className={inputClass}
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => removePoliticalCareer(idx)}
                className="absolute -top-3 -right-2 bg-red-100 text-red-600 rounded-full w-6 h-6 flex items-center justify-center shadow-sm hover:bg-red-200"
              >
                ×
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addPoliticalCareer}
            className="mt-3 text-sm text-green-600 font-semibold hover:text-green-700 flex items-center gap-1"
          >
            + Add Political Career Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default CareerEducation;
