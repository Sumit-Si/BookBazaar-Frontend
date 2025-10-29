import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useBookStore from "../../store/useBookStore.js";
import Container from "../../components/Container/Container.jsx";
import { ArrowLeftIcon } from "lucide-react";

const Book = () => {
  const navigate = useNavigate();
  const { bookId } = useParams();
  console.log("id", bookId);

  const { book, books, getBooks, getBookById } = useBookStore();

  useEffect(() => {
    try {
      getBookById(bookId);
    } catch (error) {
      console.log("BookById error : ", error);
    }
  }, []);
  return (
    <Container>
      <div className="min-h-screen bg-base-100 text-base-content">
        <div className="px-6 py-10">
          <button type="button" onClick={() => navigate(-1)} className="bg-base-300 py-2 px-4 rounded-full shadow-md shadow-secondary/20 flex items-center gap-0.5 hover:text-secondary hover:shadow-lg transition duration-200 btn btn-outline btn-secondary"><ArrowLeftIcon /> Back</button>
        </div>
        <div className="px-6 pb-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* LEFT: COVER IMAGE */}
          <div className="flex w-full justify-start">
            <img
              src={book?.coverImage || "/placeholder-book.png"}
              alt={book?.title}
              className="rounded-xl w-11/12 shadow-md object-cover"
            />
          </div>

          {/* RIGHT: BOOK INFO */}
          <div>
            <h2 className="text-3xl font-bold mb-2">{book?.title}</h2>
            <p className="text-gray-500 mb-6">
              by{" "}
              <span className="font-medium text-gray-700">
                {book?.author?.fullName || "Unknown Author"}
              </span>
            </p>

            <div className="space-y-2 text-sm text-gray-600 mb-6">
              <p>
                <span className="font-semibold">Genre:</span> {book?.genre}
              </p>
              <p>
                <span className="font-semibold">Publisher:</span>{" "}
                {book?.publisher}
              </p>
              <p>
                <span className="font-semibold">Published Date:</span>{" "}
                {new Date(book?.publishedDate).toDateString()}
              </p>
              <p>
                <span className="font-semibold">ISBN:</span> {book?.ISBN}
              </p>
              <p>
                <span className="font-semibold">In Stock:</span>{" "}
                <span
                  className={
                    book?.stock > 0
                      ? "text-success font-medium"
                      : "text-error font-medium"
                  }
                >
                  {book?.stock > 0
                    ? `${book?.stock} available`
                    : "Out of Stock"}
                </span>
              </p>
            </div>

            <p className="text-base leading-relaxed mb-8">
              {book?.description}
            </p>

            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-primary">
                ₹{book?.price}
              </div>
              <div className="flex gap-3">
                <button className="btn btn-primary" disabled={book?.stock <= 0}>
                  Add to Cart
                </button>
                <button className="btn btn-outline" disabled={book?.stock <= 0}>
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Book;
