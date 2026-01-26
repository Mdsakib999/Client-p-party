const BasicAndPersonal = ({
  formData,
  errors,
  handleInputChange,
  handleNestedChange,
  handleNestedDynamicArrayChange,
  addNestedDynamicArrayItem,
  removeNestedDynamicArrayItem,
}) => {
  const inputClass = (
    error
  ) => `w-full p-2.5 border rounded-lg transition-colors focus:outline-none focus:ring-2 ${error
    ? "border-red-500 focus:ring-red-200"
    : "border-gray-200 focus:border-green-500 focus:ring-green-100"
  }`;

  const labelClass = "block text-sm font-semibold text-gray-700 mb-1.5";

  return (
    <div className="space-y-8">
      {/* Basic Information */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="w-1 h-6 bg-green-500 rounded-full"></span>
          Basic Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="e.g. John Doe"
              value={formData?.name || ""}
              onChange={handleInputChange}
              className={inputClass(errors?.name)}
            />
            {errors?.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <label className={labelClass}>
              Current Designation
            </label>
            <input
              type="text"
              name="designation"
              placeholder="e.g. Secretary General"
              value={formData?.designation || ""}
              onChange={handleInputChange}
              className={inputClass(errors?.designation)}
            />
            {errors?.designation && (
              <p className="text-red-500 text-xs mt-1">{errors.designation}</p>
            )}
          </div>
          <div>
            <label className={labelClass}>
              Profession
            </label>
            <input
              type="text"
              name="profession"
              placeholder="e.g. Senior Leader"
              value={formData?.profession || ""}
              onChange={handleInputChange}
              className={inputClass(errors?.profession)}
            />
            {errors?.profession && (
              <p className="text-red-500 text-xs mt-1">{errors.profession}</p>
            )}
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Life Activities</label>
            <textarea
              name="life_activities"
              rows={3}
              placeholder="Brief description of life activities..."
              value={formData?.life_activities || ""}
              onChange={handleInputChange}
              className={inputClass()}
            />
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="w-1 h-6 bg-green-500 rounded-full"></span>
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Date of Birth</label>
            <input
              type="text"
              placeholder="e.g., 15 August 1945"
              value={formData?.personal_info?.birth_date || ""}
              onChange={(e) =>
                handleNestedChange(
                  "personal_info",
                  "birth_date",
                  e.target.value
                )
              }
              className={inputClass()}
            />
          </div>
          <div>
            <label className={labelClass}>Birth Place <span className="text-red-500">*</span></label>
            <input
              type="text"
              placeholder="e.g. Dhaka"
              value={formData?.personal_info?.birth_place || ""}
              onChange={(e) =>
                handleNestedChange(
                  "personal_info",
                  "birth_place",
                  e.target.value
                )
              }
              className={inputClass(errors && errors["personal_info.birth_place"])}
            />
            {errors && errors["personal_info.birth_place"] && (
              <p className="text-red-500 text-xs mt-1">{errors["personal_info.birth_place"]}</p>
            )}
          </div>
          <div>
            <label className={labelClass}>Nationality</label>
            <input
              type="text"
              placeholder="e.g. Bangladeshi"
              value={formData?.personal_info?.nationality || ""}
              onChange={(e) =>
                handleNestedChange(
                  "personal_info",
                  "nationality",
                  e.target.value
                )
              }
              className={inputClass()}
            />
          </div>
          <div>
            <label className={labelClass}>Mobile No</label>
            <input
              type="text"
              placeholder="e.g. 01700000000"
              value={formData?.personal_info?.mobileNo || ""}
              onChange={(e) =>
                handleNestedChange(
                  "personal_info",
                  "mobileNo",
                  e.target.value
                )
              }
              className={inputClass()}
            />
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Websites / Social Profiles</label>
            <div className="space-y-3">
              {formData?.personal_info?.website_or_social?.map((item, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="https://..."
                    value={item}
                    onChange={(e) =>
                      handleNestedDynamicArrayChange(
                        "personal_info",
                        "website_or_social",
                        idx,
                        e.target.value
                      )
                    }
                    className={inputClass()}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      removeNestedDynamicArrayItem(
                        "personal_info",
                        "website_or_social",
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
                addNestedDynamicArrayItem("personal_info", "website_or_social")
              }
              className="mt-3 text-sm text-green-600 font-semibold hover:text-green-700 flex items-center gap-1"
            >
              + Add Profile Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicAndPersonal;
