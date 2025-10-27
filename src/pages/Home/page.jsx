import About from "../../components/Home/About";
import Activity from "../../components/Home/Activity";
import { Candidates } from "../../components/Home/Candidates";
import Hero from "../../components/Home/Hero";
import Legacy from "../../components/Home/Legacy";
import News from "../../components/Home/News";
import NewsActivities from "../../components/Home/NewsActivities";

const page = () => {
  return (
    <div>
      <Hero />
      <Legacy />
      <About />
      <Candidates />
      <News />
      <Activity />
      <NewsActivities />
    </div>
  );
};

export default page;
