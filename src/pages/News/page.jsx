import HighlightCard from "../../components/Home/HighlightCard";
import NewsSection from "../../components/Home/NewsSection";
import { useGetAllNewsArticlesQuery } from "../../redux/features/newsArticle/newsArticle.api";
import BNPLoader from "../../utils/BNPLoader";

export default function AllNews() {
  const { data: newsArticles, isLoading } = useGetAllNewsArticlesQuery();
  if (isLoading) return <BNPLoader />;
  return (
    <div>
      <div className="px-4 py-8 max-w-7xl mx-auto">
        <HighlightCard
          newsArticle={newsArticles?.data[0]}
          allArticles={newsArticles?.data}
        />
      </div>

      <NewsSection newsArticles={newsArticles?.data} />
    </div>
  );
}
