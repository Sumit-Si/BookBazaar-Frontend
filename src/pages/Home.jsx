import { Link } from "react-router-dom";
import Container from "../components/Container/Container";
import CallToAction from "../components/Home/CallToAction";
import FeaturedBooks from "../components/Home/FeaturedBooks";
import FeaturedCategory from "../components/Home/FeaturedCategory";

const Home = () => {
  return (
    <Container>
      <div className="min-h-screen relative">
        <div className="fixed top-16 right-0 w-1/3 h-1/2 bg-primary opacity-40 blur-3xl rounded-full bottom-9"></div>
          <div className="fixed left-0 w-1/3 h-1/2 bg-primary opacity-40 blur-3xl rounded-full bottom-0"></div>
        {/* Hero Section */}
        <section className="hero pb-6 h-screen w-full">
          <div className="hero-content text-center">
            <div className="max-w-10/12">
              <h1 className="sm:text-6xl text-4xl font-semibold mb-6">
                Discover, Purchase, and Review Books with{" "}
                <span className="text-primary">BookBazaar</span>
              </h1>
              <p className="sm:text-lg text-md mb-8 text-muted-foreground">
                BookBazaar is your very own online bookstore — built entirely
                from scratch. Browse, purchase, and review books directly from
                our curated collection, powered by our custom backend and
                database.
              </p>
              <div className="flex justify-center gap-4">
                <Link to={"/books"} className="btn btn-primary">
                  Browse Books
                </Link>
                <Link to={"/sell"} className="btn btn-outline">
                  Sell Your Books
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section className="ring ring-secondary/10 shadow-md shadow-secondary/20 rounded-lg mb-6 py-16">
          <div className="px-6 text-center">
            <h2 className="text-2xl font-semibold mb-6 text-secondary">
              About BookBazaar
            </h2>
            <p className="max-w-4xl mx-auto text-base-content/80">
              Built from the ground up, BookBazaar is not just another online
              store — it’s a platform crafted with care. Every feature, from
              book listings to reviews and purchases, runs on our self-developed
              backend, ensuring reliability, transparency, and full control over
              our book data.
            </p>
          </div>
        </section>

        {/* FEATURED CATEGORIES */}
        <FeaturedCategory />

        {/* FEATURED BOOKS */}
        <FeaturedBooks />

        {/* WHY CHOOSE US */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-2xl font-semibold mb-10">
              Why Choose BookBazaar?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-base-100 rounded-lg shadow-sm">
                <h4 className="font-semibold text-lg mb-2">
                  Custom-Built Platform
                </h4>
                <p className="text-base-content/80 text-sm">
                  Our backend, database, and APIs are all developed in-house for
                  full control and data security.
                </p>
              </div>
              <div className="p-6 bg-base-100 rounded-lg shadow-sm">
                <h4 className="font-semibold text-lg mb-2">
                  Authentic Book Data
                </h4>
                <p className="text-base-content/80 text-sm">
                  Every book listed comes directly from our database — no
                  external APIs, no duplicates.
                </p>
              </div>
              <div className="p-6 bg-base-100 rounded-lg shadow-sm">
                <h4 className="font-semibold text-lg mb-2">
                  Seamless User Experience
                </h4>
                <p className="text-base-content/80 text-sm">
                  Built with performance and simplicity in mind, offering a fast
                  and smooth browsing experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <CallToAction />
      </div>
    </Container>
  );
};

export default Home;
