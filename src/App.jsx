import { Routes, Route } from "react-router";
import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";
import Home from "./pages/home";
import About from "./pages/About";
import Services from "./pages/Services";

function App() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden font-Montserrat">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
