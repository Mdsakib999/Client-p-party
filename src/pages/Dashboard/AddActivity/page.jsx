import { useState } from "react";
import { useForm } from "react-hook-form";
import { X, Upload } from "lucide-react";
import toast from "react-hot-toast";
import { useAddActivityMutation } from "../../../redux/features/activity/activity.api";

export default function AddActivity() {
    const [imagePreview, setImagePreview] = useState(null);
    const [addActivity, { isLoading }] = useAddActivityMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            title: "",
            category: "",
            content: "",
            videoLink: "",
        },
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setImagePreview({
                file,
                preview: URL.createObjectURL(file),
                name: file.name,
            });
        }
        e.target.value = "";
    };

    const removeImage = () => {
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview.preview);
            setImagePreview(null);
        }
    };

    const resetForm = () => {
        reset();
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview.preview);
        }
        setImagePreview(null);
    };

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();

            formData.append("title", data.title);
            formData.append("category", data.category);
            formData.append("content", data.content);

            if (data.videoLink) {
                formData.append("videoLink", data.videoLink);
            }

            if (imagePreview) {
                formData.append("image", imagePreview.file);
            }

            const result = await addActivity(formData).unwrap();

            if (result.success) {
                toast.success(
                    <p className="text-center font-serif">Added activity successfully</p>
                );
                resetForm();
            }
        } catch (err) {
            toast.error(
                <p className="text-center font-serif">{err?.data?.message}</p>
            );
            console.error("Failed to create activity:", err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">
                        Add New Activity
                    </h1>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
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
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.title.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="category"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
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
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.category.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Featured Image
                            </label>

                            <div className="mt-2">
                                <label
                                    htmlFor="image-upload"
                                    className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-emerald-500 hover:bg-emerald-50 transition"
                                >
                                    <div className="text-center">
                                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                        <p className="mt-2 text-sm text-gray-600">
                                            Click to upload image
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            PNG, JPG, GIF up to 5MB
                                        </p>
                                    </div>
                                    <input
                                        id="image-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </label>
                            </div>

                            {imagePreview && (
                                <div className="mt-4">
                                    <div className="relative inline-block">
                                        <div className="w-48 h-48 rounded-lg overflow-hidden border-2 border-gray-200">
                                            <img
                                                src={imagePreview.preview}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600 transition"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                        <p className="mt-1 text-xs text-gray-500 truncate max-w-[192px]">
                                            {imagePreview.name}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="content"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
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
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.content.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="videoLink"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Video Link
                            </label>
                            <input
                                type="url"
                                id="videoLink"
                                {...register("videoLink", {
                                    pattern: {
                                        value:
                                            /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*(\?.*)?$/,
                                        message: "Please enter a valid URL",
                                    },
                                })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                placeholder="https://youtube.com..."
                            />
                            {errors.videoLink && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.videoLink.message}
                                </p>
                            )}
                        </div>

                        <div className="flex gap-4">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex-1 bg-emerald-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
                            >
                                {isLoading ? "Creating..." : "Create Activity"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}