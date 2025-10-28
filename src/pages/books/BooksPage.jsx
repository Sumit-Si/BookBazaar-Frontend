import { useState } from "react";
import Container from "../../components/Container/Container";
import useBookStore from "../../store/useBookStore.js";
import { useEffect } from "react";

const BooksPage = () => {
  const [search, setSearch] = useState("");

  const {books,isBookLoading,getBooks} = useBookStore();

  useEffect(() => {
    console.log("Books",books);
    
    try {
        getBooks();
    } catch (error) {
        console.log("Error on get books",error);
        
    }
  },[])

  if(isBookLoading) {
    return (
        <div className="flex justify-center py-20">
            <span className="loading loading-spinner text-primary"></span>
        </div>
    )
  }

  return (
    <Container>
      <div className="min-h-screen bg-base-100 text-base-content">
        {/* PAGE HEADER */}
        <header className="px-6 py-12 text-center">
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
        </header>

        {/* MAIN CONTENT */}
        <main className="px-6 pb-20">
          {books.length === 0 ? (
          <div className="text-center py-20 text-gray-500">No books found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {books?.map((book) => (
              <div
                key={book._id}
                className="card bg-base-100 shadow-sm hover:shadow-md transition p-4"
              >
                <figure className="h-48 bg-gray-100 rounded-lg mb-4 overflow-hidden">
                  <img
                    src={book.coverUrl || "/placeholder-book.png"}
                    alt={book.title}
                    className="object-cover w-full h-full"
                  />
                </figure>
                <div className="flex flex-col justify-between h-32">
                  <div>
                    <h3 className="font-semibold text-lg line-clamp-1">
                      {book.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-1">
                      {book.author || "Unknown Author"}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-primary font-semibold">
                      ₹{book.price?.toFixed(2) || "—"}
                    </span>
                    <a
                      href={`/books/${book._id}`}
                      className="btn btn-sm btn-outline"
                    >
                      View Details
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        </main>
      </div>
    </Container>
  );
};

export default BooksPage;
