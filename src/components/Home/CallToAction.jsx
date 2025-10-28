import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="bg-base-200/80 rounded-lg text-secondary py-16 text-center">
      <h2 className="text-xl sm:text-3xl font-bold mb-4 px-8">
        Join Thousands of Readers Today
      </h2>
      <p className="max-w-2xl mx-auto text-base-content/80 mb-8 px-8">
        Start exploring the world of books at your fingertips. Buy, sell, or
        review your favorite titles — all in one place.
      </p>
      <Link to={"/books"} className="btn btn-primary">
        Get Started
      </Link>
    </section>
  );
};

export default CallToAction;
