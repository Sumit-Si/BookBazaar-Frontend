import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ metadata, onPageChange }) => {
  console.log("metadata", metadata);

  if (!metadata || metadata.totalPages < 1) return null;

  const { currentPage, totalPages } = metadata;

  const pages = [];
  const maxVisible = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let endPage = Math.min(totalPages, startPage + maxVisible - 1);

  if (endPage - startPage < maxVisible - 1) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center items-center pb-8">
      <div className="join">
        <button
          className="join-item btn btn-sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button className="join-item btn btn-sm">
          {startPage > 1 && (
            <>
              <button onClick={() => onPageChange(1)} className="btn btn-sm">
                1
              </button>
              {startPage > 2 && <span className="px-2">...</span>}
            </>
          )}

          {pages.map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`btn btn-sm ${
                page === currentPage ? "btn-secondary" : ""
              }`}
            >
              {page}
            </button>
          ))}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && <span className="px-2">...</span>}
              <button
                onClick={() => onPageChange(totalPages)}
                className="btn btn-sm"
              >
                {totalPages}
              </button>
            </>
          )}
        </button>
        <button
          className="join-item btn btn-sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
