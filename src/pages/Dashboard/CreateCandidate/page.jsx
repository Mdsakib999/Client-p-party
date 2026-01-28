import { useState, useEffect } from "react";
import { useCreateCandidateMutation } from "../../../redux/features/candidate/candidate.api";
import BasicAndPersonal from "../../../components/CandidateForm/BasicAndPersonal";
import CareerEducation from "../../../components/CandidateForm/CareerEducation";
import DetailsAndPortfolio from "../../../components/CandidateForm/DetailsAndPortfolio";
import FinalInfo from "../../../components/CandidateForm/FinalInfo";
import toast from "react-hot-toast";

const CreateCandidate = () => {
  const [createCandidate, { isLoading }] = useCreateCandidateMutation();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    profession: "",
    portfolio: [],
    previous_designations: [],
    personal_info: {
      birth_date: "",
      birth_place: "",
      nationality: "",
      mobileNo: "",
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
    life_activities: "",
    other_income_sources: [],
    social_links: [],
    photos: null,
    overall_summary: "",
    district: [],
    division: [],
  });

  const [errors, setErrors] = useState({});

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [currentStep]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
    if (errors[`${parent}.${field}`]) {
      setErrors((prev) => ({ ...prev, [`${parent}.${field}`]: "" }));
    }
  };

  const addElectionConstituency = (constituencyData) => {
    if (constituencyData) {
      setFormData((prev) => ({
        ...prev,
        election_constituencies: [
          ...prev.election_constituencies,
          constituencyData,
        ],
      }));
    }
  };

  const handleAddLocation = (division, district) => {
    setFormData((prev) => {
      const newDivisions = prev.division.includes(division)
        ? prev.division
        : [...prev.division, division];

      const newDistricts = prev.district.includes(district)
        ? prev.district
        : [...prev.district, district];

      return {
        ...prev,
        division: newDivisions,
        district: newDistricts,
      };
    });
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      photos: e.target.files,
    }));
    if (errors.photos) {
      setErrors((prev) => ({ ...prev, photos: "" }));
    }
  };

  const removePoliticalCareer = (index) => {
    setFormData((prev) => ({
      ...prev,
      political_career: prev.political_career.filter((_, i) => i !== index),
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

  const handleDynamicArrayChange = (field, index, value) => {
    setFormData((prev) => {
      const updatedArray = [...prev[field]];
      updatedArray[index] = value;
      return { ...prev, [field]: updatedArray };
    });
  };

  const addDynamicArrayItem = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeDynamicArrayItem = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleNestedDynamicArrayChange = (parent, field, index, value) => {
    setFormData((prev) => {
      const updatedParent = { ...prev[parent] };
      const updatedArray = [...updatedParent[field]];
      updatedArray[index] = value;
      updatedParent[field] = updatedArray;
      return { ...prev, [parent]: updatedParent };
    });
  };

  const addNestedDynamicArrayItem = (parent, field) => {
    setFormData((prev) => {
      const updatedParent = { ...prev[parent] };
      updatedParent[field] = [...updatedParent[field], ""];
      return { ...prev, [parent]: updatedParent };
    });
  };

  const removeNestedDynamicArrayItem = (parent, field, index) => {
    setFormData((prev) => {
      const updatedParent = { ...prev[parent] };
      updatedParent[field] = updatedParent[field].filter((_, i) => i !== index);
      return { ...prev, [parent]: updatedParent };
    });
  };

  // Political Career Specific
  const handlePoliticalCareerChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.political_career];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, political_career: updated };
    });
  };

  // Replaces the old addPoliticalCareer
  const addPoliticalCareer = () => {
    setFormData((prev) => ({
      ...prev,
      political_career: [...prev.political_career, { year: "", event: "" }],
    }));
  };

  // Validation
  const validateStep = (step) => {
    const newErrors = {};
    let isValid = true;

    if (step === 0) {
      if (!formData?.name?.trim()) newErrors.name = "Name is required";
      if (!formData?.personal_info?.birth_place?.trim()) newErrors["personal_info.birth_place"] = "Birth place is required";
    }

    // if (step === 2) { // Details & Portfolio
    //    if (!formData?.election_constituencies || formData?.election_constituencies?.length === 0) {
    //       newErrors.election_constituencies = "At least one election constituency is required";
    //    }
    // }

    if (step === 3) { // Final Step
      if (!formData?.overall_summary?.trim()) newErrors.overall_summary = "Overall summary is required";
      if (!formData?.district || formData?.district?.length === 0) newErrors.district = "At least one district is required";
      if (!formData?.division || formData?.division?.length === 0) newErrors.division = "At least one division is required";
      if (!formData?.election_constituencies || formData?.election_constituencies?.length === 0) {
        newErrors.election_constituencies = "At least one election constituency is required";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      isValid = false;
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }

    return isValid;
  };

  // Define steps
  const steps = [
    {
      name: "Basic & Personal Info",
      component: (
        <BasicAndPersonal
          formData={formData}
          errors={errors}
          handleInputChange={handleInputChange}
          handleNestedChange={handleNestedChange}
          handleDynamicArrayChange={handleDynamicArrayChange}
          addDynamicArrayItem={addDynamicArrayItem}
          removeDynamicArrayItem={removeDynamicArrayItem}
          handleNestedDynamicArrayChange={handleNestedDynamicArrayChange}
          addNestedDynamicArrayItem={addNestedDynamicArrayItem}
          removeNestedDynamicArrayItem={removeNestedDynamicArrayItem}
        />
      ),
    },
    {
      name: "Career & Education",
      component: (
        <CareerEducation
          formData={formData}
          handleNestedChange={handleNestedChange}
          handleDynamicArrayChange={handleDynamicArrayChange}
          addDynamicArrayItem={addDynamicArrayItem}
          removeDynamicArrayItem={removeDynamicArrayItem}
          handleNestedDynamicArrayChange={handleNestedDynamicArrayChange}
          addNestedDynamicArrayItem={addNestedDynamicArrayItem}
          removeNestedDynamicArrayItem={removeNestedDynamicArrayItem}
          addPoliticalCareer={addPoliticalCareer}
          removePoliticalCareer={removePoliticalCareer}
          handlePoliticalCareerChange={handlePoliticalCareerChange}
        />
      ),
    },
    {
      name: "Details & Portfolio",
      component: (
        <DetailsAndPortfolio
          formData={formData}
          errors={errors}
          handleDynamicArrayChange={handleDynamicArrayChange}
          addDynamicArrayItem={addDynamicArrayItem}
          removeDynamicArrayItem={removeDynamicArrayItem}
          addElectionConstituency={addElectionConstituency}
          removeElectionConstituency={removeElectionConstituency}
        />
      ),
    },
    {
      name: "Final Info & Summary",
      component: (
        <FinalInfo
          formData={formData}
          errors={errors}
          handleInputChange={handleInputChange}
          handleFileChange={handleFileChange}
          addElectionConstituency={addElectionConstituency}
          removeElectionConstituency={removeElectionConstituency}
          handleAddLocation={handleAddLocation}
          handleDynamicArrayChange={handleDynamicArrayChange}
          addDynamicArrayItem={addDynamicArrayItem}
          removeDynamicArrayItem={removeDynamicArrayItem}
        />
      ),
    },
  ];

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(3)) return;

    try {
      const submitData = new FormData();

      submitData.append("name", formData.name);
      submitData.append("designation", formData.designation);
      submitData.append("profession", formData.profession);
      submitData.append("life_activities", formData.life_activities);
      submitData.append("overall_summary", formData.overall_summary);
      submitData.append("portfolio", JSON.stringify(formData.portfolio));
      submitData.append("previous_designations", JSON.stringify(formData.previous_designations));
      submitData.append(
        "personal_info",
        JSON.stringify(formData.personal_info)
      );
      submitData.append(
        "academic_career",
        JSON.stringify(formData.academic_career)
      );
      submitData.append(
        "business_income_source_professional_career",
        JSON.stringify(formData.business_income_source_professional_career)
      );
      submitData.append(
        "political_career",
        JSON.stringify(formData.political_career)
      );
      submitData.append(
        "election_constituencies",
        JSON.stringify(formData.election_constituencies)
      );
      submitData.append(
        "other_income_sources",
        JSON.stringify(formData.other_income_sources)
      );
      // submitData.append("social_links", JSON.stringify(formData.social_links)); // Merged in backend
      submitData.append("district", JSON.stringify(formData.district));
      submitData.append("division", JSON.stringify(formData.division));

      if (formData.photos) {
        for (let i = 0; i < formData.photos.length; i++) {
          submitData.append("photos", formData.photos[i]);
        }
      }

      await createCandidate(submitData).unwrap();
      toast.success("Candidate created successfully");
      resetForm();
    } catch (error) {
      console.error("Error creating candidate:", error);
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "Error creating candidate. Check console for details.";
      toast.error(<h1 className="font-semibold">{errorMessage}</h1>);
    }
  };

  const resetForm = () => {
    setErrors({});
    setFormData({
      name: "",
      designation: "",
      profession: "",
      portfolio: [],
      previous_designations: [],
      personal_info: {
        birth_date: "",
        birth_place: "",
        nationality: "",
        mobileNo: "",
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
      life_activities: "",
      other_income_sources: [],
      // social_links removed as it is part of personal_info
      photos: null,
      overall_summary: "",
      district: [],
      division: [],
    });
    setCurrentStep(0);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto" >
      <h2 className="text-3xl font-bold mb-8">Create New Candidate</h2>
      <div className="mb-8" >
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            Step {currentStep + 1} of {steps.length}
          </span>
          <span className="text-sm font-medium text-gray-600">
            {steps[currentStep].name}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div >

      < div className="flex justify-between mb-8 overflow-x-auto" >
        {
          steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center min-w-max">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${idx === currentStep
                  ? "bg-green-500 text-white"
                  : idx < currentStep
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 text-gray-600"
                  }`}
              >
                {idx < currentStep ? "✓" : idx + 1}
              </div>
              <p className="text-xs text-gray-600 mt-2 text-center max-w-[80px]">
                {step.name}
              </p>
            </div>
          ))
        }
      </div >

      < form onSubmit={handleSubmit} className="mb-8" >
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          {steps[currentStep].component}
        </div>

        <div className="flex justify-between gap-4">
          <button
            type="button"
            onClick={handlePreviousStep}
            disabled={currentStep === 0}
            className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white px-6 py-2 rounded font-semibold transition-colors"
          >
            Previous
          </button>

          <div className="flex gap-2">
            {currentStep === steps.length - 1 ? (
              <>
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={isLoading}
                  className="bg-gray-400 hover:bg-gray-500 disabled:bg-gray-300 text-white px-6 py-2 rounded font-semibold transition-colors"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-8 py-2 rounded font-semibold transition-colors"
                >
                  {isLoading ? "Creating..." : "Create Candidate"}
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={handleNextStep}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded font-semibold transition-colors"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </form >
    </div >
  );
};

export default CreateCandidate;