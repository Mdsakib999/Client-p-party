const DetailsAndPortfolio = ({
  formData,
  arrayInputs,
  handleArrayInputChange,
  addArrayItem,
  removeArrayItem,
  addPortfolioItem,
  handleNestedArrayInput,
  addElectionConstituency,
  removeElectionConstituency,
}) => {
  return (
    <div className="space-y-6">
      {/* Portfolio */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Portfolio</h3>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="Add portfolio item"
            value={arrayInputs.portfolio}
            onChange={(e) =>
              handleArrayInputChange("portfolio", e.target.value)
            }
            className="flex-1 p-2 border rounded"
          />
          <button
            type="button"
            onClick={addPortfolioItem}
            className="bg-blue-500 text-white px-3 py-2 rounded"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.portfolio.map((item, idx) => (
            <span
              key={idx}
              className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded flex items-center gap-2 text-sm"
            >
              {item}
              <button
                type="button"
                onClick={() => removeArrayItem("portfolio", idx)}
                className="text-red-600 font-bold"
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Designations */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Designations</h3>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="Add designation"
            value={arrayInputs.designations}
            onChange={(e) =>
              handleArrayInputChange("designations", e.target.value)
            }
            className="flex-1 p-2 border rounded"
          />
          <button
            type="button"
            onClick={() => addArrayItem("designations")}
            className="bg-blue-500 text-white px-3 py-2 rounded"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.designations.map((item, idx) => (
            <span
              key={idx}
              className="bg-orange-100 text-orange-800 px-2 py-1 rounded flex items-center gap-2 text-sm"
            >
              {item}
              <button
                type="button"
                onClick={() => removeArrayItem("designations", idx)}
                className="text-red-600 font-bold"
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Election Constituencies */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Election Constituencies</h3>
        <div className="grid grid-cols-2 gap-2 mb-2">
          <input
            type="text"
            placeholder="Place Name"
            value={arrayInputs.election_constituency.actual_place_name}
            onChange={(e) =>
              handleNestedArrayInput(
                "election_constituency",
                "actual_place_name",
                e.target.value
              )
            }
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Area Name"
            value={arrayInputs.election_constituency.election_area_name}
            onChange={(e) =>
              handleNestedArrayInput(
                "election_constituency",
                "election_area_name",
                e.target.value
              )
            }
            className="p-2 border rounded"
          />
        </div>
        <button
          type="button"
          onClick={addElectionConstituency}
          className="bg-blue-500 text-white px-3 py-2 rounded mb-2"
        >
          Add
        </button>
        <div className="space-y-2">
          {formData.election_constituencies.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border rounded p-2 flex justify-between items-center"
            >
              <span className="text-sm">
                {item.actual_place_name} - {item.election_area_name}
              </span>
              <button
                type="button"
                onClick={() => removeElectionConstituency(idx)}
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

export default DetailsAndPortfolio;
