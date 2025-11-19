export const extractYouTubeId = (url) => {
    if (!url) return null;

    const patterns = [
        /v=([^&]+)/,
        /youtu\.be\/([^?]+)/,
        /live\/([^?]+)/,
        /embed\/([^?]+)/,
        /shorts\/([^?]+)/,
    ];

    for (const p of patterns) {
        const match = url.match(p);
        if (match) return match[1];
    }

    return null;
};

export const getSmallThumb = (activity) => {
    const id = extractYouTubeId(activity.videoLink);

    if (id) {
        return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
    }

    return activity.featuredImage?.url;
};

export const getFeaturedThumb = (activity) => {
    const id = extractYouTubeId(activity?.videoLink);

    if (id) {
        return `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
    }

    return activity.featuredImage?.url;
};

