import { useState } from "react";
import { Pencil, Trash } from "lucide-react";
import {
  useGetAllNewsArticlesQuery,
  useDeleteNewsArticleMutation,
} from "../../../redux/features/newsArticle/newsArticle.api";
import BNPLoader from "../../../utils/BNPLoader";
import EditNewsArticleModal from "./EditNewsArticleModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import toast from "react-hot-toast";

export default function BlogTable() {
  const { data: newsArticles, isLoading } = useGetAllNewsArticlesQuery();
  const [deleteNewsArticle, { isLoading: isDeleting }] =
    useDeleteNewsArticleMutation();

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  if (isLoading) return <BNPLoader />;

  const blogs = newsArticles?.data || [];

  const handleEdit = (blog) => {
    setSelectedArticle(blog);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (blog) => {
    setSelectedArticle(blog);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedArticle) return;

    try {
      const res = await deleteNewsArticle(selectedArticle._id).unwrap();

      if (res.success) {
        toast.success(
          <p className="text-center font-serif">
            Article deleted successfully!
          </p>
        );
        setDeleteModalOpen(false);
        setSelectedArticle(null);
      }
    } catch (err) {
      console.error("Failed to delete article:", err);
      toast.error(
        <p className="text-center font-serif">
          {err?.data?.message || err?.message || "Failed to delete article"}
        </p>
      );
    }
  };

  return (
    <>
      <div className="overflow-x-auto p-4">
        <table className="min-w-full border bg-white border-gray-200 text-sm shadow-lg rounded-xl overflow-hidden">
          <thead className="bg-gradient-to-r from-emerald-50 to-emerald-100">
            <tr>
              <th className="p-4 text-left font-semibold text-gray-700">
                Image
              </th>
              <th className="p-4 text-left font-semibold text-gray-700">
                Title
              </th>
              <th className="p-4 text-left font-semibold text-gray-700">
                Tags
              </th>
              <th className="p-4 text-left font-semibold text-gray-700">
                Date
              </th>
              <th className="p-4 text-right font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-500">
                  No articles found
                </td>
              </tr>
            ) : (
              blogs.map((blog) => (
                <tr
                  key={blog._id}
                  className="border-b border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3">
                    <img
                      src={blog?.images?.[0]?.url}
                      alt={blog.title}
                      className="w-16 h-16 rounded-lg object-cover shadow-md shadow-gray-500"
                    />
                  </td>

                  <td className="p-3 font-medium text-gray-900 max-w-xs truncate">
                    {blog.title.slice(0, 50)}
                    {blog.title.length > 50 ? "..." : ""}
                  </td>

                  <td className="p-3">
                    {blog.tags && blog.tags.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {blog.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="font-semibold px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>

                  <td className="p-3 text-gray-600 whitespace-nowrap">
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>

                  <td className="p-3 text-right">
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => handleEdit(blog)}
                        className="cursor-pointer p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors shadow-sm"
                        title="Edit article"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() => handleDeleteClick(blog)}
                        className="cursor-pointer p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors shadow-sm"
                        title="Delete article"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <EditNewsArticleModal
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedArticle(null);
        }}
        article={selectedArticle}
      />

      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedArticle(null);
        }}
        onConfirm={handleDeleteConfirm}
        title={selectedArticle?.title}
        isLoading={isDeleting}
      />
    </>
  );
}
