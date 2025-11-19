import toast from "react-hot-toast";
import { useDeleteActivityMutation } from "../../redux/features/activity/activity.api";
import DeleteConfirmModal from "./DeleteConfirmModal";
import UpdateActivityModal from "./UpdateActivityModal";
import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";

export default function ActivityTable({ activities }) {
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [deleteActivity, { isLoading: isDeleting }] = useDeleteActivityMutation();

    const handleDelete = async () => {
        try {
            await deleteActivity(deleteId).unwrap();
            toast.success(<p className="text-center font-serif">Activity deleted successfully</p>);
            setDeleteId(null);
        } catch (err) {
            toast.error(<p className="text-center font-serif">{err?.data?.message || "Delete failed"}</p>);
        }
    };

    return (
        <div className="w-full p-4">
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Title
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Category
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Created At
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {activities?.map((item) => (
                                <tr key={item._id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            {item.featuredImage?.url && (
                                                <img
                                                    src={item.featuredImage.url}
                                                    alt={item.title}
                                                    className="h-10 w-10 rounded object-cover mr-3"
                                                />
                                            )}
                                            <div className="text-sm font-medium text-gray-900">{item.title}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            onClick={() => setSelectedActivity(item)}
                                            className="cursor-pointer text-blue-600 hover:text-blue-900 mr-4 transition"
                                        >
                                            <Edit className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => setDeleteId(item._id)}
                                            className="cursor-pointer text-red-600 hover:text-red-900 transition"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedActivity && (
                <UpdateActivityModal
                    activity={selectedActivity}
                    onClose={() => setSelectedActivity(null)}
                />
            )}

            {deleteId && (
                <DeleteConfirmModal
                    onConfirm={handleDelete}
                    onCancel={() => setDeleteId(null)}
                    isLoading={isDeleting}
                />
            )}
        </div>
    );
}