import About from "../../components/Home/About";
import Activity from "../../components/Home/Activity";
import { Candidates } from "../../components/Home/Candidates";
import Hero from "../../components/Home/Hero";
import Legacy from "../../components/Home/Legacy";
import Highlights from "../../components/Home/Highlights";
import NewsSection from "../../components/Home/NewsSection";

const page = () => {
  return (
    <div>
      <Hero />
      <Legacy />
      <About />
      <Candidates />
      <Highlights />
      <Activity />
      <NewsSection />
    </div>
  );
};

export default page;
