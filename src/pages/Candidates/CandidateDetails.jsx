import {
  Calendar,
  MapPin,
  Briefcase,
  GraduationCap,
  Map,
  User,
  Flag,
} from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router";
import fallbackImage from "../../assets/logo.png";

export default function CandidateDetails() {
  const { state: details } = useLocation();
  const [activeTab, setActiveTab] = useState("details");

  if (!details) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-600 font-semibold">
          No candidate details available
        </p>
      </div>
    );
  }

  const bigImage =
    details.photos && details.photos.length > 0
      ? details.photos[0]
      : "https://via.placeholder.com/400";

  return (
    <div className="min-h-screen">
      {/* HEADER SECTION */}
      <div className="bg-white mt-10">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <img
              src={bigImage}
              alt={details.name}
              className="w-full md:w-96 h-96 object-cover rounded-xl shadow"
              onError={(e) => (e.currentTarget.src = fallbackImage)}
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {details.name}
              </h1>

              {/* Position and Category */}
              <div className="flex flex-wrap gap-2 items-center mb-3">
                {details.position && (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {details.position}
                  </span>
                )}
                {details.category && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {details.category}
                  </span>
                )}
              </div>

              {/* Portfolio Section */}
              {details.portfolio && (
                <div className="mb-4">
                  {details.portfolio.latest &&
                    details.portfolio.latest.length > 0 && (
                      <div className="mb-2">
                        <p className="text-sm text-gray-500">
                          Current Position
                        </p>
                        <ul className="list-disc list-inside text-gray-900">
                          {details.portfolio.latest.map((position, idx) => (
                            <li key={idx} className="text-base">
                              {position}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  {details.portfolio.previous &&
                    details.portfolio.previous.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-500">
                          Previous Positions
                        </p>
                        <ul className="list-disc list-inside text-gray-900">
                          {details.portfolio.previous.map((position, idx) => (
                            <li key={idx} className="text-base">
                              {position}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              )}

              <p className="text-gray-500 font-semibold my-3">
                {details?.designations?.map((designation, idx) => (
                  <span key={idx}>{designation} | </span>
                ))}
              </p>

              {/* {details.personalInfo?.birthDate && (
                <div className="flex items-center gap-2 mb-3 text-gray-600">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <p className="text-sm font-medium">
                    Date of Birth: {details.personal_info.birth_date}
                  </p>
                </div>
              )} */}

              {details.overall_summary && (
                <p className="text-gray-700 text-justify mt-5">
                  {details.overall_summary}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* TABS SECTION */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white rounded-xl">
          {/* Tab Buttons */}
          <div className="flex border-b border-gray-200 shadow">
            {["details", "political", "activities"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 text-xs sm:text-sm md:text-base text-center font-semibold ${
                  activeTab === tab
                    ? "bg-gray-100 border-gray-400 text-gray-600"
                    : "text-gray-600"
                }`}
              >
                {tab === "details"
                  ? "Details"
                  : tab === "political"
                  ? "Political Career"
                  : "Activity Highlights"}
              </button>
            ))}
          </div>

          {/* TAB CONTENT */}
          <div className="p-6">
            {/* DETAILS TAB */}
            {activeTab === "details" && (
              <div className="space-y-6">
                {/* Personal Info */}
                {details.personal_info && (
                  <section>
                    <h2 className="md:text-lg lg:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <User className="w-6 h-6 text-gray-500" />
                      Personal Information
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {details.personal_info.birth_date && (
                        <div className="flex items-start gap-3">
                          <Calendar className="w-5 h-5 text-gray-500 mt-1" />
                          <div>
                            <p className="text-sm text-gray-500">Birth Date</p>
                            <span className="text-gray-900 font-medium">
                              {details.personal_info.birth_date}
                            </span>
                          </div>
                        </div>
                      )}
                      {details.personal_info.birth_place && (
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                          <div>
                            <p className="text-sm text-gray-500">Birth Place</p>
                            <span className="text-gray-900 font-medium">
                              {details.personal_info.birth_place}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* {details.personalInfo.nationality && (
                        <div className="flex items-start gap-3">
                          <Flag className="w-5 h-5 text-gray-500 mt-1" />
                          <div>
                            <p className="text-sm text-gray-500">Nationality</p>
                            <span className="text-gray-900 font-medium">
                              {details.personal_info.nationality}
                            </span>
                          </div>
                        </div>
                      )} */}
                      {/* Election Constituency */}
                    </div>
                  </section>
                )}
                {details.election_constituencies &&
                  details.election_constituencies.length > 0 && (
                    <section>
                      <h2 className="md:text-lg lg:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Map className="w-6 h-6 text-gray-500" />
                        Election Constituencies
                      </h2>
                      <div className="space-y-4  md:w-[50%]">
                        {details.election_constituencies.map(
                          (constituency, idx) => (
                            <div
                              key={idx}
                              className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500"
                            >
                              <p className="text-lg font-semibold text-gray-900">
                                {constituency.actual_place_name}
                              </p>
                              <p className="text-gray-600 mt-1">
                                Area: {constituency.election_area_name}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    </section>
                  )}

                {/* Education */}
                {details.academic_career && (
                  <section>
                    <h2 className="md:text-lg lg:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <GraduationCap className="w-6 h-6 text-gray-500" />
                      Education
                    </h2>
                    <div className="space-y-2">
                      {details.academic_career.schools && (
                        <p className="text-gray-900">
                          Schools: {details.academic_career.schools.join(", ")}
                        </p>
                      )}
                      {details.academic_career.college && (
                        <p className="text-gray-900">
                          College: {details.academic_career.college}
                        </p>
                      )}
                      {details.academic_career.degree && (
                        <p className="text-gray-900">
                          Degree: {details.academic_career.degree}
                        </p>
                      )}
                    </div>
                  </section>
                )}
              </div>
            )}

            {/* POLITICAL TAB */}
            {activeTab === "political" && (
              <div className="space-y-6">
                {Array.isArray(details.political_career) &&
                details.political_career.length > 0 ? (
                  <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Briefcase className="w-6 h-6 text-gray-500" />
                      Political Journey
                    </h2>

                    <div className="space-y-4">
                      {details.political_career.map((career, idx) => (
                        <div
                          key={idx}
                          className="border-l-4 border-green-600 pl-4 py-3 bg-gray-50 rounded-r-lg"
                        >
                          <p className="text-sm font-semibold text-green-700">
                            {career.year}
                          </p>
                          <p className="text-gray-800 mt-1">{career.event}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                ) : (
                  <p className="text-gray-600">
                    No political career information available.
                  </p>
                )}
              </div>
            )}

            {/* ACTIVITIES TAB */}
            {activeTab === "activities" && (
              <div className="space-y-6">
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Current Activities
                  </h2>
                  <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                    <p className="text-gray-700 leading-relaxed">
                      {details.life_activities ||
                        "No recent activity recorded."}
                    </p>
                  </div>
                </section>

                {details.other_income_sources &&
                  details.other_income_sources.length > 0 && (
                    <section>
                      <h2 className="text-xl font-bold text-gray-900 mb-3">
                        Other Activities & Income Sources
                      </h2>
                      <ul className="list-disc list-inside space-y-2">
                        {details.other_income_sources.map((source, idx) => (
                          <li key={idx} className="text-gray-700">
                            {source}
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}

                {details.social_links && details.social_links.length > 0 && (
                  <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">
                      Social Media & Web Presence
                    </h2>
                    <div className="flex flex-wrap gap-3">
                      {details.social_links.map((link, idx) => (
                        <a
                          key={idx}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-blue-600 hover:bg-blue-50 transition-colors"
                        >
                          Visit Official Website
                        </a>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
