import React, { useState } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("vision");

  const coreValues = [
    {
      icon: <Scale />,
      title: t('vision_value_democracy'),
      desc: t('vision_value_democracy_desc'),
    },
    {
      icon: <ShieldCheck />,
      title: t('vision_value_integrity'),
      desc: t('vision_value_integrity_desc'),
    },
    {
      icon: <Users />,
      title: t('vision_value_people'),
      desc: t('vision_value_people_desc'),
    },
    {
      icon: <Gavel />,
      title: t('vision_value_justice'),
      desc: t('vision_value_justice_desc'),
    },
    {
      icon: <Users />,
      title: t('vision_value_unity'),
      desc: t('vision_value_unity_desc'),
    },
    {
      icon: <TrendingUp />,
      title: t('vision_value_progress'),
      desc: t('vision_value_progress_desc'),
    },
  ];

  const goals = [
    {
      icon: <Scale />,
      title: t('vision_goal_democracy'),
      desc: t('vision_goal_democracy_desc'),
    },
    {
      icon: <TrendingUp />,
      title: t('vision_goal_jobs'),
      desc: t('vision_goal_jobs_desc'),
    },
    {
      icon: <GraduationCap />,
      title: t('vision_goal_youth'),
      desc: t('vision_goal_youth_desc'),
    },
    {
      icon: <HeartPulse />,
      title: t('vision_goal_health'),
      desc: t('vision_goal_health_desc'),
    },
    {
      icon: <Leaf />,
      title: t('vision_goal_sustainable'),
      desc: t('vision_goal_sustainable_desc'),
    },
    {
      icon: <Users />,
      title: t('vision_goal_equality'),
      desc: t('vision_goal_equality_desc'),
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
              {t('vision_hero_badge')}
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">
            {t('vision_hero_title')}
          </h1>
          <div className="w-24 h-1.5 bg-gradient-to-r from-transparent via-green-400 to-transparent mx-auto mb-8" />

          <p className="text-2xl md:text-3xl text-green-50 leading-relaxed font-light mb-12">
            {t('vision_hero_subtitle')}
          </p>

          <div className="inline-block relative">
            <div className="absolute inset-0 bg-white/20 blur-xl rounded-full" />
            <div className="relative border-2 border-white/60 bg-white/10 backdrop-blur-md px-10 py-2.5 md:py-5 rounded-full">
              <p className="md:text-3xl font-bold text-white tracking-wide">
                {t('vision_hero_tagline')}
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
              className={`py-5 px-4 font-semibold capitalize border-b-3 transition-all whitespace-nowrap ${activeTab === tab
                ? "border-green-600 text-green-600 scale-105"
                : "border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300"
                }`}
            >
              {t(`vision_tab_${tab}`)}
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
                {t('vision_our_vision')}
              </h2>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-10 shadow-sm border border-green-100">
              <p className="text-lg text-green-700">
                {t('vision_our_vision_desc')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-10">
              {[
                t('vision_point_1'),
                t('vision_point_2'),
                t('vision_point_3'),
                t('vision_point_4'),
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
                {t('vision_our_mission')}
              </h2>
            </div>

            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl blur opacity-20" />
              <div className="relative bg-white rounded-3xl p-10 shadow-lg border border-gray-100">
                <p className="text-2xl text-gray-600">
                  {t('vision_our_mission_desc')}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {[
                {
                  title: t('vision_mission_pillar_1'),
                  desc: t('vision_mission_pillar_1_desc'),
                },
                {
                  title: t('vision_mission_pillar_2'),
                  desc: t('vision_mission_pillar_2_desc'),
                },
                {
                  title: t('vision_mission_pillar_3'),
                  desc: t('vision_mission_pillar_3_desc'),
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
              {t('vision_core_values')}
            </h2>
            <p className="text-center text-gray-600 text-lg mb-16 max-w-2xl mx-auto">
              {t('vision_core_values_desc')}
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
              {t('vision_strategic_goals')}
            </h2>
            <p className="text-center text-gray-600 text-lg mb-16 max-w-2xl mx-auto">
              {t('vision_strategic_goals_desc')}
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
            <span className="text-green-100 font-medium">{t('vision_cta_badge')}</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            {t('vision_cta_title')}
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-transparent via-green-300 to-transparent mx-auto mb-8" />

          <p className="text-xl md:text-2xl leading-relaxed mb-12 text-green-50 font-light max-w-3xl mx-auto">
            {t('vision_cta_desc')}
          </p>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              {t('vision_cta_share_title')}
            </h3>
            <p className="text-green-100 mb-6">
              {t('vision_cta_share_desc')}
            </p>

            <Link to="/contact">
              <button className="cursor-pointer group bg-white text-green-700 px-6 md:px-10 py-2.5 md:py-5 rounded-full font-bold text-lg hover:bg-green-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105 flex items-center gap-3 mx-auto">
                {t('vision_cta_button')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
