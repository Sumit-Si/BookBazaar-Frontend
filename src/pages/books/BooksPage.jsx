import { useState } from "react";
import Container from "../../components/Container/Container";
import useBookStore from "../../store/useBookStore.js";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

const BooksPage = () => {
  const [search, setSearch] = useState("");

  const { books, isBookLoading, getBooks } = useBookStore();

  useEffect(() => {
    console.log("Books", books);
    try {
      getBooks();
    } catch (error) {
      console.log("Error while fetching books", error);
    }
  }, []);

  if (isBookLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
    );
  }

  return (
    <Container>
      <div className="min-h-screen bg-base-100 text-base-content">
        <div className="px-6 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4 text-primary">
            Our Collection
          </h1>
          <p className="text-base-content/80 max-w-3xl mx-auto">
            Browse through our curated collection of books fetched directly from
            the BookBazaar backend. Discover your next read from a selection
            built by readers, for readers.
          </p>
          <div className="mt-6 flex justify-center">
            <input
              type="text"
              placeholder="Search for a book..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input input-bordered w-full max-w-md"
            />
          </div>
        </div>

        <div className="px-6 pb-20">
          {books.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              No books found.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.isArray(books) &&
                books?.map((book) => (
                  <div
                    key={book._id}
                    className="card bg-base-200 ring ring-secondary/20 shadow-sm hover:shadow-lg hover:shadow-secondary/40 transition duration-200 hover:-translate-y-1 p-4"
                  >
                    <figure className="max-h-48 h-48 bg-base-300 rounded-lg mb-4 overflow-hidden">
                      <img
                        src={book?.coverImage || "/placeholder-book.png"}
                        alt={book?.title}
                        className="object-cover w-full h-full"
                      />
                    </figure>
                    <div className="flex flex-col gap-2 justify-between max-h-48 h-48">
                      <div>
                        <h5 className="bg-secondary/10 mb-2 text-primary ring ring-primary/30 shadow-sm shadow-primary/80 rounded-lg text-xs w-fit p-2">
                          {book?.genre || "Unknown Category"}
                        </h5>
                        <h3 className="font-semibold text-lg line-clamp-1">
                          {book?.title}
                        </h3>
                        <p className="text-sm text-base-content/90 line-clamp-1">
                          by{" "}
                          <span className="text-secondary capitalize">
                            {book?.author?.fullName || "Unknown Author"}
                          </span>
                        </p>
                      </div>
                      <div className="">
                        <p className="text-sm text-base-content/80 line-clamp-2">
                          {book?.description}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-emerald-500 font-semibold">
                          ₹{book.price?.toFixed(2) || "—"}
                        </span>
                        <Link
                          to={`/books/${book?._id}`}
                          className="btn btn-sm btn-outline"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default BooksPage;
