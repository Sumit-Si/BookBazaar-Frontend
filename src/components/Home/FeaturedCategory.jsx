import React from "react";
import { Link } from "react-router-dom";

const FeaturedCategory = () => {
  return (
    <section className="bg-base-300 py-16 rounded-lg">
      <div className="mx-auto px-6 text-center">
        <h2 className="text-2xl font-semibold mb-10">Popular Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {["Fiction", "Academic", "Comics", "Rare Collections"].map(
            (category, i) => (
              <div
                key={i}
                className="card bg-base-100/30 shadow-sm hover:shadow-md hover:ring hover:ring-secondary transition p-6"
              >
                <h3 className="font-semibold text-lg">{category}</h3>
                <p className="text-sm text-base-content/80 mt-2">
                  Explore our handpicked selection of {category.toLowerCase()}{" "}
                  books.
                </p>
                <Link
                  href={`/collections/${category.toLowerCase()}`}
                  className="btn btn-link text-primary mt-3 p-0"
                >
                  Browse →
                </Link>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategory;
