import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useBookStore from "../../store/useBookStore.js";
import Container from "../../components/Container/Container.jsx";
import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import { create } from "zustand";
import useReviewStore from "../../store/useReviewStore.js";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import calculateRatingStats from "../../utils/CalculateRatingStats.js";

const reviewSchema = z.object({
  rating: z.coerce.number().min(1, "Please select a rating between 1 and 5."),
  comment: z
    .string()
    .min(10, "Comment must be at least 5 characters")
    .max(500, "Comment must be at most 500 characters"),
});

const Book = () => {
  const navigate = useNavigate();
  const { bookId } = useParams();
  console.log("id", bookId);

  const { book, books, getBooks, getBookById } = useBookStore();
  const { reviews, addReview, getReviews, isReviewCreating } = useReviewStore();
  console.log("reviews", reviews);

  const ratingStats = calculateRatingStats(reviews);
  console.log("Rating stats: ", ratingStats);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 1,
      comment: "",
    },
  });

  useEffect(() => {
    try {
      getBookById(bookId);
    } catch (error) {
      console.log("BookById error : ", error);
    }
  }, []);

  useEffect(() => {
    try {
      const result = getReviews(bookId);
      console.log("result: ", result);
    } catch (error) {
      console.log("Reviews error : ", error);
    }
  }, []);

  const rating = watch("rating");

  const onSubmit = async (data) => {
    console.log("Form submitted!");

    console.log("data", data);
    try {
      await addReview(bookId, data);
      reset();
    } catch (error) {
      console.log("Error on adding review: ", error);
    }
  };

  return (
    <Container>
      <div className="min-h-screen bg-base-100 text-base-content">
        {/* BACK BUTTON */}
        <div className="px-6 py-10">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-base-300 py-2 px-4 rounded-full shadow-md shadow-secondary/20 flex items-center gap-0.5 hover:text-secondary hover:shadow-lg transition duration-200 btn btn-outline btn-secondary"
          >
            <ArrowLeftIcon className="h-4 w-4" /> Back
          </button>
        </div>

        {/* MAIN GRID */}
        <div className="px-6 pb-20 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* LEFT: FIXED COVER IMAGE */}
          <div className="col-span-1 md:sticky md:top-20 self-start">
            <img
              src={book?.coverImage || "/placeholder-book.png"}
              alt={book?.title}
              className="rounded-xl w-full shadow-md object-cover"
            />
          </div>

          {/* RIGHT: BOOK INFO + REVIEWS */}
          <div className="col-span-2 overflow-y-auto pr-3">
            <h2 className="text-3xl font-bold mb-2">{book?.title}</h2>
            <div className="text-primary mb-4 capitalize flex gap-2 items-center">
              {book?.author?.avatar?.url && (
                <img
                  src={book?.author?.avatar?.url}
                  alt="author image"
                  className="object-cover h-8 w-8 rounded-full"
                />
              )}
              {book?.author?.fullName || "Unknown Author"}
            </div>

            {/* RATING SECTION */}
            <div className="flex items-center gap-2 mb-4">
              <div className="rating rating-sm">
                {[1, 2, 3, 4, 5].map((num) => (
                  <input
                    key={num}
                    type="radio"
                    name="rating-display"
                    className="mask mask-star-2 bg-orange-400"
                    checked={num === Math.round(book?.avgRating || 0)}
                    readOnly
                  />
                ))}
              </div>
              <p className="text-sm text-base-content/80">
                {book?.avgRating ? book.avgRating.toFixed(1) : "No rating yet"}
              </p>
            </div>

            <p className="text-base leading-relaxed mb-4">
              {book?.description}
            </p>

            {/* BOOK DETAILS */}
            <div className="space-y-2 text-sm text-base-content/70 mb-6">
              <p>
                <span className="font-semibold">Genre:</span>{" "}
                <span className="uppercase text-secondary ring ring-secondary rounded-full py-1 px-2 tracking-wider text-xs">
                  {book?.genre}
                </span>
              </p>
              <p>
                <span className="font-semibold">Publisher:</span>{" "}
                {book?.publisher}
              </p>
              <p>
                <span className="font-semibold">Published Date:</span>{" "}
                {new Date(book?.publishedDate).toLocaleDateString()}
              </p>
              <p>
                <span className="font-semibold">ISBN:</span>{" "}
                <span className="underline">{book?.ISBN}</span>
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
                  {book?.stock > 0 ? `${book.stock} available` : "Out of Stock"}
                </span>
              </p>
            </div>

            {/* PRICE AND ACTIONS */}
            <div className="flex flex-col gap-5 mb-10">
              <div className="text-2xl font-bold text-emerald-500">
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

            {/* REVIEWS SECTION */}
            <div className="mt-10 py-2">
              <h3 className="text-2xl font-bold mb-6">Customer Reviews</h3>

              {/* Rating distribution */}
              <div className="grid md:grid-cols-[200px_1fr] gap-6 mb-10">
                {/* Average Rating */}
                <div className="text-center md:border-r border-base-300 pr-6">
                  <div className="text-5xl font-bold text-primary mb-2">
                    {ratingStats.averageRating.toFixed(1)}
                  </div>
                  <div className="rating rating-sm mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <input
                        key={star}
                        type="radio"
                        className="mask mask-star-2 bg-orange-400"
                        checked={star <= Math.round(ratingStats.averageRating)}
                        readOnly
                        disabled
                      />
                    ))}
                  </div>
                  <div className="text-sm text-base-content/70">
                    Based on {ratingStats.totalReviews}{" "}
                    {ratingStats.totalReviews === 1 ? "review" : "reviews"}
                  </div>
                </div>

                {/* Rating Distribution */}
                <div className="space-y-3">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center gap-3">
                      <div className="flex items-center gap-1 w-12">
                        <span className="font-medium">{rating}</span>
                        <svg
                          className="w-4 h-4 fill-current text-warning"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      </div>
                      <div className="flex-1 bg-base-300 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-warning h-3 rounded-full transition-all duration-500 ease-out"
                          style={{
                            width: `${ratingStats.percentages[rating] || 0}%`,
                          }}
                        ></div>
                      </div>
                      <span className="w-12 text-base-content/70 text-sm text-right">
                        {ratingStats.counts[rating]} (
                        {Math.round(ratingStats.percentages[rating] || 0)}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* REVIEW FORM */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-base-200 p-6 rounded-lg mb-10 space-y-4"
              >
                <h4 className="font-semibold text-lg">Write a Review</h4>
                <div>
                  <div className="rating rating-md">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <input
                        key={num}
                        type="radio"
                        {...register("rating", { valueAsNumber: true })}
                        className={`mask mask-star-2  ${
                          errors.rating ? "bg-red-400" : "bg-orange-400"
                        }`}
                        value={num}
                        checked={rating === num}
                        onChange={() =>
                          setValue("rating", num, { shouldValidate: true })
                        }
                      />
                    ))}
                  </div>
                  {errors?.rating && (
                    <p className="text-error">{errors?.rating.message}</p>
                  )}
                </div>

                <div>
                  <textarea
                    className={`textarea textarea-bordered w-full ${
                      errors.comment ? "textarea-error" : ""
                    }`}
                    placeholder="Share your thoughts about this book..."
                    {...register("comment")}
                  ></textarea>
                  {errors?.comment && (
                    <p className="text-error">{errors?.comment.message}</p>
                  )}
                </div>

                <button
                  disabled={isReviewCreating}
                  type="submit"
                  className="btn btn-primary"
                >
                  {isReviewCreating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    "Submit Review"
                  )}
                </button>
              </form>

              {/* REVIEW LIST */}
              {reviews.length === 0 ? (
                <p className="text-base-content/80 space-y-3 px-2 text-center bg-base-200 py-5 rounded-lg">
                  No reviews yet. Be the first to review this book!
                </p>
              ) : (
                <div className="space-y-3 px-2">
                  {reviews.map((rev) => (
                    <div
                      key={rev._id}
                      className="p-4 bg-base-200 rounded-lg ring ring-secondary/30"
                    >
                      <div className="flex gap-2 items-start mb-1">
                        <div className="flex flex-1/4 flex-col gap-1">
                          <div className="avatar">
                            <div className="w-12 rounded-full">
                              <img src={rev?.createdBy?.avatar?.url} />
                            </div>
                          </div>
                          <p className="font-semibold text-sm">
                            {rev?.createdBy?.fullName || "Anonymous"}
                          </p>
                        </div>

                        <div className="flex-3/4">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-xs text-gray-400 mt-1">
                              {new Date(rev.createdAt).toLocaleDateString()}
                            </p>
                            <div className="rating rating-xs">
                              {[1, 2, 3, 4, 5].map((num) => (
                                <input
                                  key={num}
                                  type="radio"
                                  name={`rating-${rev._id}`}
                                  className="mask mask-star-2 bg-orange-400"
                                  checked={num === rev?.rating}
                                  readOnly
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-base-content text-sm">
                            {rev.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Book;
