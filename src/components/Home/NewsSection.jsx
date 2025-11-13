import { Link, useLocation } from "react-router";
import { useState } from "react";
import Pagination from "../Pagination";
import { NewsCardSkeleton } from "../../utils/NewsCardSkeleton";

const NewsSection = ({ newsArticles = [], articleLoader }) => {
  const { pathname } = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  if (articleLoader)
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 max-w-7xl mx-auto my-6">
        {[...Array(4)].map((_, index) => (
          <NewsCardSkeleton key={index} />
        ))}
      </div>
    );

  const totalPages = Math.ceil(newsArticles.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const paginatedArticles =
    pathname === "/news"
      ? newsArticles.slice(start, start + itemsPerPage)
      : newsArticles;

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <>
      {newsArticles.length > 0 && (
        <section className="py-10 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
                News and Activities
              </h2>
              <p className="text-gray-600 text-lg">
                We Focus on the details of everything we do. All to help people
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {paginatedArticles.map((item) => (
                <Link
                  key={item._id}
                  to={`/news/${item.slug}`}
                  className="block group"
                >
                  <div className="w-full max-w-96 mx-auto rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow">
                    <div className="aspect-[4/3] overflow-hidden bg-gray-200">
                      <img
                        src={item?.images?.[0]?.url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-base leading-tight mb-2 group-hover:text-green-600 transition-colors">
                        {item.title.slice(0, 50)}...
                      </h3>
                      <p className="text-xs text-gray-600">
                        {formatDate(item.createdAt)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {pathname !== "/news" ? (
              <Link
                to="/news"
                className="inline-block font-semibold text-sm hover:text-green-600 transition-colors ml-2"
              >
                See more +
              </Link>
            ) : (
              totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default NewsSection;
