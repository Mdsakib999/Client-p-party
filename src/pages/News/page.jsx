import HighlightCard from "../../components/Home/HighlightCard";
import NewsSection from "../../components/Home/NewsSection";

const page = () => {
  return (
    <div>
      <div className="px-6 py-10 max-w-8xl mx-auto">
        <HighlightCard />
      </div>

      <NewsSection />
    </div>
  );
};

export default page;
