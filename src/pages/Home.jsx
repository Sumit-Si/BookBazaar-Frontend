import Container from "../components/Container/Container";

const Home = () => {
  return (
    <Container>
      {/* Hero Section */}
      <section className="hero min-h-screen">
        <div className="absolute top-16 right-0 w-1/3 h-1/3 bg-primary opacity-50 blur-[5rem] rounded-full bottom-9"></div>
        <div className="absolute left-0 w-1/3 h-1/3 bg-primary opacity-40 blur-3xl rounded-full bottom-1/3"></div>
        <div className="hero-content text-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">Discover. Publish. Connect — All in One Place.</h1>
            <p className="mb-6 text-lg">
              Welcome to <span className="text-primary">BookBazaar</span>, the ultimate hub for readers, authors, and reviewers.
              Explore thousands of titles, share your stories, and connect with a thriving book community.
            </p>
            <div className="flex justify-center gap-4">
              <a href="/books" className="btn btn-primary btn-lg">Browse Books</a>
              <a href="/publish" className="btn btn-outline btn-lg">Publish Your Book</a>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default Home;
