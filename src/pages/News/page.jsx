import HighlightCard from "../../components/Home/HighlightCard";
import NewsSection from "../../components/Home/NewsSection";

const page = () => {
  return (
    <div>
      <div className="px-4 py-8 max-w-7xl mx-auto">
        <HighlightCard />
      </div>

      <NewsSection />
    </div>
  );
};

export default page;
