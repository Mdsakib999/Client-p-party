import { ChevronLeft, ChevronRight } from "lucide-react";
import { memo } from "react";

const Pagination = memo(function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  const pages = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    if (currentPage <= 3) pages.push(1, 2, 3, "...", totalPages);
    else if (currentPage >= totalPages - 2)
      pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
    else
      pages.push(
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages,
      );
  }

  return (
    <div className="mt-12 flex justify-center">
      <div className="flex items-center gap-2">
        {/* Prev */}
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="cursor-pointer rounded-lg border border-emerald-200 bg-white px-3 py-2 text-emerald-700 shadow-sm transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Pages */}
        {pages.map((p, i) =>
          p === "..." ? (
            <span key={i} className="px-2 text-sm font-medium text-gray-400">
              …
            </span>
          ) : (
            <button
              key={i}
              onClick={() => onPageChange(p)}
              className={`cursor-pointer rounded-lg border px-4 py-2 text-sm font-medium transition
                ${
                  currentPage === p
                    ? "border-emerald-500 bg-emerald-500 text-white shadow"
                    : "border-gray-200 bg-white text-gray-700 hover:bg-emerald-50"
                }`}
            >
              {p}
            </button>
          ),
        )}

        {/* Next */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="cursor-pointer rounded-lg border border-emerald-200 bg-white px-3 py-2 text-emerald-700 shadow-sm transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
});

export default Pagination;
