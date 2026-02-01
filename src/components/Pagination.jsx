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
    <div className="flex justify-center gap-2 mt-10">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-md cursor-pointer"
      >
        <ChevronLeft />
      </button>

      {pages.map((p, i) =>
        p === "..." ? (
          <span key={i}>...</span>
        ) : (
          <button
            key={i}
            onClick={() => onPageChange(p)}
            className={
              currentPage === p
                ? "font-bold bg-emerald-500 text-emerald-50 px-4 py-0.5 rounded-md cursor-pointer"
                : "cursor-pointer"
            }
          >
            {p}
          </button>
        ),
      )}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-md cursor-pointer"
      >
        <ChevronRight />
      </button>
    </div>
  );
});

export default Pagination;
