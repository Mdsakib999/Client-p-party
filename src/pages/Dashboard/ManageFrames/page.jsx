import { useState, useRef } from "react";
import { Upload, Trash2, Plus, Image as ImageIcon, Edit, X } from "lucide-react";
import {
    useGetPhotoFramesQuery,
    useAddPhotoFrameMutation,
    useDeletePhotoFrameMutation,
    useUpdatePhotoFrameMutation,
} from "../../../redux/features/photoFrame/photoFrame.api";
import toast from "react-hot-toast";

const divisions = [
    "Dhaka",
    "Chattogram",
    "Barishal",
    "Khulna",
    "Mymensingh",
    "Rajshahi",
    "Rangpur",
    "Sylhet",
];

const ManageFrames = () => {
    const [selectedDivision, setSelectedDivision] = useState("Dhaka");
    const fileInputRef = useRef(null);
    const editFileInputRef = useRef(null);
    const [editingFrame, setEditingFrame] = useState(null);

    const { data: framesData, isLoading } = useGetPhotoFramesQuery();
    const [addPhotoFrame, { isLoading: isUploading }] = useAddPhotoFrameMutation();
    const [deletePhotoFrame] = useDeletePhotoFrameMutation();
    const [updatePhotoFrame, { isLoading: isUpdating }] = useUpdatePhotoFrameMutation();

    const frames = framesData?.data || [];
    console.log("frames", framesData)

    const handleFrameUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Please upload an image file");
            return;
        }

        const formData = new FormData();
        formData.append("frame", file);
        formData.append("division", selectedDivision);

        try {
            await addPhotoFrame(formData).unwrap();
            toast.success("Frame added successfully!");
            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (err) {
            console.error("Failed to add frame:", err);
            toast.error("Failed to add frame");
        }
    };

    const handleDeleteFrame = async (id) => {
        if (window.confirm("Are you sure you want to delete this frame?")) {
            try {
                await deletePhotoFrame(id).unwrap();
                toast.success("Frame deleted successfully");
            } catch (err) {
                console.error("Failed to delete frame:", err);
                toast.error("Failed to delete frame");
            }
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("division", editingFrame.division);

        if (editFileInputRef.current?.files[0]) {
            formData.append("frame", editFileInputRef.current.files[0]);
        }

        try {
            await updatePhotoFrame({ id: editingFrame._id, data: formData }).unwrap();
            toast.success("Frame updated successfully");
            setEditingFrame(null);
        } catch (err) {
            console.error("Failed to update frame:", err);
            toast.error("Failed to update frame");
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-6 min-h-[calc(100vh-120px)]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <ImageIcon className="text-emerald-600" />
                        Manage Photo Frames
                    </h1>
                    <p className="text-gray-500 mt-1">Upload and manage frames for all divisions</p>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                    {/* Upload Section */}
                    <div className="flex gap-2">
                        <select
                            value={selectedDivision}
                            onChange={(e) => setSelectedDivision(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                        >
                            {divisions.map((div) => (
                                <option key={div} value={div}>
                                    {div}
                                </option>
                            ))}
                        </select>
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploading}
                            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                        >
                            {isUploading ? (
                                "Uploading..."
                            ) : (
                                <>
                                    <Plus size={18} />
                                    Upload Frame
                                </>
                            )}
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFrameUpload}
                            className="hidden"
                        />
                    </div>
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <p className="text-gray-500">Loading frames...</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-left border-b border-gray-200">
                                <th className="p-4 font-semibold text-gray-600">Preview</th>
                                <th className="p-4 font-semibold text-gray-600">Division</th>
                                <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {frames.length > 0 ? (
                                frames.map((frame) => (
                                    <tr key={frame._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="p-4">
                                            <div className="h-16 w-12 bg-gray-100 rounded overflow-hidden border border-gray-200">
                                                <img
                                                    src={frame.url}
                                                    alt="Frame"
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                                                {frame.division}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => setEditingFrame(frame)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteFrame(frame._id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="p-8 text-center text-gray-500">
                                        No frames found. Upload one to get started.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Edit Modal */}
            {editingFrame && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-800">Edit Frame</h2>
                            <button
                                onClick={() => setEditingFrame(null)}
                                className="p-1 hover:bg-gray-100 rounded-full"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Division</label>
                                <select
                                    value={editingFrame.division}
                                    onChange={(e) => setEditingFrame({ ...editingFrame, division: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                >
                                    {divisions.map((div) => (
                                        <option key={div} value={div}>
                                            {div}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Replace Image (Optional)</label>
                                <input
                                    ref={editFileInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                />
                                <p className="text-xs text-gray-500 mt-1">Leave empty to keep current image</p>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setEditingFrame(null)}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isUpdating}
                                    className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium disabled:opacity-50"
                                >
                                    {isUpdating ? "Updating..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageFrames;
