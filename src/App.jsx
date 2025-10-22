import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="w-full min-h-screen relative">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
