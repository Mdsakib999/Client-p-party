import { useState, useRef } from "react";
import { X, Plus, ImagePlus, Quote, Tag, Eye } from "lucide-react";
import FroalaEditorComponent from "react-froala-wysiwyg";
import { useCreateNewsArticleMutation } from "../../../redux/features/newsArticle/newsArticle.api";

export default function CreateNewsArticle() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [quote, setQuote] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const fileInputRef = useRef(null);

  const [createNewsArticle, { isLoading }] = useCreateNewsArticleMutation();

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const uploaded = await Promise.all(
      files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "your_preset");
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
          { method: "POST", body: formData }
        );
        const data = await res.json();
        return { url: data.secure_url, name: file.name };
      })
    );
    setImages((prev) => [...prev, ...uploaded]);
  };

  const removeImage = (url) => {
    setImages(images.filter((img) => img.url !== url));
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
    const payload = { title, description, images, quote, tags };
    try {
      const res = await createNewsArticle(payload).unwrap();
      alert("✅ Article created successfully!");
      console.log("Server response:", res);
      setTitle("");
      setDescription("");
      setImages([]);
      setTags([]);
      setQuote("");
    } catch (err) {
      console.error("Failed to create article:", err);
      alert("❌ Failed to publish article.");
    }
  };

  // ✅ Preview Mode
  if (isPreview) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <button
            onClick={() => setIsPreview(false)}
            className="mb-6 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
          >
            ← Back to Edit
          </button>

          <article className="bg-white rounded-xl shadow-lg overflow-hidden p-8">
            <h1 className="text-4xl font-bold mb-6">{title || "Untitled"}</h1>

            {images.length > 0 && (
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {images.map((img) => (
                  <img
                    key={img.url}
                    src={img.url}
                    alt={img.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                ))}
              </div>
            )}

            {quote && (
              <blockquote className="border-l-4 border-emerald-500 pl-6 py-4 my-6 bg-emerald-50 italic text-gray-700 text-lg">
                "{quote}"
              </blockquote>
            )}

            <div
              className="prose prose-lg max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: description }}
            />

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-4 border-t">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
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

  // ✅ Edit Mode
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Create News Article
            </h1>
            <div className="flex gap-3">
              <button
                onClick={() => setIsPreview(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                <Eye className="w-4 h-4" /> Preview
              </button>
              <button
                disabled={isLoading}
                onClick={handlePublish}
                className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium disabled:opacity-60"
              >
                {isLoading ? "Publishing..." : "Publish"}
              </button>
            </div>
          </div>

          {/* Title */}
          <div className="mb-8">
            <label className="block text-sm font-semibold mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your title..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Images */}
          <div className="mb-8">
            <label className="block text-sm font-semibold mb-2">Images</label>
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
              className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 w-full justify-center"
            >
              <ImagePlus className="w-5 h-5 text-gray-500" />
              <span className="text-gray-600">Upload Images</span>
            </button>

            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {images.map((img) => (
                  <div key={img.url} className="relative group">
                    <img
                      src={img.url}
                      alt={img.name}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removeImage(img.url)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Froala Editor */}
          <div className="mb-8">
            <label className="block text-sm font-semibold mb-2">
              Description
            </label>
            <div className="border rounded-lg">
              <FroalaEditorComponent
                tag="textarea"
                model={description}
                onModelChange={(content) => setDescription(content)}
                config={{
                  theme: "gray",
                  placeholderText: "Write something amazing...",
                  charCounterCount: false,
                  quickInsertTags: [""],
                  heightMin: 250,
                }}
              />
            </div>
          </div>

          {/* Quote */}
          <div className="mb-8">
            <label className="flex items-center gap-2 text-sm font-semibold mb-2">
              <Quote className="w-4 h-4" /> Special Quote
            </label>
            <textarea
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              placeholder="Add a special quote..."
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 resize-none"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold mb-2">
              <Tag className="w-4 h-4" /> Tags
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a tag..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
              <button
                onClick={addTag}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm"
                  >
                    #{tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="hover:bg-emerald-200 rounded-full p-0.5"
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
