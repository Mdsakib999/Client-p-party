import { useParams, Link } from "react-router";
import newsArticles from "../../data/newsArticles.json";
import activitiesData from "../../data/activities.json";
import campaignActivities from "../../data/campaignActivities.json";

export default function NewsDetail() {
  const { slug } = useParams();

  // Add campaign activities to the list
  const campaignActivities = [
    {
      id: "bnp-campaign-launch-2026",
      slug: "bnp-campaign-launch-2026",
      category: "CAMPAIGN",
      date: "October 2025",
      title: "BNP Launches Nationwide Campaign for 2026 Elections",
      excerpt: "Begum Khaleda Zia officially launches BNP's election campaign at a massive rally in Dhaka, outlining the party's vision for Bangladesh's future.",
      featuredImage: "/campaign-1.jpg",
      candidate: "Begum Khaleda Zia",
      location: "Dhaka, Bangladesh",
      content: [
        {
          "type": "text",
          "text": "The Bangladesh Nationalist Party (BNP) officially launched its nationwide election campaign for the 2026 parliamentary elections at a massive public rally in Dhaka."
        },
        {
          "type": "text",
          "text": "Party Chairperson Begum Khaleda Zia addressed thousands of supporters, outlining BNP's comprehensive plan for economic development, democratic reforms, and social welfare."
        },
        {
          "type": "quote",
          "text": "We are committed to restoring democracy and creating opportunities for every citizen of Bangladesh.",
          "author": "Begum Khaleda Zia, BNP Chairperson"
        },
        {
          "type": "text",
          "text": "The campaign launch marks the beginning of an intensive grassroots mobilization effort across all constituencies."
        }
      ]
    },
    {
      id: "tarique-youth-rally",
      slug: "tarique-youth-rally",
      category: "YOUTH CAMPAIGN",
      date: "October 2025",
      title: "Tarique Rahman Addresses Massive Youth Rally",
      excerpt: "BNP Acting Chairman Tarique Rahman energizes young voters at a youth-focused campaign rally in Chittagong, promising digital innovation and job creation.",
      featuredImage: "/campaign-2.jpg",
      candidate: "Mr. Tarique Rahman",
      location: "Chittagong, Bangladesh",
      content: [
        {
          "type": "text",
          "text": "BNP Acting Chairman Tarique Rahman addressed a massive youth rally in Chittagong, focusing on technology-driven development and youth empowerment."
        },
        {
          "type": "text",
          "text": "The rally attracted thousands of young people who expressed enthusiasm for BNP's vision of a digitally advanced Bangladesh with ample job opportunities."
        },
        {
          "type": "quote",
          "text": "Our youth are the future leaders of Bangladesh. We will create an environment where young people can innovate, create jobs, and build a prosperous nation.",
          "author": "Tarique Rahman, BNP Acting Chairman"
        },
        {
          "type": "text",
          "text": "The event featured interactive sessions on digital entrepreneurship and modern governance."
        }
      ]
    },
    {
      id: "mirza-infrastructure-tour",
      slug: "mirza-infrastructure-tour",
      category: "INFRASTRUCTURE",
      date: "September 2025",
      title: "Mirza Abbas Visits Infrastructure Projects in Sylhet",
      excerpt: "BNP Standing Committee Member Mirza Abbas tours ongoing and planned infrastructure projects, promising accelerated development under BNP government.",
      featuredImage: "/campaign-3.jpg",
      candidate: "Mr. Mirza Abbas",
      location: "Sylhet, Bangladesh",
      content: [
        {
          "type": "text",
          "text": "BNP Standing Committee Member Mirza Abbas conducted an extensive tour of infrastructure projects in Sylhet division, highlighting development priorities."
        },
        {
          "type": "text",
          "text": "The tour included visits to ongoing highway projects, bridge constructions, and urban development initiatives that have been delayed or stalled."
        },
        {
          "type": "quote",
          "text": "Infrastructure development is the backbone of economic growth. Under BNP leadership, we will fast-track these crucial projects to connect communities and boost economic activity.",
          "author": "Mirza Abbas, BNP Standing Committee Member"
        },
        {
          "type": "text",
          "text": "Local residents expressed hope that BNP's return to power would bring renewed focus on infrastructure development."
        }
      ]
    },
    {
      id: "education-reform-seminar",
      slug: "education-reform-seminar",
      category: "EDUCATION",
      date: "September 2025",
      title: "Khandaker Mosharraf Hosts Education Reform Seminar",
      excerpt: "BNP leader presents comprehensive education policy at Rajshahi seminar, focusing on quality improvement and access for all students.",
      featuredImage: "/campaign-4.jpg",
      candidate: "Dr. Khandaker Mosharraf Hossain",
      location: "Rajshahi, Bangladesh",
      content: [
        {
          "type": "text",
          "text": "Dr. Khandaker Mosharraf Hossain, BNP Standing Committee Member, hosted a major education reform seminar in Rajshahi, attended by educators, parents, and students."
        },
        {
          "type": "text",
          "text": "The seminar focused on BNP's comprehensive education policy, emphasizing quality improvement, technology integration, and equal access to education."
        },
        {
          "type": "quote",
          "text": "Education is the foundation of our nation's progress. We will invest in our children and ensure every student receives quality education regardless of their background.",
          "author": "Dr. Khandaker Mosharraf Hossain, BNP Standing Committee Member"
        },
        {
          "type": "text",
          "text": "Participants discussed practical solutions for improving Bangladesh's education system."
        }
      ]
    },
    {
      id: "digital-campaign-launch",
      slug: "digital-campaign-launch",
      category: "DIGITAL INITIATIVE",
      date: "October 2025",
      title: "Mirza Fakhrul Launches Digital Campaign Platform",
      excerpt: "BNP Secretary General unveils innovative digital tools for voter engagement and transparent campaign communication.",
      featuredImage: "/campaign-5.jpg",
      candidate: "Mirza Fakhrul Islam Alamgir",
      location: "Dhaka, Bangladesh",
      content: [
        {
          "type": "text",
          "text": "BNP Secretary General Mirza Fakhrul Islam Alamgir launched the party's digital campaign platform, designed to revolutionize political engagement in Bangladesh."
        },
        {
          "type": "text",
          "text": "The platform features voter registration tools, campaign donation portals, live updates, and interactive policy discussions."
        },
        {
          "type": "quote",
          "text": "Politics must meet people where they are. Our digital platform will make democracy more accessible and transparent for all citizens.",
          "author": "Mirza Fakhrul Islam Alamgir, BNP Secretary General"
        },
        {
          "type": "text",
          "text": "The launch event demonstrated various features of the platform and trained volunteers on its use."
        }
      ]
    },
    {
      id: "agricultural-policy-meeting",
      slug: "agricultural-policy-meeting",
      category: "AGRICULTURE",
      date: "August 2025",
      title: "Salahuddin Ahmed Meets Farmers in Khulna",
      excerpt: "BNP Standing Committee Member engages with farmers to develop agriculture-focused policies for rural economic development.",
      featuredImage: "/campaign-6.jpg",
      candidate: "Salahuddin Ahmed",
      location: "Khulna, Bangladesh",
      content: [
        {
          "type": "text",
          "text": "BNP Standing Committee Member Salahuddin Ahmed conducted extensive meetings with farmers across Khulna division to understand their challenges and aspirations."
        },
        {
          "type": "text",
          "text": "Farmers shared concerns about market access, fair pricing, irrigation facilities, and climate-resilient farming practices."
        },
        {
          "type": "quote",
          "text": "Our farmers are the backbone of Bangladesh's economy. BNP will implement policies that ensure fair prices, modern farming techniques, and sustainable agriculture.",
          "author": "Salahuddin Ahmed, BNP Standing Committee Member"
        },
        {
          "type": "text",
          "text": "The meetings formed the basis for BNP's comprehensive agricultural development plan."
        }
      ]
    },
    {
      id: "women-empowerment-drive",
      slug: "women-empowerment-drive",
      category: "WOMEN'S RIGHTS",
      date: "September 2025",
      title: "BNP Women's Wing Intensifies Campaign Efforts",
      excerpt: "BNP women's leaders mobilize female voters across Bangladesh, focusing on gender equality and women's political participation.",
      featuredImage: "/campaign-7.jpg",
      candidate: "BNP Women's Wing",
      location: "Multiple Locations",
      content: [
        {
          "type": "text",
          "text": "BNP Women's Wing leaders have intensified their campaign efforts, organizing events and meetings to engage female voters across the country."
        },
        {
          "type": "text",
          "text": "The campaign focuses on women's rights, economic empowerment, and increasing female representation in politics."
        },
        {
          "type": "quote",
          "text": "Women are not just voters; they are leaders, decision-makers, and the future of Bangladesh. We will ensure their voices are heard and valued.",
          "author": "BNP Women's Wing Leader"
        },
        {
          "type": "text",
          "text": "The initiative has seen increased participation from women in campaign activities and policy discussions."
        }
      ]
    },
    {
      id: "economic-vision-presentation",
      slug: "economic-vision-presentation",
      category: "ECONOMIC POLICY",
      date: "October 2025",
      title: "BNP Presents Economic Vision for 2026-2031",
      excerpt: "Party leaders unveil comprehensive economic plan focusing on job creation, industrialization, and sustainable development.",
      featuredImage: "/campaign-8.jpg",
      candidate: "BNP Economic Team",
      location: "Dhaka, Bangladesh",
      content: [
        {
          "type": "text",
          "text": "BNP presented its comprehensive economic vision for Bangladesh's development over the next five years, focusing on inclusive growth and job creation."
        },
        {
          "type": "text",
          "text": "The plan includes strategies for industrialization, export promotion, digital economy development, and social safety nets."
        },
        {
          "type": "quote",
          "text": "We will create an economy that works for everyone, ensuring prosperity reaches every corner of Bangladesh and every segment of our society.",
          "author": "BNP Economic Affairs Secretary"
        },
        {
          "type": "text",
          "text": "The presentation was attended by business leaders, economists, and development experts."
        }
      ]
    }
  ];

  const article = newsArticles.find((a) => a.slug === slug) ||
  activitiesData.find((a) => a.slug === slug) ||
  campaignActivities.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
        <Link to="/news" className="text-green-600 hover:underline">
          Back to News
        </Link>
      </div>
    );
  }

  const allArticles = [...newsArticles, ...activitiesData, ...campaignActivities];
  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id)
    .slice(0, 3);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <span className="uppercase font-semibold text-gray-700">
            {article.category}
          </span>
          <span>•</span>
          <span>{article.date}</span>
        </div>

        {/* Article Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
          {article.title}
        </h1>

        {/* Featured Image */}
        <div className="mb-8">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          {article.content.map((block, index) => {
            switch (block.type) {
              case "text":
                return (
                  <p key={index} className="text-gray-700 leading-relaxed mb-6">
                    {block.text}
                  </p>
                );
              case "quote":
                return (
                  <blockquote
                    key={index}
                    className="border-l-4 border-green-600 pl-6 py-4 my-8 bg-gray-50"
                  >
                    <p className="text-xl text-gray-800 italic mb-2">
                      "{block.text}"
                    </p>
                    <cite className="text-sm text-gray-600 not-italic">
                      — {block.author}
                    </cite>
                  </blockquote>
                );
              case "image":
                return (
                  <div key={index} className="my-8">
                    <img
                      src={block.url}
                      alt={block.alt}
                      className="w-full h-auto rounded-lg object-cover"
                    />
                  </div>
                );
              default:
                return null;
            }
          })}
        </div>
      </div>

      {/* Popular Posts Section */}
      <div className="bg-white py-12 border-t border-gray-200">
        <div className="max-w-8xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Popular Post</h2>
            <Link
              to="/news"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition-colors"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((post) => (
              <Link key={post.id} to={`/news/${post.slug}`} className="group">
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-xs font-semibold text-gray-500 uppercase mb-2">
                      {post.category}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <span className="text-green-600 text-sm font-semibold hover:underline">
                      Read More...
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
