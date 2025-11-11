import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPageNumbers = () => {
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
          totalPages
        );
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 mt-8 mb-4">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className={`cursor-pointer p-2 rounded-md flex items-center justify-center transition-all duration-200
          ${
            currentPage === 1
              ? "bg-emerald-100 text-emerald-400 cursor-not-allowed"
              : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm"
          }`}
      >
        <ChevronLeft size={18} />
      </button>

      <div className="flex items-center gap-1">
        {pageNumbers.map((num, index) =>
          num === "..." ? (
            <span key={index} className="px-2 text-gray-500">
              ...
            </span>
          ) : (
            <button
              key={index}
              onClick={() => onPageChange(num)}
              className={`cursor-pointer w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium transition-all
                ${
                  currentPage === num
                    ? "bg-emerald-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-emerald-100"
                }`}
            >
              {num}
            </button>
          )
        )}
      </div>

      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={`cursor-pointer p-2 rounded-md flex items-center justify-center transition-all duration-200
          ${
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm"
          }`}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
