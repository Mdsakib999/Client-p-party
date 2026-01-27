import React, { useState, useEffect } from "react";
import {
  Target,
  Eye,
  Lightbulb,
  Users,
  Globe,
  TrendingUp,
  CheckCircle,
  Leaf,
} from "lucide-react";
import { Link } from "react-router";

export default function VisionPage() {
  const [, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("vision");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const coreValues = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community First",
      description:
        "Placing the welfare and safety of communities at the heart of every initiative and decision we make.",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Standards",
      description:
        "Adhering to international best practices while respecting local contexts and cultural values.",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Continuous Growth",
      description:
        "Embracing innovation and learning to evolve with emerging challenges and opportunities.",
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Sustainability",
      description:
        "Building resilient systems that protect both people and the environment for future generations.",
    },
  ];

  const strategicGoals = [
    "Establish comprehensive early warning systems across all vulnerable regions",
    "Reduce disaster-related casualties by 75% through proactive measures",
    "Build resilient infrastructure capable of withstanding major natural events",
    "Create a culture of preparedness through education and community engagement",
    "Integrate climate adaptation strategies into all planning processes",
    "Foster international cooperation for knowledge sharing and resource mobilization",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden min-h-[75vh]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://api.bnpbd.org/api/upload/images/tarique-rahman-b569.jpg"
            alt="Vision 2030 Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 via-green-800/70 to-emerald-900/80"></div>
        </div>

        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.05) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.05) 0%, transparent 50%)",
          }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6 animate-pulse">
              <Target className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-2xl">
              Vision 2030
            </h1>
            <p className="text-xl md:text-2xl text-green-50 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
              Building a safer, more resilient tomorrow through innovation,
              collaboration, and unwavering commitment to community welfare
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-green-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {[
              {
                id: "vision",
                label: "Our Vision",
                icon: <Eye className="w-4 h-4" />,
              },
              {
                id: "mission",
                label: "Mission",
                icon: <Target className="w-4 h-4" />,
              },
              {
                id: "values",
                label: "Core Values",
                icon: <Lightbulb className="w-4 h-4" />,
              },
              {
                id: "goals",
                label: "Strategic Goals",
                icon: <CheckCircle className="w-4 h-4" />,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-green-600 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Vision Section */}
        {activeTab === "vision" && (
          <div className="space-y-12 animate-fade-in">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-8 py-6">
                <h2 className="text-3xl font-bold text-white flex items-center">
                  <Eye className="w-8 h-8 mr-3" />
                  Our Vision
                </h2>
              </div>
              <div className="p-8 md:p-12">
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8">
                  To be a world-leading organization in disaster management and
                  community resilience, creating a future where every individual
                  lives in safety, preparedness defines communities, and
                  recovery strengthens bonds.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Zero Preventable Loss",
                      desc: "Eliminating casualties from predictable disasters through advanced preparedness",
                    },
                    {
                      title: "Empowered Communities",
                      desc: "Building self-reliant populations equipped with knowledge and resources",
                    },
                    {
                      title: "Sustainable Recovery",
                      desc: "Transforming post-disaster rebuilding into opportunities for better futures",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100 hover:shadow-lg transition-all"
                    >
                      <h3 className="text-lg font-bold text-green-800 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mission Section */}
        {activeTab === "mission" && (
          <div className="space-y-12 animate-fade-in">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-6">
                <h2 className="text-3xl font-bold text-white flex items-center">
                  <Target className="w-8 h-8 mr-3" />
                  Our Mission
                </h2>
              </div>
              <div className="p-8 md:p-12">
                <div className="prose prose-lg max-w-none">
                  <p className="text-xl text-gray-700 leading-relaxed mb-8">
                    We are committed to protecting lives, livelihoods, and the
                    environment through integrated disaster risk reduction,
                    swift emergency response, and sustainable recovery programs
                    that leave no one behind.
                  </p>
                  <div className="grid md:grid-cols-2 gap-8 mt-8">
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-green-800 mb-4">
                        Prevention & Preparedness
                      </h3>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                        <p className="text-gray-600">
                          Develop and deploy cutting-edge early warning
                          technologies
                        </p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                        <p className="text-gray-600">
                          Conduct comprehensive risk assessments and
                          vulnerability mapping
                        </p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                        <p className="text-gray-600">
                          Train communities in disaster preparedness and
                          self-protection
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-green-800 mb-4">
                        Response & Recovery
                      </h3>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                        <p className="text-gray-600">
                          Coordinate rapid, effective emergency response
                          operations
                        </p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                        <p className="text-gray-600">
                          Facilitate rehabilitation and reconstruction with
                          resilience principles
                        </p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                        <p className="text-gray-600">
                          Support affected communities in building back better
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Core Values Section */}
        {activeTab === "values" && (
          <div className="space-y-12 animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Core Values
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The principles that guide our actions and define our commitment
                to excellence
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {coreValues.map((value, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-shadow border border-green-100"
                >
                  <div className="bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-2xl w-16 h-16 flex items-center justify-center mb-6">
                    {value.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Strategic Goals Section */}
        {activeTab === "goals" && (
          <div className="space-y-12 animate-fade-in">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-teal-500 to-green-500 px-8 py-6">
                <h2 className="text-3xl font-bold text-white flex items-center">
                  <CheckCircle className="w-8 h-8 mr-3" />
                  Strategic Goals for 2030
                </h2>
              </div>
              <div className="p-8 md:p-12">
                <p className="text-xl text-gray-700 mb-8">
                  Our roadmap to achieving transformative impact in disaster
                  management and community resilience
                </p>
                <div className="space-y-6">
                  {strategicGoals.map((goal, idx) => (
                    <div
                      key={idx}
                      className="flex items-start space-x-4 bg-gradient-to-r from-green-50 to-transparent rounded-2xl p-6 border-l-4 border-green-500 hover:shadow-md transition-all"
                    >
                      <div className="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                        {idx + 1}
                      </div>
                      <p className="text-gray-700 text-lg leading-relaxed pt-1">
                        {goal}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Join Us in Building a Resilient Future
          </h2>
          <p className="text-xl text-green-50 mb-8">
            Together, we can create communities that thrive in the face of
            adversity
          </p>
          <Link to="/contact">
            <button className="cursor-pointer bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-green-50 transition-all shadow-lg hover:shadow-xl">
              Contact Us
            </button>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
