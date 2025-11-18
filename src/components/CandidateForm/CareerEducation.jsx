const CareerEducation = ({
  formData,
  arrayInputs,
  handleArrayInputChange,
  handleNestedChange,
  addNestedArrayItem,
  addArrayItem,
  removeArrayItem,
  addPoliticalCareer,
  removePoliticalCareer,
  handleNestedArrayInput,
}) => {
  const removeSchool = (idx) => {
    const updated = formData.academic_career.schools.filter(
      (_, i) => i !== idx
    );
    handleNestedChange("academic_career", "schools", updated);
  };

  const removeUniversity = (idx) => {
    const updated = formData.academic_career.university.filter(
      (_, i) => i !== idx
    );
    handleNestedChange("academic_career", "university", updated);
  };

  const removeDegree = (idx) => {
    const updated = formData.academic_career.degree.filter((_, i) => i !== idx);
    handleNestedChange("academic_career", "degree", updated);
  };

  return (
    <div className="space-y-6">
      {/* Academic Career */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Academic Career</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Schools</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add school"
                value={arrayInputs.schools}
                onChange={(e) =>
                  handleArrayInputChange("schools", e.target.value)
                }
                className="flex-1 p-2 border rounded"
              />
              <button
                type="button"
                onClick={() => addNestedArrayItem("academic_career", "schools")}
                className="bg-blue-500 text-white px-3 py-2 rounded"
              >
                Add
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.academic_career.schools.map((item, idx) => (
                <span
                  key={idx}
                  className="bg-green-100 text-green-800 px-2 py-1 rounded flex items-center gap-2 text-sm"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => removeSchool(idx)}
                    className="text-red-600 font-bold"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">College</label>
            <input
              type="text"
              value={formData.academic_career.college}
              onChange={(e) =>
                handleNestedChange("academic_career", "college", e.target.value)
              }
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">University</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add university"
                value={arrayInputs.university}
                onChange={(e) =>
                  handleArrayInputChange("university", e.target.value)
                }
                className="flex-1 p-2 border rounded"
              />
              <button
                type="button"
                onClick={() =>
                  addNestedArrayItem("academic_career", "university")
                }
                className="bg-blue-500 text-white px-3 py-2 rounded"
              >
                Add
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.academic_career.university.map((item, idx) => (
                <span
                  key={idx}
                  className="bg-purple-100 text-purple-800 px-2 py-1 rounded flex items-center gap-2 text-sm"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => removeUniversity(idx)}
                    className="text-red-600 font-bold"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Degree</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add degree"
                value={arrayInputs.degree}
                onChange={(e) =>
                  handleArrayInputChange("degree", e.target.value)
                }
                className="flex-1 p-2 border rounded"
              />
              <button
                type="button"
                onClick={() => addNestedArrayItem("academic_career", "degree")}
                className="bg-blue-500 text-white px-3 py-2 rounded"
              >
                Add
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.academic_career.degree.map((item, idx) => (
                <span
                  key={idx}
                  className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded flex items-center gap-2 text-sm"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => removeDegree(idx)}
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

      {/* Professional Career */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">
          Business/Income/Professional Career
        </h3>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="Add career"
            value={arrayInputs.business_income}
            onChange={(e) =>
              handleArrayInputChange("business_income", e.target.value)
            }
            className="flex-1 p-2 border rounded"
          />
          <button
            type="button"
            onClick={() =>
              addArrayItem("business_income_source_professional_career")
            }
            className="bg-blue-500 text-white px-3 py-2 rounded"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.business_income_source_professional_career.map(
            (item, idx) => (
              <span
                key={idx}
                className="bg-red-100 text-red-800 px-2 py-1 rounded flex items-center gap-2 text-sm"
              >
                {item}
                <button
                  type="button"
                  onClick={() =>
                    removeArrayItem(
                      "business_income_source_professional_career",
                      idx
                    )
                  }
                  className="text-red-600 font-bold"
                >
                  ✕
                </button>
              </span>
            )
          )}
        </div>
      </div>

      {/* Political Career */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Political Career</h3>
        <div className="grid grid-cols-2 gap-2 mb-2">
          <input
            type="text"
            placeholder="Year/Period"
            value={arrayInputs.political_career.year}
            onChange={(e) =>
              handleNestedArrayInput("political_career", "year", e.target.value)
            }
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Event"
            value={arrayInputs.political_career.event}
            onChange={(e) =>
              handleNestedArrayInput(
                "political_career",
                "event",
                e.target.value
              )
            }
            className="p-2 border rounded"
          />
        </div>
        <button
          type="button"
          onClick={addPoliticalCareer}
          className="bg-blue-500 text-white px-3 py-2 rounded mb-2"
        >
          Add
        </button>
        <div className="space-y-2">
          {formData.political_career.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border rounded p-2 flex justify-between items-center"
            >
              <span className="text-sm">
                {item.year} - {item.event}
              </span>
              <button
                type="button"
                onClick={() => removePoliticalCareer(idx)}
                className="text-red-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareerEducation;
