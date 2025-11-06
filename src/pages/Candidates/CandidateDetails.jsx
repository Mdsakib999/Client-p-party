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

              <p className="text-gray-500 font-semibold my-3">
                {details?.designations?.map((designation, idx) => (
                  <span key={idx}>{designation} | </span>
                ))}
              </p>

              {details.personal_info?.birth_date && (
                <div className="flex items-center gap-2 mb-3 text-gray-600">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <p className="text-sm font-medium">
                    Date of Birth: {details.personal_info.birth_date}
                  </p>
                </div>
              )}

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
                    : "text-gray-400"
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
                      {details.personal_info.nationality && (
                        <div className="flex items-start gap-3">
                          <Flag className="w-5 h-5 text-gray-500 mt-1" />
                          <div>
                            <p className="text-sm text-gray-500">Nationality</p>
                            <span className="text-gray-900 font-medium">
                              {details.personal_info.nationality}
                            </span>
                          </div>
                        </div>
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

                {/* Election Constituencies */}
                {details.election_constituencies && (
                  <section>
                    <h2 className="md:text-lg lg:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Map className="w-6 h-6 text-gray-500" />
                      Election Constituencies
                    </h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-900">
                      {details.election_constituencies.map((item, idx) => (
                        <ul key={idx}>
                          <li className="font-semibold">
                            Place : {item.actual_place_name}
                          </li>
                          <li className="font-semibold">
                            Area : {item.election_area_name}
                          </li>
                        </ul>
                      ))}
                    </ul>
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
                          className="border-l-4 border-gray-600 pl-4 py-2"
                        >
                          <p className="text-sm text-gray-500">{career.year}</p>
                          <p className="text-gray-800">{career.event}</p>
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
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Activity Highlights
                </h2>
                <p className="text-gray-700">
                  {details.life_activities || "No recent activity recorded."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
