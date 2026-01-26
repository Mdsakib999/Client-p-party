import { useState, useEffect } from "react";
import { useUpdateCandidateMutation } from "../redux/features/candidate/candidate.api";
import toast from "react-hot-toast";
import { X } from "lucide-react";

const EditCandidateModal = ({ candidate, onClose, onSuccess }) => {
  const [updateCandidate, { isLoading }] = useUpdateCandidateMutation();
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    category: "",
    life_activities: "",
    portfolio: [],
    designations: [],
    personal_info: {
      birth_date: "",
      birth_place: "",
      nationality: "",
      website_or_social: [],
    },
    academic_career: {
      schools: [],
      college: "",
      university: [],
      degree: [],
    },
    business_income_source_professional_career: [],
    political_career: [],
    election_constituencies: [],
    other_income_sources: [],
    social_links: [],
    district: [],
    division: [],
    overall_summary: "",
  });

  const [errors, setErrors] = useState({});

  // Initialize form data when candidate changes
  useEffect(() => {
    if (candidate) {
      setFormData({
        name: candidate.name || "",
        position: candidate.position || "",
        category: candidate.category || "",
        life_activities: candidate.life_activities || "",
        portfolio: candidate.portfolio || [],
        designations: candidate.designations || [],
        personal_info: {
          birth_date: candidate.personal_info?.birth_date || "",
          birth_place: candidate.personal_info?.birth_place || "",
          nationality: candidate.personal_info?.nationality || "",
          website_or_social: candidate.personal_info?.website_or_social || [],
        },
        academic_career: {
          schools: candidate.academic_career?.schools || [],
          college: candidate.academic_career?.college || "",
          university: candidate.academic_career?.university || [],
          degree: candidate.academic_career?.degree || [],
        },
        business_income_source_professional_career:
          candidate.business_income_source_professional_career || [],
        political_career: candidate.political_career || [],
        election_constituencies: candidate.election_constituencies || [],
        other_income_sources: candidate.other_income_sources || [],
        social_links: candidate.social_links || [],
        district: candidate.district || [],
        division: candidate.division || [],
        overall_summary: candidate.overall_summary || "",
      });
    }
  }, [candidate]);

  // Scroll to top on modal open
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Basic input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Nested object change handler
  const handleNestedChange = (parent, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
  };

  // Dynamic array change handler
  const handleDynamicArrayChange = (field, index, value) => {
    setFormData((prev) => {
      const updatedArray = [...prev[field]];
      updatedArray[index] = value;
      return { ...prev, [field]: updatedArray };
    });
  };

  // Add item to dynamic array
  const addDynamicArrayItem = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  // Remove item from dynamic array
  const removeDynamicArrayItem = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  // Nested dynamic array change handler
  const handleNestedDynamicArrayChange = (parent, field, index, value) => {
    setFormData((prev) => {
      const updatedParent = { ...prev[parent] };
      const updatedArray = [...updatedParent[field]];
      updatedArray[index] = value;
      updatedParent[field] = updatedArray;
      return { ...prev, [parent]: updatedParent };
    });
  };

  // Add item to nested dynamic array
  const addNestedDynamicArrayItem = (parent, field) => {
    setFormData((prev) => {
      const updatedParent = { ...prev[parent] };
      updatedParent[field] = [...updatedParent[field], ""];
      return { ...prev, [parent]: updatedParent };
    });
  };

  // Remove item from nested dynamic array
  const removeNestedDynamicArrayItem = (parent, field, index) => {
    setFormData((prev) => {
      const updatedParent = { ...prev[parent] };
      updatedParent[field] = updatedParent[field].filter((_, i) => i !== index);
      return { ...prev, [parent]: updatedParent };
    });
  };

  // Political career handlers
  const handlePoliticalCareerChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.political_career];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, political_career: updated };
    });
  };

  const addPoliticalCareer = () => {
    setFormData((prev) => ({
      ...prev,
      political_career: [...prev.political_career, { year: "", event: "" }],
    }));
  };

  const removePoliticalCareer = (index) => {
    setFormData((prev) => ({
      ...prev,
      political_career: prev.political_career.filter((_, i) => i !== index),
    }));
  };

  // Election constituency handlers
  const handleElectionConstituencyChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.election_constituencies];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, election_constituencies: updated };
    });
  };

  const addElectionConstituency = () => {
    setFormData((prev) => ({
      ...prev,
      election_constituencies: [
        ...prev.election_constituencies,
        { actual_place_name: "", election_area_name: "" },
      ],
    }));
  };

  const removeElectionConstituency = (index) => {
    setFormData((prev) => ({
      ...prev,
      election_constituencies: prev.election_constituencies.filter(
        (_, i) => i !== index
      ),
    }));
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name?.trim()) newErrors.name = "Name is required";
    if (!formData.position?.trim()) newErrors.position = "Position is required";
    if (!formData.category?.trim()) newErrors.category = "Category is required";
    if (!formData.overall_summary?.trim())
      newErrors.overall_summary = "Overall summary is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return false;
    }
    return true;
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await updateCandidate({
        id: candidate._id,
        updatedData: formData,
      }).unwrap();
      toast.success("Candidate updated successfully");
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to update candidate:", error);
      toast.error(error?.data?.message || "Failed to update candidate");
    }
  };

  if (!candidate) return null;

  // Reusable styles
  const inputClass = (error) =>
    `w-full p-2.5 border rounded-lg transition-colors focus:outline-none focus:ring-2 ${error
      ? "border-red-500 focus:ring-red-200"
      : "border-gray-200 focus:border-emerald-500 focus:ring-emerald-100"
    }`;

  const labelClass = "block text-sm font-semibold text-gray-700 mb-1.5";
  const sectionClass = "bg-white p-6 rounded-xl shadow-sm border border-gray-100";
  const sectionTitleClass = "text-xl font-bold text-gray-800 mb-6 flex items-center gap-2";

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-6xl h-[90vh] flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fixed Header */}
        <div className="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Edit Candidate
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50 px-6 py-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Current Photos Display */}
            <div className={sectionClass}>
              <h3 className={sectionTitleClass}>
                <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
                Current Photos
              </h3>
              <div className="flex gap-4 flex-wrap">
                {candidate.photos?.map((photo, idx) => (
                  <img
                    key={idx}
                    src={photo.secure_url || photo.url}
                    alt={`${candidate.name} ${idx + 1}`}
                    className="h-24 w-24 md:h-32 md:w-32 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
                  />
                ))}
              </div>
            </div>

            {/* Basic Information */}
            <div className={sectionClass}>
              <h3 className={sectionTitleClass}>
                <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
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
                    value={formData.name}
                    onChange={handleInputChange}
                    className={inputClass(errors.name)}
                    placeholder="e.g. John Doe"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className={labelClass}>
                    Current Position <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className={inputClass(errors.position)}
                    placeholder="e.g. Secretary General"
                  />
                  {errors.position && (
                    <p className="text-red-500 text-xs mt-1">{errors.position}</p>
                  )}
                </div>

                <div>
                  <label className={labelClass}>
                    Category/Role <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={inputClass(errors.category)}
                    placeholder="e.g. Senior Leader"
                  />
                  {errors.category && (
                    <p className="text-red-500 text-xs mt-1">{errors.category}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className={labelClass}>Life Activities</label>
                  <textarea
                    name="life_activities"
                    rows={3}
                    value={formData.life_activities}
                    onChange={handleInputChange}
                    className={inputClass()}
                    placeholder="Brief description of life activities..."
                  />
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className={sectionClass}>
              <h3 className={sectionTitleClass}>
                <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Date of Birth</label>
                  <input
                    type="text"
                    value={formData.personal_info.birth_date}
                    onChange={(e) =>
                      handleNestedChange("personal_info", "birth_date", e.target.value)
                    }
                    className={inputClass()}
                    placeholder="e.g., 15 August 1945"
                  />
                </div>

                <div>
                  <label className={labelClass}>Birth Place</label>
                  <input
                    type="text"
                    value={formData.personal_info.birth_place}
                    onChange={(e) =>
                      handleNestedChange("personal_info", "birth_place", e.target.value)
                    }
                    className={inputClass()}
                    placeholder="e.g. Dhaka"
                  />
                </div>

                <div>
                  <label className={labelClass}>Nationality</label>
                  <input
                    type="text"
                    value={formData.personal_info.nationality}
                    onChange={(e) =>
                      handleNestedChange("personal_info", "nationality", e.target.value)
                    }
                    className={inputClass()}
                    placeholder="e.g. Bangladeshi"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className={labelClass}>Websites / Social Profiles</label>
                  <div className="space-y-3">
                    {formData.personal_info.website_or_social?.map((item, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input
                          type="text"
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
                          placeholder="https://..."
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
                          className="px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg font-semibold transition-colors"
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
                    className="mt-3 text-sm text-emerald-600 font-semibold hover:text-emerald-700 flex items-center gap-1"
                  >
                    + Add Profile Link
                  </button>
                </div>
              </div>
            </div>

            {/* Portfolio */}
            <div className={sectionClass}>
              <h3 className={sectionTitleClass}>
                <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
                Portfolio
              </h3>
              <div className="space-y-3">
                {formData.portfolio?.map((item, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) =>
                        handleDynamicArrayChange("portfolio", idx, e.target.value)
                      }
                      className={inputClass()}
                      placeholder="Portfolio item"
                    />
                    <button
                      type="button"
                      onClick={() => removeDynamicArrayItem("portfolio", idx)}
                      className="px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg font-semibold transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => addDynamicArrayItem("portfolio")}
                className="mt-3 text-sm text-emerald-600 font-semibold hover:text-emerald-700 flex items-center gap-1"
              >
                + Add Portfolio Item
              </button>
            </div>

            {/* Designations */}
            <div className={sectionClass}>
              <h3 className={sectionTitleClass}>
                <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
                Designations
              </h3>
              <div className="space-y-3">
                {formData.designations?.map((item, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) =>
                        handleDynamicArrayChange("designations", idx, e.target.value)
                      }
                      className={inputClass()}
                      placeholder="Designation"
                    />
                    <button
                      type="button"
                      onClick={() => removeDynamicArrayItem("designations", idx)}
                      className="px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg font-semibold transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => addDynamicArrayItem("designations")}
                className="mt-3 text-sm text-emerald-600 font-semibold hover:text-emerald-700 flex items-center gap-1"
              >
                + Add Designation
              </button>
            </div>

            {/* Academic Career */}
            <div className={sectionClass}>
              <h3 className={sectionTitleClass}>
                <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
                Academic Career
              </h3>
              <div className="space-y-6">
                {/* Schools */}
                <div>
                  <label className={labelClass}>Schools</label>
                  <div className="space-y-3">
                    {formData.academic_career.schools?.map((item, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) =>
                            handleNestedDynamicArrayChange(
                              "academic_career",
                              "schools",
                              idx,
                              e.target.value
                            )
                          }
                          className={inputClass()}
                          placeholder="School name"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            removeNestedDynamicArrayItem("academic_career", "schools", idx)
                          }
                          className="px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg font-semibold transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => addNestedDynamicArrayItem("academic_career", "schools")}
                    className="mt-3 text-sm text-emerald-600 font-semibold hover:text-emerald-700 flex items-center gap-1"
                  >
                    + Add School
                  </button>
                </div>

                {/* College */}
                <div>
                  <label className={labelClass}>College</label>
                  <input
                    type="text"
                    value={formData.academic_career.college}
                    onChange={(e) =>
                      handleNestedChange("academic_career", "college", e.target.value)
                    }
                    className={inputClass()}
                    placeholder="College name"
                  />
                </div>

                {/* University */}
                <div>
                  <label className={labelClass}>University</label>
                  <div className="space-y-3">
                    {formData.academic_career.university?.map((item, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) =>
                            handleNestedDynamicArrayChange(
                              "academic_career",
                              "university",
                              idx,
                              e.target.value
                            )
                          }
                          className={inputClass()}
                          placeholder="University name"
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
                          className="px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg font-semibold transition-colors"
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
                    className="mt-3 text-sm text-emerald-600 font-semibold hover:text-emerald-700 flex items-center gap-1"
                  >
                    + Add University
                  </button>
                </div>

                {/* Degree */}
                <div>
                  <label className={labelClass}>Degree</label>
                  <div className="space-y-3">
                    {formData.academic_career.degree?.map((item, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) =>
                            handleNestedDynamicArrayChange(
                              "academic_career",
                              "degree",
                              idx,
                              e.target.value
                            )
                          }
                          className={inputClass()}
                          placeholder="Degree name"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            removeNestedDynamicArrayItem("academic_career", "degree", idx)
                          }
                          className="px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg font-semibold transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => addNestedDynamicArrayItem("academic_career", "degree")}
                    className="mt-3 text-sm text-emerald-600 font-semibold hover:text-emerald-700 flex items-center gap-1"
                  >
                    + Add Degree
                  </button>
                </div>
              </div>
            </div>

            {/* Professional Career */}
            <div className={sectionClass}>
              <h3 className={sectionTitleClass}>
                <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
                Professional Career
              </h3>
              <div className="space-y-3">
                {formData.business_income_source_professional_career?.map((item, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) =>
                        handleDynamicArrayChange(
                          "business_income_source_professional_career",
                          idx,
                          e.target.value
                        )
                      }
                      className={inputClass()}
                      placeholder="Professional career item"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        removeDynamicArrayItem(
                          "business_income_source_professional_career",
                          idx
                        )
                      }
                      className="px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg font-semibold transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() =>
                  addDynamicArrayItem("business_income_source_professional_career")
                }
                className="mt-3 text-sm text-emerald-600 font-semibold hover:text-emerald-700 flex items-center gap-1"
              >
                + Add Professional Career Item
              </button>
            </div>

            {/* Political Career */}
            <div className={sectionClass}>
              <h3 className={sectionTitleClass}>
                <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
                Political Career
              </h3>
              <div className="space-y-4">
                {formData.political_career?.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Year
                        </label>
                        <input
                          type="text"
                          value={item.year}
                          onChange={(e) =>
                            handlePoliticalCareerChange(idx, "year", e.target.value)
                          }
                          className={inputClass()}
                          placeholder="e.g. 1971"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Event
                        </label>
                        <input
                          type="text"
                          value={item.event}
                          onChange={(e) =>
                            handlePoliticalCareerChange(idx, "event", e.target.value)
                          }
                          className={inputClass()}
                          placeholder="Event description"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removePoliticalCareer(idx)}
                      className="mt-3 text-sm text-red-600 hover:text-red-700 font-semibold"
                    >
                      Remove Entry
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addPoliticalCareer}
                className="mt-3 text-sm text-emerald-600 font-semibold hover:text-emerald-700 flex items-center gap-1"
              >
                + Add Political Career Entry
              </button>
            </div>

            {/* Election Constituencies */}
            <div className={sectionClass}>
              <h3 className={sectionTitleClass}>
                <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
                Election Constituencies
              </h3>
              <div className="space-y-4">
                {formData.election_constituencies?.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Actual Place Name
                        </label>
                        <input
                          type="text"
                          value={item.actual_place_name}
                          onChange={(e) =>
                            handleElectionConstituencyChange(
                              idx,
                              "actual_place_name",
                              e.target.value
                            )
                          }
                          className={inputClass()}
                          placeholder="e.g. Dhaka-10"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Election Area Name
                        </label>
                        <input
                          type="text"
                          value={item.election_area_name}
                          onChange={(e) =>
                            handleElectionConstituencyChange(
                              idx,
                              "election_area_name",
                              e.target.value
                            )
                          }
                          className={inputClass()}
                          placeholder="Area name"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeElectionConstituency(idx)}
                      className="mt-3 text-sm text-red-600 hover:text-red-700 font-semibold"
                    >
                      Remove Constituency
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addElectionConstituency}
                className="mt-3 text-sm text-emerald-600 font-semibold hover:text-emerald-700 flex items-center gap-1"
              >
                + Add Election Constituency
              </button>
            </div>

            {/* Other Income Sources */}
            <div className={sectionClass}>
              <h3 className={sectionTitleClass}>
                <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
                Other Income Sources
              </h3>
              <div className="space-y-3">
                {formData.other_income_sources?.map((item, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) =>
                        handleDynamicArrayChange(
                          "other_income_sources",
                          idx,
                          e.target.value
                        )
                      }
                      className={inputClass()}
                      placeholder="Income source"
                    />
                    <button
                      type="button"
                      onClick={() => removeDynamicArrayItem("other_income_sources", idx)}
                      className="px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg font-semibold transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => addDynamicArrayItem("other_income_sources")}
                className="mt-3 text-sm text-emerald-600 font-semibold hover:text-emerald-700 flex items-center gap-1"
              >
                + Add Income Source
              </button>
            </div>

            {/* Social Links */}
            <div className={sectionClass}>
              <h3 className={sectionTitleClass}>
                <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
                Social Links
              </h3>
              <div className="space-y-3">
                {formData.social_links?.map((item, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) =>
                        handleDynamicArrayChange("social_links", idx, e.target.value)
                      }
                      className={inputClass()}
                      placeholder="https://..."
                    />
                    <button
                      type="button"
                      onClick={() => removeDynamicArrayItem("social_links", idx)}
                      className="px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg font-semibold transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => addDynamicArrayItem("social_links")}
                className="mt-3 text-sm text-emerald-600 font-semibold hover:text-emerald-700 flex items-center gap-1"
              >
                + Add Social Link
              </button>
            </div>

            {/* Location Information */}
            <div className={sectionClass}>
              <h3 className={sectionTitleClass}>
                <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
                Location Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Districts */}
                <div>
                  <label className={labelClass}>Districts</label>
                  <div className="space-y-3">
                    {formData.district?.map((item, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) =>
                            handleDynamicArrayChange("district", idx, e.target.value)
                          }
                          className={inputClass()}
                          placeholder="District name"
                        />
                        <button
                          type="button"
                          onClick={() => removeDynamicArrayItem("district", idx)}
                          className="px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg font-semibold transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => addDynamicArrayItem("district")}
                    className="mt-3 text-sm text-emerald-600 font-semibold hover:text-emerald-700 flex items-center gap-1"
                  >
                    + Add District
                  </button>
                </div>

                {/* Divisions */}
                <div>
                  <label className={labelClass}>Divisions</label>
                  <div className="space-y-3">
                    {formData.division?.map((item, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) =>
                            handleDynamicArrayChange("division", idx, e.target.value)
                          }
                          className={inputClass()}
                          placeholder="Division name"
                        />
                        <button
                          type="button"
                          onClick={() => removeDynamicArrayItem("division", idx)}
                          className="px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg font-semibold transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => addDynamicArrayItem("division")}
                    className="mt-3 text-sm text-emerald-600 font-semibold hover:text-emerald-700 flex items-center gap-1"
                  >
                    + Add Division
                  </button>
                </div>
              </div>
            </div>

            {/* Overall Summary */}
            <div className={sectionClass}>
              <h3 className={sectionTitleClass}>
                <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
                Overall Summary <span className="text-red-500">*</span>
              </h3>
              <textarea
                name="overall_summary"
                value={formData.overall_summary}
                onChange={handleInputChange}
                rows={6}
                className={inputClass(errors.overall_summary)}
                placeholder="Provide a comprehensive summary of the candidate"
              />
              {errors.overall_summary && (
                <p className="text-red-500 text-xs mt-1">{errors.overall_summary}</p>
              )}
            </div>
          </form>
        </div>

        {/* Fixed Footer */}
        <div className="flex-shrink-0 bg-white border-t border-gray-200 px-6 py-4 flex gap-4 rounded-b-2xl">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            onClick={handleSubmit}
            className="flex-1 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md"
          >
            {isLoading ? "Updating..." : "Update Candidate"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCandidateModal;
