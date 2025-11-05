const CreateCandidate = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Create New Candidate</h2>
      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Position</label>
            <input
              type="text"
              name="position"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Role Category
            </label>
            <input
              type="text"
              name="roleCategory"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Election Constituency
            </label>
            <input
              type="text"
              name="electionConstituency"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Birth Date
            </label>
            <input
              type="date"
              name="birthDate"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Birth Place
            </label>
            <input
              type="text"
              name="birthPlace"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Nationality
            </label>
            <input
              type="text"
              name="nationality"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Marital Status
            </label>
            <input
              type="text"
              name="maritalStatus"
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">
            Overall Summary
          </label>
          <textarea
            name="overallSummary"
            className="w-full p-2 border rounded"
            rows="4"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Candidate
        </button>
      </form>
    </div>
  );
};

export default CreateCandidate;
