import { Outlet } from "react-router-dom";
// import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Container from "./components/Container/Container";

function App() {
  return (
    <div className="w-full min-h-screen relative border">
      <Container>
        <Header />
        <Outlet />
        <Footer />
      </Container>
    </div>
  );
}

export default App;
