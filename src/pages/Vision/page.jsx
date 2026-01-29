import React, { useState } from "react";
import {
  Target,
  Eye,
  Scale,
  ShieldCheck,
  Users,
  TrendingUp,
  GraduationCap,
  HeartPulse,
  Leaf,
  Gavel,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router";

export default function VisionPage() {
  const [activeTab, setActiveTab] = useState("vision");

  const coreValues = [
    {
      icon: <Scale />,
      title: "Democracy",
      desc: "Upholding free, fair, and transparent governance.",
    },
    {
      icon: <ShieldCheck />,
      title: "Integrity",
      desc: "Fighting corruption and serving with honesty.",
    },
    {
      icon: <Users />,
      title: "People First",
      desc: "Putting citizens' rights and voices at the center.",
    },
    {
      icon: <Gavel />,
      title: "Justice & Equality",
      desc: "Ensuring fairness and opportunity for all.",
    },
    {
      icon: <Users />,
      title: "National Unity",
      desc: "Strengthening harmony across all communities.",
    },
    {
      icon: <TrendingUp />,
      title: "Progress",
      desc: "Driving sustainable economic growth.",
    },
  ];

  const goals = [
    {
      icon: <Scale />,
      title: "Restore Democracy & Rule of Law",
      desc: "Free elections, independent judiciary, and protected civil liberties.",
    },
    {
      icon: <TrendingUp />,
      title: "Create Jobs & Strengthen Economy",
      desc: "Jobs through SMEs, investment, agriculture, and price stability.",
    },
    {
      icon: <GraduationCap />,
      title: "Youth, Education & Skills",
      desc: "Modern education, vocational training, and youth entrepreneurship.",
    },
    {
      icon: <HeartPulse />,
      title: "Healthcare & Social Protection",
      desc: "Affordable healthcare and strong social safety nets.",
    },
    {
      icon: <Leaf />,
      title: "Sustainable Development",
      desc: "Clean energy, climate resilience, and transparent governance.",
    },
    {
      icon: <Users />,
      title: "National Unity & Equal Rights",
      desc: "Equal dignity regardless of religion, region, or background.",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-green-50 via-white pt-20 to-green-50 min-h-screen">
      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://api.bnpbd.org/api/upload/images/tarique-rahman-b569.jpg"
          alt="BNP Vision"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 via-green-800/70 to-emerald-900/90" />

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl" />

        <div className="relative z-10 text-center max-w-5xl px-6">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-2 rounded-full my-8">
            <Sparkles className="w-4 h-4 text-green-300" />
            <span className="text-green-100 font-medium">
              Building Tomorrow, Together
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">
            Vision & Mission
          </h1>
          <div className="w-24 h-1.5 bg-gradient-to-r from-transparent via-green-400 to-transparent mx-auto mb-8" />

          <p className="text-2xl md:text-3xl text-green-50 leading-relaxed font-light mb-12">
            A Democratic, Prosperous & Inclusive Bangladesh
          </p>

          <div className="inline-block relative">
            <div className="absolute inset-0 bg-white/20 blur-xl rounded-full" />
            <div className="relative border-2 border-white/60 bg-white/10 backdrop-blur-md px-10 py-2.5 md:py-5 rounded-full">
              <p className="md:text-3xl font-bold text-white tracking-wide">
                "জনতার ক্ষমতা, রাষ্ট্রের শক্তি।"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TABS */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-md shadow-lg z-30 border-b border-gray-100">
        <div className="scrollbar-hide max-w-7xl mx-auto flex gap-2 md:gap-8 px-6 overflow-x-auto">
          {["vision", "mission", "values", "goals"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-5 px-4 font-semibold capitalize border-b-3 transition-all whitespace-nowrap ${
                activeTab === tab
                  ? "border-green-600 text-green-600 scale-105"
                  : "border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-24 space-y-24">
        {/* VISION */}
        {activeTab === "vision" && (
          <section className="space-y-10 animate-fadeIn">
            <div className="flex items-center gap-5 mb-8">
              <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-green-600 to-emerald-600 text-white rounded-2xl shadow-lg">
                <Eye className="w-8 h-8" />
              </div>
              <h2 className="text-5xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                Our Vision
              </h2>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-10 shadow-sm border border-green-100">
              <p className="text-lg text-green-700">
                To transform Bangladesh into a peaceful, stable, and democratic
                nation where economic self-reliance is secured and every citizen
                lives with dignity, freedom, and opportunity.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-10">
              {[
                "Accountable democratic institutions",
                "Economic opportunities for youth, farmers & workers",
                "Inclusive society across all communities",
                "Global respect rooted in national identity",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 bg-gradient-to-br from-green-700 via-emerald-600 to-emerald-700 rounded-2xl p-6 shadow hover:shadow-lg transition-shadow"
                >
                  <div className="w-8 h-8 flex items-center justify-center bg-emerald-50 text-emerald-600 rounded-lg flex-shrink-0 mt-1">
                    <span className="text-lg font-bold">✓</span>
                  </div>
                  <p className="text-lg text-white leading-relaxed mt-1">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* MISSION */}
        {activeTab === "mission" && (
          <section className="space-y-10 animate-fadeIn">
            <div className="flex items-center gap-5 mb-8">
              <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-green-600 to-emerald-600 text-white rounded-2xl shadow-lg">
                <Target className="w-8 h-8" />
              </div>
              <h2 className="text-5xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                Our Mission
              </h2>
            </div>

            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl blur opacity-20" />
              <div className="relative bg-white rounded-3xl p-10 shadow-lg border border-gray-100">
                <p className="text-2xl text-gray-600">
                  To restore genuine democratic governance, uphold sovereignty,
                  fight corruption, and empower all citizens through justice,
                  participation, and economic progress — leaving no one behind.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {[
                {
                  title: "Democratic Governance",
                  desc: "Free, fair, and transparent",
                },
                {
                  title: "Economic Empowerment",
                  desc: "Opportunities for all citizens",
                },
                {
                  title: "Social Justice",
                  desc: "Equality and dignity for everyone",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-green-700 via-emerald-600 to-emerald-700 rounded-2xl p-8 text-white shadow-lg hover:scale-105 transition-transform"
                >
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-green-50">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CORE VALUES */}
        {activeTab === "values" && (
          <section className="animate-fadeIn">
            <h2 className="text-5xl font-bold mb-4 text-center bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
              Core Values
            </h2>
            <p className="text-center text-gray-600 text-lg mb-16 max-w-2xl mx-auto">
              The principles that guide our every action and decision
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {coreValues.map((v, i) => (
                <div
                  key={i}
                  className="group bg-white rounded-3xl shadow-md p-8 border border-gray-100 hover:shadow-2xl hover:shadow-emerald-200 transition-all duration-300"
                >
                  <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-green-600 to-emerald-600 text-white rounded-2xl mb-6 group-hover:scale-110 transition-transform shadow-lg">
                    {React.cloneElement(v.icon, { className: "w-8 h-8" })}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-800">
                    {v.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* GOALS */}
        {activeTab === "goals" && (
          <section className="animate-fadeIn">
            <h2 className="text-5xl font-bold mb-4 text-center bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
              Strategic Goals for 2030
            </h2>
            <p className="text-center text-gray-600 text-lg mb-16 max-w-2xl mx-auto">
              Our roadmap for building a stronger, more prosperous Bangladesh
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {goals.map((g, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden bg-white rounded-3xl p-8 shadow-md border border-gray-100 hover:shadow-2xl transition-all duration-300"
                >
                  <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-green-600 to-emerald-600" />

                  <div className="flex gap-6">
                    <div className="w-14 h-14 flex items-center justify-center bg-green-50 text-green-600 rounded-2xl flex-shrink-0 group-hover:bg-gradient-to-br group-hover:from-green-600 group-hover:to-emerald-600 group-hover:text-white transition-all shadow-sm">
                      {React.cloneElement(g.icon, { className: "w-7 h-7" })}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-3 text-gray-800">
                        {g.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">{g.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* CTA */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-emerald-700 text-emerald-100 py-24 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-2 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-green-200" />
            <span className="text-green-100 font-medium">Join Our Journey</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            A Bangladesh for All
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-transparent via-green-300 to-transparent mx-auto mb-8" />

          <p className="text-xl md:text-2xl leading-relaxed mb-12 text-green-50 font-light max-w-3xl mx-auto">
            By 2030, BNP envisions a democratic, economically strong, and
            socially just Bangladesh where every citizen lives with dignity,
            hope, and opportunity.
          </p>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Share Your Dreams with Us
            </h3>
            <p className="text-green-100 mb-6">
              Your voice matters. Share your aspirations for Bangladesh and be
              part of building our nation's future.
            </p>

            <Link to="/contact">
              <button className="cursor-pointer group bg-white text-green-700 px-6 md:px-10 py-2.5 md:py-5 rounded-full font-bold text-lg hover:bg-green-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105 flex items-center gap-3 mx-auto">
                Share Your Vision
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
