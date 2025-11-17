import { useState } from "react";
import { useCreateCandidateMutation } from "../../../redux/features/candidate/candidate.api";
import BasicAndPersonal from "../../../components/CandidateForm/BasicAndPersonal";
import CareerEducation from "../../../components/CandidateForm/CareerEducation";
import DetailsAndPortfolio from "../../../components/CandidateForm/DetailsAndPortfolio";
import FinalInfo from "../../../components/CandidateForm/FinalInfo";

const CreateCandidate = () => {
  const [createCandidate, { isLoading }] = useCreateCandidateMutation();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    category: "",
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
    life_activities: "",
    other_income_sources: [],
    social_links: [],
    photos: null,
    overall_summary: "",
    district: [],
    division: [],
  });

  const [arrayInputs, setArrayInputs] = useState({
    designations: "",
    portfolio: "",
    schools: "",
    university: "",
    degree: "",
    business_income: "",
    social_links: "",
    website_or_social: "",
    district: "",
    division: "",
    other_income_sources: "",
    political_career: { year: "", event: "" },
    election_constituency: { actual_place_name: "", election_area_name: "" },
  });

  // Handler functions
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
  };

  const handleArrayInputChange = (field, value) => {
    setArrayInputs((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNestedArrayInput = (parent, field, value) => {
    setArrayInputs((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
  };

  const addArrayItem = (field) => {
    if (!arrayInputs[field]?.trim()) return;

    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], arrayInputs[field]],
    }));
    setArrayInputs((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const addNestedArrayItem = (parent, field) => {
    if (!arrayInputs[parent]?.[field]?.trim()) return;

    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: [...prev[parent][field], arrayInputs[parent][field]],
      },
    }));
    setArrayInputs((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: "",
      },
    }));
  };

  const addPortfolioItem = () => {
    if (!arrayInputs.portfolio?.trim()) return;

    setFormData((prev) => ({
      ...prev,
      portfolio: [...prev.portfolio, arrayInputs.portfolio],
    }));
    setArrayInputs((prev) => ({
      ...prev,
      portfolio: "",
    }));
  };

  const addPoliticalCareer = () => {
    const { year, event } = arrayInputs.political_career;
    if (!year?.trim() || !event?.trim()) return;

    setFormData((prev) => ({
      ...prev,
      political_career: [...prev.political_career, { year, event }],
    }));
    setArrayInputs((prev) => ({
      ...prev,
      political_career: { year: "", event: "" },
    }));
  };

  const addElectionConstituency = () => {
    const { actual_place_name, election_area_name } =
      arrayInputs.election_constituency;
    if (!actual_place_name?.trim() || !election_area_name?.trim()) return;

    setFormData((prev) => ({
      ...prev,
      election_constituencies: [
        ...prev.election_constituencies,
        { actual_place_name, election_area_name },
      ],
    }));
    setArrayInputs((prev) => ({
      ...prev,
      election_constituency: { actual_place_name: "", election_area_name: "" },
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      photos: e.target.files,
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
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

  // Define steps
  const steps = [
    {
      name: "Basic & Personal Info",
      component: (
        <BasicAndPersonal
          formData={formData}
          handleInputChange={handleInputChange}
          handleNestedChange={handleNestedChange}
          arrayInputs={arrayInputs}
          handleArrayInputChange={handleArrayInputChange}
          addNestedArrayItem={addNestedArrayItem}
        />
      ),
    },
    {
      name: "Career & Education",
      component: (
        <CareerEducation
          formData={formData}
          arrayInputs={arrayInputs}
          handleArrayInputChange={handleArrayInputChange}
          handleNestedChange={handleNestedChange}
          addNestedArrayItem={addNestedArrayItem}
          addArrayItem={addArrayItem}
          removeArrayItem={removeArrayItem}
          addPoliticalCareer={addPoliticalCareer}
          removePoliticalCareer={removePoliticalCareer}
          handleNestedArrayInput={handleNestedArrayInput}
        />
      ),
    },
    {
      name: "Details & Portfolio",
      component: (
        <DetailsAndPortfolio
          formData={formData}
          arrayInputs={arrayInputs}
          handleArrayInputChange={handleArrayInputChange}
          addArrayItem={addArrayItem}
          removeArrayItem={removeArrayItem}
          addPortfolioItem={addPortfolioItem}
          handleNestedArrayInput={handleNestedArrayInput}
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
          arrayInputs={arrayInputs}
          handleArrayInputChange={handleArrayInputChange}
          handleInputChange={handleInputChange}
          addArrayItem={addArrayItem}
          removeArrayItem={removeArrayItem}
          handleFileChange={handleFileChange}
        />
      ),
    },
  ];

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.photos || formData.photos.length === 0) {
      alert("Please upload at least one photo");
      return;
    }

    try {
      const submitData = new FormData();

      // Add basic fields
      submitData.append("name", formData.name);
      submitData.append("position", formData.position);
      submitData.append("category", formData.category);
      submitData.append("life_activities", formData.life_activities);
      submitData.append("overall_summary", formData.overall_summary);

      // Add nested objects
      submitData.append("portfolio", JSON.stringify(formData.portfolio));
      submitData.append("designations", JSON.stringify(formData.designations));
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
      submitData.append("social_links", JSON.stringify(formData.social_links));
      submitData.append("district", JSON.stringify(formData.district));
      submitData.append("division", JSON.stringify(formData.division));

      // Add photos
      if (formData.photos) {
        for (let i = 0; i < formData.photos.length; i++) {
          submitData.append("photos", formData.photos[i]);
        }
      }

      const result = await createCandidate(submitData).unwrap();
      alert("Candidate created successfully");
      resetForm();
    } catch (error) {
      console.error("Error creating candidate:", error);
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "Error creating candidate. Check console for details.";
      alert(errorMessage);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      position: "",
      category: "",
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
      life_activities: "",
      other_income_sources: [],
      social_links: [],
      photos: null,
      overall_summary: "",
      district: [],
      division: [],
    });
    setArrayInputs({
      designations: "",
      portfolio: "",
      schools: "",
      university: "",
      degree: "",
      business_income: "",
      social_links: "",
      website_or_social: "",
      district: "",
      division: "",
      other_income_sources: "",
      political_career: { year: "", event: "" },
      election_constituency: { actual_place_name: "", election_area_name: "" },
    });
    setCurrentStep(0);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">Create New Candidate</h2>

      {/* Step Indicator */}
      <div className="mb-8">
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
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Dots */}
      <div className="flex justify-between mb-8 overflow-x-auto">
        {steps.map((step, idx) => (
          <div key={idx} className="flex flex-col items-center min-w-max">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                idx === currentStep
                  ? "bg-blue-500 text-white"
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
        ))}
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          {steps[currentStep].component}
        </div>

        {/* Navigation Buttons */}
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
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded font-semibold transition-colors"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateCandidate;
