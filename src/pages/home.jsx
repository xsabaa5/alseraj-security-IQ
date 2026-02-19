import Hero from "./Hero";
import About from "./About";
import Services from "./Services";
import Gallery from "./Solutions";
import Brands from "./Brands";
import FAQ from "./FAQ";

function Home() {
  return (
    <div className="w-screen">
      <Hero />
      <About />
      <Services />
      <Brands />
      <Gallery />
      <FAQ />
    </div>
  );
}
export default Home;
