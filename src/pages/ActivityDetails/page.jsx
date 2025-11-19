import { useParams } from "react-router";
import BNPLoader from "../../utils/BNPLoader";
import { extractYouTubeId } from "../../utils/extractYouTubeId";
import { useGetActivityBySlugQuery } from "../../redux/features/activity/activity.api";

export default function ActivityDetails() {
    const { slug } = useParams();
    const { data, isLoading } = useGetActivityBySlugQuery(slug);

    if (isLoading) return <BNPLoader />;

    const activity = data?.data;
    if (!activity)
        return <p className="text-center text-red-500 py-10">Activity not found</p>;

    const videoId = extractYouTubeId(activity.videoLink);
    const imageUrl = activity?.featuredImage?.url;

    return (
        <section className="py-10 px-4 bg-green-50 min-h-screen">
            <div className="max-w-4xl mx-auto">

                {/* Category */}
                <span className="inline-block bg-green-200 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                    {activity.category}
                </span>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-3 text-gray-900 leading-tight">
                    {activity.title}
                </h1>

                {/* Date */}
                <p className="text-gray-500 mb-6">
                    {new Date(activity.createdAt).toDateString()}
                </p>

                {/* HERO MEDIA (Video OR Image) */}
                <div className="w-full rounded-2xl overflow-hidden shadow-md mb-10">
                    {videoId ? (
                        <div className="w-full aspect-video">
                            <iframe
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/${videoId}`}
                                allowFullScreen
                            ></iframe>
                        </div>
                    ) : (
                        <img
                            src={imageUrl}
                            className="w-full h-auto object-cover"
                            alt={activity.title}
                        />
                    )}
                </div>

                {/* CONTENT */}
                <div className="text-gray-800 text-lg leading-relaxed space-y-5">
                    {activity.content?.split("\n").map((p, i) => (
                        <p key={i}>{p}</p>
                    ))}
                </div>
            </div>
        </section>
    );
}
