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
const fallbackImage = "/logo.png?url";

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
      <div className="bg-white mt-10">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <img
              src={bigImage}
              alt={details.name}
              className="w-full md:w-96 h-96 object-cover rounded-xl shadow"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {details.name}
              </h1>
              <p className="text-gray-500 font-semibold my-3">
                {details?.designations?.map((designation) => (
                  <span key={designation}>{designation} | </span>
                ))}
              </p>
              {details.personalInfo?.birthDate && (
                <div className="flex items-center gap-2 mb-3 text-gray-600">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <p className="text-sm font-medium">
                    Date of Birth : {details.personalInfo.birthDate}
                  </p>
                </div>
              )}
              {details.overallSummary && (
                <p className="text-gray-700 text-justify mt-5">
                  {details.overallSummary}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white rounded-xl">
          <div className="flex border-b border-gray-200 shadow">
            <button
              onClick={() => setActiveTab("details")}
              className={`flex-1 py-4 text-xs sm:text-sm md:text-base text-center text-gray-400 font-semibold ${
                activeTab === "details"
                  ? "bg-gray-100  border-gray-400 text-gray-600"
                  : "text-gray-400"
              }`}
            >
              Details
            </button>
            <button
              onClick={() => setActiveTab("political")}
              className={`flex-1 text-xs sm:text-sm md:text-base py-4 text-center text-gray-400 font-semibold ${
                activeTab === "political"
                  ? "bg-gray-100  border-gray-400 text-gray-600"
                  : "text-gray-400"
              }`}
            >
              Political Career
            </button>
            <button
              onClick={() => setActiveTab("activities")}
              className={`flex-1 py-4 text-xs sm:text-sm md:text-base text-center text-gray-400 font-semibold ${
                activeTab === "activities"
                  ? "bg-gray-100  border-gray-400 text-gray-600"
                  : "text-gray-400"
              }`}
            >
              Activity Highlights
            </button>
          </div>
          <div className="p-6">
            {activeTab === "details" && (
              <div className="space-y-6">
                {/* Personal Information */}
                {details.personalInfo && (
                  <div>
                    <h2 className="md:text-lg lg:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <User className="w-6 h-6 text-gray-500" />
                      Personal Information
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {details.personalInfo.birthPlace && (
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                          <div>
                            <p className="text-sm text-gray-500">Birth Place</p>
                            <span className="text-gray-900 font-medium">
                              {details.personalInfo.birthPlace}
                            </span>
                          </div>
                        </div>
                      )}
                      {details.personalInfo.nationality && (
                        <div className="flex items-start gap-3">
                          <Flag className="w-5 h-5 text-gray-500 mt-1" />
                          <div>
                            <p className="text-sm text-gray-500">Nationality</p>
                            <span className="text-gray-900 font-medium">
                              {details.personalInfo.nationality}
                            </span>
                          </div>
                        </div>
                      )}
                      {details.personalInfo.maritalStatus && (
                        <div>
                          <p className="text-sm text-gray-500">
                            Marital Status
                          </p>
                          <p className="text-gray-900 font-medium">
                            {details.personalInfo.maritalStatus}
                          </p>
                        </div>
                      )}
                      {details.personalInfo.spouse && (
                        <div>
                          <p className="text-sm text-gray-500">Spouse</p>
                          <p className="text-gray-900 font-medium">
                            {details.personalInfo.spouse}
                          </p>
                        </div>
                      )}
                      {details.personalInfo.children && (
                        <div>
                          <p className="text-sm text-gray-500">Children</p>
                          <p className="text-gray-900 font-medium">
                            {Array.isArray(details.personalInfo.children)
                              ? details.personalInfo.children.join(", ")
                              : details.personalInfo.children}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {details.academicCareer && (
                  <div>
                    <h2 className="md:text-lg lg:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <GraduationCap className="w-6 h-6 text-gray-500" />
                      Education
                    </h2>
                    <div className="space-y-3">
                      {details.academicCareer.schools &&
                        details.academicCareer.schools.length > 0 && (
                          <div>
                            <p className="text-sm text-gray-500 mb-1">
                              Schools
                            </p>
                            {details.academicCareer.schools.map(
                              (school, idx) => (
                                <p
                                  key={idx}
                                  className="text-gray-900 font-medium"
                                >
                                  {school}
                                </p>
                              )
                            )}
                          </div>
                        )}
                      {details.academicCareer.college && (
                        <div>
                          <p className="text-sm text-gray-500 mb-1">College</p>
                          <p className="text-gray-900 font-medium">
                            {details.academicCareer.college}
                          </p>
                        </div>
                      )}
                      {details.academicCareer.university && (
                        <div>
                          <p className="text-sm text-gray-500 mb-1">
                            University
                          </p>
                          <p className="text-gray-900 font-medium">
                            {details.academicCareer.university}
                          </p>
                        </div>
                      )}
                      {details.academicCareer.degree && (
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Degree</p>
                          <p className="text-gray-900 font-medium">
                            {details.academicCareer.degree}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {/* Election Constituency */}
                {details.electionConstituency && (
                  <div>
                    <h2 className="md:text-lg lg:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Map className="w-6 h-6 text-gray-500" />
                      Election Constituency
                    </h2>
                    <p className="text-gray-900 font-medium">
                      {details.electionConstituency}
                    </p>
                  </div>
                )}
              </div>
            )}
            {activeTab === "political" && (
              <div>
                {/* Professional Career */}
                {details.professionalCareer &&
                  details.professionalCareer.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Briefcase className="w-6 h-6 text-gray-500" />
                        Political Career
                      </h2>
                      <div className="space-y-4">
                        {details.professionalCareer.map((career, idx) => (
                          <div
                            key={idx}
                            className="border-l-4 border-gray-600 pl-4 py-2"
                          >
                            <p className="text-lg font-semibold text-gray-900">
                              {career.type}
                            </p>
                            {career.timeline.map((item, index) => (
                              <div key={index} className="mt-2">
                                <p className="text-sm text-gray-500">
                                  {item.year}
                                </p>
                                <p className="text-gray-700">{item.event}</p>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            )}
            {activeTab === "activities" && (
              <div className="space-y-6">
                {/* Activities */}
                {details.activities && details.activities.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      Activities
                    </h2>
                    <div className="space-y-3">
                      {details.activities.map((activity, idx) => (
                        <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                          <p className="font-semibold text-gray-900">
                            {activity.title}
                          </p>
                          <p className="text-gray-700 mt-1">
                            {activity.description}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {activity.date}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {details.highlights && details.highlights.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      Highlights
                    </h2>
                    <div className="space-y-2">
                      {details.highlights.map((highlight, idx) => (
                        <p key={idx} className="text-gray-700">
                          • {highlight}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
                {details.controversies && details.controversies.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      Controversies
                    </h2>
                    <div className="space-y-4">
                      {details.controversies.map((controversy, idx) => (
                        <div key={idx} className="p-4 bg-gray-100 rounded-lg">
                          <p className="font-semibold text-gray-900">
                            {controversy.title}
                          </p>
                          <p className="text-gray-700 mt-2">
                            {controversy.details}
                          </p>
                          {controversy.verdict && (
                            <p className="text-sm mt-2 font-medium">
                              {controversy.verdict}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-[#DCFFD4]/50 rounded-xl shadow-md p-4 sm:p-6">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center md:text-left mb-4 leading-tight">
            <p>Recent Activities of</p>
            <p>{details.name}</p>
          </h2>

          <div className="flex flex-col-reverse lg:flex-row gap-6 mt-10">
            <div className="space-y-4 w-full lg:w-1/3">
              {details.recentActivities &&
                details.recentActivities.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                      Highlights
                    </h2>
                    <div className="space-y-3">
                      {details.recentActivities.map((activity, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col sm:flex-row items-center sm:items-start gap-3 p-2 rounded-lg"
                        >
                          <img
                            className="w-full sm:w-40 h-32 sm:h-24 object-cover shadow rounded-lg"
                            src={activity?.image || fallbackImage}
                            alt={activity?.title || "Activity image"}
                            onError={(e) => {
                              e.currentTarget.src = fallbackImage;
                            }}
                          />

                          <div className="text-center sm:text-left">
                            <p className="font-bold text-gray-900 text-sm sm:text-base">
                              {activity.title}
                            </p>
                            <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2">
                              <p className="text-gray-700 text-xs sm:text-sm">
                                {activity.channel}
                              </p>
                              <p className="text-xs text-gray-500">
                                {activity.date}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="font-extrabold text-lg sm:text-xl mt-4 text-center sm:text-left">
                      See More+
                    </p>
                  </div>
                )}
            </div>

            <div className="relative w-full lg:w-2/3 flex items-stretch">
              <img
                src={details.photos[0]}
                alt={`${details.name}'s photo`}
                className="w-full h-auto max-h-[600px] object-cover rounded-xl shadow-md brightness-[0.6]"
              />
              <div className="absolute inset-0 flex flex-col justify-center text-white pl-8">
                <p className="max-w-20 w-16 sm:w-20 font-bold bg-white text-black rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm mb-3">
                  politics
                </p>
                <p className="max-w-2/3 text-lg sm:text-2xl md:text-3xl lg:text-5xl font-semibold mb-2">
                  {details.recentActivities?.[0]?.title}
                </p>
                <p className="max-w-md text-xs sm:text-base text-gray-200 sm:mt-2.5">
                  BNP leaders discussed national reform policies and their
                  recent political movements focusing on youth involvement and
                  fair governance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
