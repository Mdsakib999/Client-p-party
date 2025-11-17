import HighlightCard from "../../components/Home/HighlightCard";
import NewsSection from "../../components/Home/NewsSection";
import { useGetAllNewsArticlesQuery } from "../../redux/features/newsArticle/newsArticle.api";
import { FeaturedNewsSkeleton } from "../../utils/FeaturedNewsSkeleton";

export default function AllNews() {
  const { data: newsArticles, isLoading } = useGetAllNewsArticlesQuery({
    limit: 20,
  });
  if (isLoading) return <FeaturedNewsSkeleton />;

  return (
    <div className="min-h-screen">
      <div className="px-4 py-8 max-w-7xl mx-auto">
        <HighlightCard
          newsArticle={newsArticles?.data[0]}
          allArticles={newsArticles?.data}
        />
      </div>

      <NewsSection
        newsArticles={newsArticles?.data}
        articleLoader={isLoading}
      />
    </div>
  );
}
