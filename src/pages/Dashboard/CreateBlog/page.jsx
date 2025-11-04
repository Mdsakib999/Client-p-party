const CreateBlog = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Create New Blog/Article</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input type="text" className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">Content</label>
          <textarea
            className="w-full p-2 border rounded"
            rows="10"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Publish
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
