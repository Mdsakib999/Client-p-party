import { useParams, Link } from "react-router";
import {
  useGetNewsArticleBySlugQuery,
  useGetAllNewsArticlesQuery,
} from "../../redux/features/newsArticle/newsArticle.api";
import { FeaturedNewsSkeleton } from "../../utils/FeaturedNewsSkeleton";

export default function NewsDetail() {
  const { slug } = useParams();
  const { data: newsArticleData, isLoading: articleLoader } =
    useGetNewsArticleBySlugQuery(slug);
  const { data: allNewsData, isLoading: allArticleLoader } =
    useGetAllNewsArticlesQuery();

  const article = newsArticleData;
  const allArticles = allNewsData?.data || [];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getExcerpt = (htmlString, maxLength = 150) => {
    const div = document.createElement("div");
    div.innerHTML = htmlString;
    const text = div.textContent || div.innerText || "";
    return (
      text.substring(0, maxLength) + (text.length > maxLength ? "..." : "")
    );
  };

  if (articleLoader || allArticleLoader) return <FeaturedNewsSkeleton />;

  if (!article) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
        <Link to="/news" className="text-green-600 hover:underline">
          Back to News
        </Link>
      </div>
    );
  }

  const relatedArticles = allArticles
    .filter((a) => a._id !== article._id)
    .slice(0, 5);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <span className="uppercase font-semibold text-gray-700">
            {article.tags?.[0] || "News"}
          </span>
          <span>•</span>
          <span>{formatDate(article.createdAt)}</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
          {article.title}
        </h1>

        <div className="mb-8">
          <img
            src={article.images?.[0]?.url}
            alt={article.title}
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>

        {article.quote && (
          <blockquote className="border-l-4 border-green-600 pl-6 py-4 my-8 bg-gray-50">
            <p className="text-xl text-gray-800 italic">"{article.quote}"</p>
          </blockquote>
        )}

        <div
          className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: article.description }}
        />

        {article.images?.length > 1 && (
          <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {article.images.slice(1).map((image, index) => (
              <div key={index}>
                <img
                  src={image.url}
                  alt={`${article.title} - Image ${index + 2}`}
                  className="w-full h-auto rounded-lg object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {article.tags?.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bg-white py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Popular Post</h2>
            <Link
              to="/news"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition-colors"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((post) => (
              <Link key={post._id} to={`/news/${post.slug}`} className="group">
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.images?.[0]?.url}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-xs font-semibold text-gray-500 uppercase mb-2">
                      {post.tags?.[0] || "News"}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {post.quote || getExcerpt(post.description)}
                    </p>
                    <span className="text-green-600 text-sm font-semibold hover:underline">
                      Read More...
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
