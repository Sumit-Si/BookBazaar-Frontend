import React from "react";
import { Link } from "react-router-dom";

const FeaturedBooks = () => {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-semibold">Featured Books</h2>
          <Link href="/browse" className="link text-primary">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Example placeholder cards (replace with dynamic data later) */}
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="card bg-base-100 shadow-sm hover:shadow-md transition p-4"
            >
              <figure className="h-48 bg-gray-100 rounded-lg mb-4"></figure>
              <h3 className="font-semibold text-lg">Book Title {i}</h3>
              <p className="text-sm text-gray-500 mt-1">Author Name</p>
              <div className="mt-3 flex justify-between items-center">
                <span className="text-primary font-semibold">
                  ₹{199 + i * 10}
                </span>
                <button className="btn btn-sm btn-primary">Buy Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;
