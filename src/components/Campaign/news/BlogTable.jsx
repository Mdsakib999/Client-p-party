import { Pencil, Trash } from "lucide-react";
import { useGetAllNewsArticlesQuery } from "../../../redux/features/newsArticle/newsArticle.api";
import BNPLoader from "../../../utils/BNPLoader";

export default function BlogTable() {
  const { data: newsArticles, isLoading } = useGetAllNewsArticlesQuery();

  if (isLoading) return <BNPLoader />;
  const blogs = newsArticles?.data || [];

  const handleEdit = (blog) => {
    // Handle edit action
  };

  const handleDelete = (blogId) => {
    // Handle delete action
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog._id} className="border-t hover:bg-gray-50">
              <td className="p-3">{blog.title}</td>
              <td className="p-3">{blog.category?.name || "—"}</td>
              <td className="p-3">
                {new Date(blog.createdAt).toLocaleDateString("en-US")}
              </td>
              <td className="p-3 text-right">
                <button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleEdit(blog)}
                  className="text-blue-600"
                >
                  <Pencil size={16} />
                </button>
                <button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDelete(blog._id)}
                  className="text-red-600"
                >
                  <Trash size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
