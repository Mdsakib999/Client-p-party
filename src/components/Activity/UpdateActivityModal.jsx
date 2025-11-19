import { useState } from "react";
import { useUpdateActivityMutation } from "../../redux/features/activity/activity.api";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Trash2, Upload, X } from "lucide-react";

export default function UpdateActivityModal({ activity, onClose }) {
    const [imagePreview, setImagePreview] = useState(activity?.featuredImage?.url || null);
    const [newImage, setNewImage] = useState(null);
    const [removeExistingImage, setRemoveExistingImage] = useState(false);
    const [updateActivity, { isLoading }] = useUpdateActivityMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: activity?.title || "",
            category: activity?.category || "",
            content: activity?.content || "",
            videoLink: activity?.videoLink || "",
        },
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewImage(file);
            setImagePreview(URL.createObjectURL(file));
            setRemoveExistingImage(true);
        }
        e.target.value = "";
    };

    const handleRemoveImage = () => {
        if (newImage && imagePreview) {
            URL.revokeObjectURL(imagePreview);
        }
        setImagePreview(null);
        setNewImage(null);
        setRemoveExistingImage(true);
    };

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("category", data.category);
            formData.append("content", data.content);
            formData.append("videoLink", data.videoLink);

            if (newImage) {
                formData.append("image", newImage);
            } else if (removeExistingImage) {
                formData.append("removeImage", "true");
            }

            await updateActivity({ id: activity._id, formData }).unwrap();
            toast.success(<p className="text-center font-serif">Activity updated successfully</p>);
            onClose();
        } catch (err) {
            toast.error(<p className="text-center font-serif">{err?.data?.message || "Failed to update activity"}</p>);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="sticky z-50 top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-gray-900">Update Activity</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                            Title *
                        </label>
                        <input
                            type="text"
                            id="title"
                            {...register("title", { required: "Title is required" })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                            placeholder="Enter activity title"
                        />
                        {errors.title && (
                            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                            Category *
                        </label>
                        <input
                            type="text"
                            id="category"
                            {...register("category", { required: "Category is required" })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            placeholder="Enter activity category"
                        />
                        {errors.category && (
                            <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                        )}
                    </div>

                    {/* Featured Image */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Featured Image
                        </label>

                        {imagePreview ? (
                            <div className="relative inline-block">
                                <div className="w-full h-48 rounded-lg overflow-hidden border-2 border-gray-200">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2 shadow-lg hover:bg-red-600 transition"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        ) : (
                            <label
                                htmlFor="image-upload"
                                className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-emerald-500 hover:bg-emerald-50 transition"
                            >
                                <div className="text-center">
                                    <Upload className="mx-auto h-10 w-10 text-gray-400" />
                                    <p className="mt-2 text-sm text-gray-600">Click to upload new image</p>
                                    <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 5MB</p>
                                </div>
                                <input
                                    id="image-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>
                        )}
                    </div>

                    {/* Content */}
                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                            Content *
                        </label>
                        <textarea
                            id="content"
                            rows={6}
                            {...register("content", { required: "Content is required" })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                            placeholder="Enter activity content"
                        />
                        {errors.content && (
                            <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="videoLink" className="block text-sm font-medium text-gray-700 mb-2">
                            Video Link
                        </label>
                        <input
                            type="url"
                            id="videoLink"
                            {...register("videoLink", {
                                pattern: {
                                    value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*(\?.*)?$/,
                                    message: "Please enter a valid URL",
                                },
                            })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            placeholder="https://youtube.com..."
                        />
                        {errors.videoLink && (
                            <p className="mt-1 text-sm text-red-600">{errors.videoLink.message}</p>
                        )}
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 p-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 bg-emerald-500 text-white p-2 rounded-lg font-medium hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                            {isLoading ? "Updating..." : "Update Activity"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

