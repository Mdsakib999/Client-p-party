import { useState, useRef } from "react";
import { Upload, Trash2, Plus, Image as ImageIcon, Edit, X, Filter, Loader2 } from "lucide-react";
import {
    useGetPhotoFramesQuery,
    useAddPhotoFrameMutation,
    useDeletePhotoFrameMutation,
    useUpdatePhotoFrameMutation,
} from "../../../redux/features/photoFrame/photoFrame.api";
import toast from "react-hot-toast";
import areasData from "../../../data/areas.json";

const ManageFrames = () => {
    // Filter State
    const [filterDivision, setFilterDivision] = useState("All");

    // Upload State
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [uploadData, setUploadData] = useState({
        division: "",
        district: "",
        constituency: "",
        file: null,
    });
    const [previewUrl, setPreviewUrl] = useState(null);
    const uploadFileInputRef = useRef(null);

    // Edit State
    const [editingFrame, setEditingFrame] = useState(null);
    const [editData, setEditData] = useState({
        division: "",
        district: "",
        constituency: "",
        file: null,
    });
    const [editPreviewUrl, setEditPreviewUrl] = useState(null);
    const editFileInputRef = useRef(null);

    // Delete State
    const [deletingId, setDeletingId] = useState(null);

    // RTK Query
    const { data: framesData, isLoading } = useGetPhotoFramesQuery({
        division: filterDivision === "All" ? undefined : filterDivision,
    });
    const [addPhotoFrame, { isLoading: isUploading }] = useAddPhotoFrameMutation();
    const [deletePhotoFrame] = useDeletePhotoFrameMutation();
    const [updatePhotoFrame, { isLoading: isUpdating }] = useUpdatePhotoFrameMutation();

    const frames = framesData?.data || [];
    const divisions = Object.keys(areasData);

    // Helper to get districts based on division
    const getDistricts = (division) => {
        return division && areasData[division] ? Object.keys(areasData[division]) : [];
    };

    // Helper to get constituencies based on division and district
    const getConstituencies = (division, district) => {
        return division && district && areasData[division]?.[district]
            ? areasData[division][district]
            : [];
    };

    // --- Upload Handlers ---
    const handleUploadFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                toast.error("Please upload an image file");
                return;
            }
            setUploadData({ ...uploadData, file });
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                toast.error("Please upload an image file");
                return;
            }
            setUploadData({ ...uploadData, file });
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleUploadSubmit = async (e) => {
        e.preventDefault();
        if (!uploadData.division || !uploadData.district || !uploadData.constituency || !uploadData.file) {
            toast.error("Please fill in all fields and upload an image");
            return;
        }

        const formData = new FormData();
        formData.append("frame", uploadData.file);
        formData.append("division", uploadData.division);
        formData.append("district", uploadData.district);
        formData.append("constituency", uploadData.constituency);

        try {
            await addPhotoFrame(formData).unwrap();
            toast.success("Frame added successfully!");
            setIsUploadModalOpen(false);
            setUploadData({ division: "", district: "", constituency: "", file: null });
            setPreviewUrl(null);
        } catch (err) {
            console.error("Failed to add frame:", err);
            toast.error("Failed to add frame");
        }
    };

    // --- Edit Handlers ---
    const openEditModal = (frame) => {
        setEditingFrame(frame);
        setEditData({
            division: frame.division,
            district: frame.district,
            constituency: frame.constituency,
            file: null,
        });
        setEditPreviewUrl(frame.url);
    };

    const handleEditFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                toast.error("Please upload an image file");
                return;
            }
            setEditData({ ...editData, file });
            setEditPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleEditDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                toast.error("Please upload an image file");
                return;
            }
            setEditData({ ...editData, file });
            setEditPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("division", editData.division);
        formData.append("district", editData.district);
        formData.append("constituency", editData.constituency);

        if (editData.file) {
            formData.append("frame", editData.file);
        }

        try {
            await updatePhotoFrame({ id: editingFrame._id, data: formData }).unwrap();
            toast.success("Frame updated successfully");
            setEditingFrame(null);
            setEditPreviewUrl(null);
        } catch (err) {
            console.error("Failed to update frame:", err);
            toast.error("Failed to update frame");
        }
    };

    const handleDeleteFrame = async (id) => {
        if (window.confirm("Are you sure you want to delete this frame?")) {
            setDeletingId(id);
            try {
                await deletePhotoFrame(id).unwrap();
                toast.success("Frame deleted successfully");
            } catch (err) {
                console.error("Failed to delete frame:", err);
                toast.error("Failed to delete frame");
            } finally {
                setDeletingId(null);
            }
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
                    <p className="text-gray-500 mt-1">Upload and manage frames with detailed location targeting</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    {/* Filter */}
                    <div className="relative">
                        <Filter className="absolute left-3 top-2.5 text-gray-400" size={18} />
                        <select
                            value={filterDivision}
                            onChange={(e) => setFilterDivision(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white w-full sm:w-48 appearance-none"
                        >
                            <option value="All">All Divisions</option>
                            {divisions.map((div) => (
                                <option key={div} value={div}>
                                    {div}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        onClick={() => setIsUploadModalOpen(true)}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                        <Plus size={18} />
                        Upload Frame
                    </button>
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="animate-spin text-emerald-600" size={32} />
                    <p className="ml-2 text-gray-500">Loading frames...</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-left border-b border-gray-200">
                                <th className="p-4 font-semibold text-gray-600">Preview</th>
                                <th className="p-4 font-semibold text-gray-600">Division</th>
                                <th className="p-4 font-semibold text-gray-600">District</th>
                                <th className="p-4 font-semibold text-gray-600">Constituency</th>
                                <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {frames.length > 0 ? (
                                frames.map((frame) => (
                                    <tr key={frame._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="p-4">
                                            <div className="h-20 w-16 bg-gray-100 rounded overflow-hidden border border-gray-200">
                                                <img
                                                    src={frame.url}
                                                    alt="Frame"
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex flex-col gap-1">
                                                <span className="font-medium text-gray-800">{frame.division}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex flex-col gap-1">
                                                <span className="font-medium text-gray-800">{frame.district}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex flex-col gap-1">
                                                <span className="font-medium text-gray-800">{frame.constituency}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => openEditModal(frame)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Edit"
                                                    disabled={deletingId === frame._id}
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteFrame(frame._id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                                    title="Delete"
                                                    disabled={deletingId === frame._id}
                                                >
                                                    {deletingId === frame._id ? (
                                                        <Loader2 className="animate-spin" size={18} />
                                                    ) : (
                                                        <Trash2 size={18} />
                                                    )}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-gray-500">
                                        No frames found. {filterDivision !== "All" ? "Try changing the filter or upload a new one." : "Upload one to get started."}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
            {/* ... (modals - no change) */}

            {/* Upload Modal */}
            {isUploadModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full p-6 animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-800">Upload New Frame</h2>
                            <button
                                onClick={() => setIsUploadModalOpen(false)}
                                className="p-1 hover:bg-gray-100 rounded-full"
                                disabled={isUploading}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleUploadSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Division</label>
                                    <select
                                        value={uploadData.division}
                                        onChange={(e) => {
                                            setUploadData({ ...uploadData, division: e.target.value, district: "", constituency: "" });
                                        }}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        required
                                        disabled={isUploading}
                                    >
                                        <option value="">Select Division</option>
                                        {divisions.map((div) => (
                                            <option key={div} value={div}>{div}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                                    <select
                                        value={uploadData.district}
                                        onChange={(e) => {
                                            setUploadData({ ...uploadData, district: e.target.value, constituency: "" });
                                        }}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        disabled={!uploadData.division || isUploading}
                                        required
                                    >
                                        <option value="">Select District</option>
                                        {getDistricts(uploadData.division).map((dist) => (
                                            <option key={dist} value={dist}>{dist}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Constituency</label>
                                    <select
                                        value={uploadData.constituency}
                                        onChange={(e) => setUploadData({ ...uploadData, constituency: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        disabled={!uploadData.district || isUploading}
                                        required
                                    >
                                        <option value="">Select Constituency</option>
                                        {getConstituencies(uploadData.division, uploadData.district).map((constituency) => (
                                            <option key={constituency} value={constituency}>{constituency}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div
                                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${uploadData.file ? "border-emerald-500 bg-emerald-50" : "border-gray-300 hover:border-emerald-500"
                                    } ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
                                onDragOver={(e) => !isUploading && e.preventDefault()}
                                onDrop={!isUploading ? handleDrop : undefined}
                            >
                                {previewUrl ? (
                                    <div className="relative inline-block">
                                        <img src={previewUrl} alt="Preview" className="max-h-48 rounded shadow-sm" />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setUploadData({ ...uploadData, file: null });
                                                setPreviewUrl(null);
                                                if (uploadFileInputRef.current) uploadFileInputRef.current.value = "";
                                            }}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow hover:bg-red-600"
                                            disabled={isUploading}
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ) : (
                                    <div onClick={() => !isUploading && uploadFileInputRef.current?.click()} className={!isUploading ? "cursor-pointer" : ""}>
                                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                        <p className="mt-2 text-sm text-gray-600">
                                            Click to upload or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    ref={uploadFileInputRef}
                                    onChange={handleUploadFileChange}
                                    accept="image/*"
                                    className="hidden"
                                    disabled={isUploading}
                                />
                            </div>

                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsUploadModalOpen(false)}
                                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                    disabled={isUploading}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isUploading || !uploadData.file || !uploadData.constituency}
                                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isUploading ? (
                                        <>
                                            <Loader2 className="animate-spin" size={18} />
                                            Uploading...
                                        </>
                                    ) : (
                                        "Upload Frame"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {editingFrame && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full p-6 animate-in fade-in zoom-in duration-200  max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-800">Edit Frame</h2>
                            <button
                                onClick={() => setEditingFrame(null)}
                                className="p-1 hover:bg-gray-100 rounded-full"
                                disabled={isUpdating}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleEditSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Division</label>
                                    <select
                                        value={editData.division}
                                        onChange={(e) => {
                                            setEditData({ ...editData, division: e.target.value, district: "", constituency: "" });
                                        }}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        required
                                        disabled={isUpdating}
                                    >
                                        <option value="">Select Division</option>
                                        {divisions.map((div) => (
                                            <option key={div} value={div}>{div}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                                    <select
                                        value={editData.district}
                                        onChange={(e) => {
                                            setEditData({ ...editData, district: e.target.value, constituency: "" });
                                        }}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        disabled={!editData.division || isUpdating}
                                        required
                                    >
                                        <option value="">Select District</option>
                                        {getDistricts(editData.division).map((dist) => (
                                            <option key={dist} value={dist}>{dist}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Constituency</label>
                                    <select
                                        value={editData.constituency}
                                        onChange={(e) => setEditData({ ...editData, constituency: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        disabled={!editData.district || isUpdating}
                                        required
                                    >
                                        <option value="">Select Constituency</option>
                                        {getConstituencies(editData.division, editData.district).map((constituency) => (
                                            <option key={constituency} value={constituency}>{constituency}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Frame Image</label>
                                <div
                                    className={`border border-gray-200 rounded-lg p-4 bg-gray-50 flex flex-col items-center ${isUpdating ? "opacity-50 cursor-not-allowed" : ""}`}
                                    onDragOver={(e) => !isUpdating && e.preventDefault()}
                                    onDrop={!isUpdating ? handleEditDrop : undefined}
                                >
                                    {editPreviewUrl ? (
                                        <div className="relative">
                                            <img src={editPreviewUrl} alt="Preview" className="max-h-48 rounded shadow-sm" />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setEditData({ ...editData, file: null });
                                                    setEditPreviewUrl(null);
                                                    if (editFileInputRef.current) editFileInputRef.current.value = "";
                                                }}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow hover:bg-red-600"
                                                disabled={isUpdating}
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ) : (
                                        <div onClick={() => !isUpdating && editFileInputRef.current?.click()} className={`cursor-pointer text-center p-4 ${isUpdating ? "cursor-not-allowed" : ""}`}>
                                            <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                                            <p className="text-sm text-gray-500">Click or drag to upload replacement image</p>
                                        </div>
                                    )}
                                    <input
                                        ref={editFileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleEditFileChange}
                                        className="hidden"
                                        disabled={isUpdating}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setEditingFrame(null)}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                                    disabled={isUpdating}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isUpdating}
                                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isUpdating ? (
                                        <>
                                            <Loader2 className="animate-spin" size={18} />
                                            Updating...
                                        </>
                                    ) : (
                                        "Save Changes"
                                    )}
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
