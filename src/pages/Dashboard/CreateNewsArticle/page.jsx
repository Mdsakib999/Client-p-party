import { useState, useRef } from "react";
import { X, Plus, ImagePlus, Quote, Tag, Eye } from "lucide-react";
import FroalaEditorComponent from "react-froala-wysiwyg";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins.pkgd.min.js";
import { useCreateNewsArticleMutation } from "../../../redux/features/newsArticle/newsArticle.api";
import toast from "react-hot-toast";
import { froalaConfig } from "../../../utils/textEditorConfig";

export default function CreateNewsArticle() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [quote, setQuote] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const fileInputRef = useRef(null);

  const [createNewsArticle, { isLoading }] = useCreateNewsArticleMutation();

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    if (imageFiles.length + files.length > 4) {
      toast.error(
        <p className="text-center font-serif">
          Maximum <span className="font-mono">4</span> images allowed
        </p>
      );
      return;
    }

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
    }));

    setImageFiles((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImageFiles((prev) => {
      const newImages = prev.filter((_, i) => i !== index);
      URL.revokeObjectURL(prev[index].preview);
      return newImages;
    });
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (t) => setTags(tags.filter((tag) => tag !== t));

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const handlePublish = async () => {
    if (!title.trim()) {
      toast.error(<p className="text-center font-serif">Title is required</p>);
      return;
    }

    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("description", description.trim());
    formData.append("quote", quote.trim());
    formData.append("tags", JSON.stringify(tags));

    imageFiles.forEach((img) => {
      formData.append("images", img.file);
    });

    try {
      const res = await createNewsArticle(formData).unwrap();
      toast.success(
        <p className="text-center font-serif">Article created successfully!</p>
      );
      console.log("Server response:", res);

      setTitle("");
      setDescription("");
      imageFiles.forEach((img) => URL.revokeObjectURL(img.preview));
      setImageFiles([]);
      setTags([]);
      setQuote("");
    } catch (err) {
      console.error("Failed to create article:", err);
      toast.error(
        <p className="text-center font-serif">
          {err?.data?.message || err?.message || "Failed to publish article"}
        </p>
      );
    }
  };

  if (isPreview) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <button
            onClick={() => setIsPreview(false)}
            className="mb-6 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            ← Back to Edit
          </button>

          <article className="bg-white rounded-xl shadow-lg overflow-hidden p-8">
            <h1 className="text-4xl font-bold mb-6 text-gray-900">
              {title || "Untitled"}
            </h1>

            {imageFiles.length > 0 && (
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {imageFiles.map((img, index) => (
                  <img
                    key={index}
                    src={img.preview}
                    alt={img.name}
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                  />
                ))}
              </div>
            )}

            {quote && (
              <blockquote className="border-l-4 border-emerald-500 pl-6 py-4 my-6 bg-emerald-50 italic text-gray-700 text-lg rounded-r">
                "{quote}"
              </blockquote>
            )}

            <div
              className="prose prose-lg max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: description }}
            />

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Create News Article
            </h1>
            <div className="flex gap-3">
              <button
                onClick={() => setIsPreview(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Eye className="w-4 h-4" /> Preview
              </button>
              <button
                disabled={isLoading}
                onClick={handlePublish}
                className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? "Publishing..." : "Publish"}
              </button>
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your title..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
            />
          </div>

          <div className="mb-8">
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Upload Images{" "}
              <span className="text-gray-500 text-xs font-normal">(Max 4)</span>
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              multiple
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={imageFiles.length >= 4}
              className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ImagePlus className="w-5 h-5 text-gray-500" />
              <span className="text-gray-600">
                {imageFiles.length >= 4
                  ? "Maximum images reached"
                  : "Upload Images"}
              </span>
            </button>

            {imageFiles.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {imageFiles.map((img, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={img.preview}
                      alt={img.name}
                      className="w-full h-32 object-cover rounded-lg shadow-sm"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-white text-xs p-2 rounded-b-lg truncate">
                      {img.name}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mb-8">
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Description
              <span className="text-gray-500 text-xs font-normal ml-2">
                (You can insert images directly in the editor)
              </span>
            </label>
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <FroalaEditorComponent
                tag="textarea"
                model={description}
                onModelChange={(content) => setDescription(content)}
                config={froalaConfig}
              />
            </div>
          </div>

          <div className="mb-8">
            <label className="flex items-center gap-2 text-sm font-semibold mb-2 text-gray-700">
              <Quote className="w-4 h-4" /> Special Quote
            </label>
            <textarea
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              placeholder="Add a special quote or highlight..."
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none outline-none transition-all"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold mb-2 text-gray-700">
              <Tag className="w-4 h-4" /> Tags
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyUp={handleKeyPress}
                placeholder="Add a tag..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              />
              <button
                onClick={addTag}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium"
                  >
                    #{tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="hover:bg-emerald-200 rounded-full p-0.5 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
