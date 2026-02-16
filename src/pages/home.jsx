import Hero from "./Hero";
import About from "./About";
import Services from "./Services";
import Solutions from "./Solutions";
import FAQ from "./FAQ";
import Draft from "../../components/draft";

function Home() {
  return (
    <div className="w-screen">
      <Hero />
      <About />
      <Services />
      <Solutions />
      <FAQ />
    </div>
  );
}
export default Home;
