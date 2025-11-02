import { useState, useDeferredValue, useEffect } from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";
import useBookStore from "../../store/useBookStore.js";

const BookSearch = ({ onFiltersChange }) => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    genre: "",
    author: "",
    sortBy: "createdAt",
    order: "desc",
  });
  const [showFilters, setShowFilters] = useState(false);

  const deferredSearch = useDeferredValue(search); // Built-in debouncing

  // Notify parent when filters change
  useEffect(() => {
    onFiltersChange?.({
      search: deferredSearch,
      ...filters,
    });
  }, [deferredSearch, onFiltersChange, filters]);


  const activeFiltersCount = () => {};
  const handleClear = () => {};

  return (
    <div className="mt-6 sm:w-2/3 mx-auto w-full">
      {/* Search Input */}
      <div className="relative flex items-center">
        <Search className="absolute z-10 left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
        <input
          type="text"
          placeholder="Search books by title or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full pl-12 pr-20 h-12"
        />

        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`btn btn-ghost btn-sm btn-circle ${
              activeFiltersCount > 0 ? "btn-primary" : ""
            }`}
          >
            <div className="indicator">
              <SlidersHorizontal className="w-4 h-4" />
              {activeFiltersCount > 0 && (
                <span className="indicator-item badge badge-xs badge-error">
                  {activeFiltersCount}
                </span>
              )}
            </div>
          </button>

          {(search || activeFiltersCount > 0) && (
            <button
              onClick={handleClear}
              className="btn btn-ghost btn-sm btn-circle"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-base-200 p-4 rounded-lg grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            value={filters.genre}
            onChange={(e) => setFilters({ ...filters, genre: e.target.value })}
            className="select select-bordered"
          >
            <option value="">All Genres</option>
            <option value="fiction">Fiction</option>
            <option value="non-fiction">Non-Fiction</option>
            {/* Add more genres */}
          </select>

          <input
            type="text"
            placeholder="Author name"
            value={filters.author}
            onChange={(e) => setFilters({ ...filters, author: e.target.value })}
            className="input input-bordered"
          />

          <select
            value={filters.sortBy}
            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
            className="select select-bordered"
          >
            <option value="createdAt">Date Added</option>
            <option value="title">Title</option>
            <option value="price">Price</option>
            <option value="averageRating">Rating</option>
          </select>

          <select
            value={filters.order}
            onChange={(e) => setFilters({ ...filters, order: e.target.value })}
            className="select select-bordered"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default BookSearch;
