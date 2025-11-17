const BasicAndPersonal = ({
  formData,
  handleInputChange,
  handleNestedChange,
  arrayInputs,
  handleArrayInputChange,
  addNestedArrayItem,
}) => {
  const removeWebsiteOrSocial = (idx) => {
    const updated = formData.personal_info.website_or_social.filter(
      (_, i) => i !== idx
    );
    handleNestedChange("personal_info", "website_or_social", updated);
  };

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Position *</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Category *</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium">Life Activities</label>
            <input
              type="text"
              name="life_activities"
              value={formData.life_activities}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Birth Date</label>
            <input
              type="text"
              placeholder="e.g., 15 August 1945"
              value={formData.personal_info.birth_date}
              onChange={(e) =>
                handleNestedChange(
                  "personal_info",
                  "birth_date",
                  e.target.value
                )
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Birth Place</label>
            <input
              type="text"
              value={formData.personal_info.birth_place}
              onChange={(e) =>
                handleNestedChange(
                  "personal_info",
                  "birth_place",
                  e.target.value
                )
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Nationality</label>
            <input
              type="text"
              value={formData.personal_info.nationality}
              onChange={(e) =>
                handleNestedChange(
                  "personal_info",
                  "nationality",
                  e.target.value
                )
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Website/Social</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add link"
                value={arrayInputs.website_or_social}
                onChange={(e) =>
                  handleArrayInputChange("website_or_social", e.target.value)
                }
                className="flex-1 p-2 border rounded"
              />
              <button
                type="button"
                onClick={() =>
                  addNestedArrayItem("personal_info", "website_or_social")
                }
                className="bg-blue-500 text-white px-3 py-2 rounded"
              >
                Add
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.personal_info.website_or_social.map((item, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center gap-2 text-sm"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => removeWebsiteOrSocial(idx)}
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
    </div>
  );
};

export default BasicAndPersonal;
