import {
  Calendar,
  MapPin,
  Briefcase,
  GraduationCap,
  Map,
  User,
} from "lucide-react";
import { useState } from "react";
import { useLocation, useParams } from "react-router";
import { useGetCandidateByIdQuery } from "../../redux/features/candidate/candidate.api";
import BNPLoader from "../../utils/BNPLoader";

export default function CandidateDetails() {
  const { state: details } = useLocation();
  const [activeTab, setActiveTab] = useState("details");
  const { id } = useParams();

  const { data: candidateRes, isLoading } = useGetCandidateByIdQuery(id);
  const candidate = candidateRes?.data || details;

  if (isLoading) {
    return <BNPLoader />
  }

  if (!candidate) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-600 font-semibold">
          No candidate details available
        </p>
      </div>
    );
  }

  const bigImage =
    candidate.photos?.[0]?.secure_url ||
    candidate.photos?.[0]?.url ||
    "https://img.freepik.com/premium-vector/user-icon-vector_1272330-86.jpg";

  return (
    <div className="min-h-screen">
      {/* HEADER */}
      <div className="bg-white mt-10">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <img
              src={bigImage}
              alt={candidate.name}
              className="w-full md:w-96 h-96 object-cover rounded-xl shadow"
              onError={(e) =>
              (e.currentTarget.src =
                "https://img.freepik.com/premium-vector/user-icon-vector_1272330-86.jpg")
              }
            />

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {candidate.name}
              </h1>

              <div className="flex flex-wrap gap-2 mb-3">
                {candidate.designation && (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {candidate.designation}
                  </span>
                )}
                {candidate.profession && (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {candidate.profession}
                  </span>
                )}
              </div>

              {Array.isArray(candidate.previous_designations) &&
                candidate.previous_designations.length > 0 && (
                  <p className="text-green-800 font-semibold my-3">
                    {candidate.previous_designations.join(" | ")}
                  </p>
                )}

              {candidate.overall_summary && (
                <p className="text-gray-700 text-justify mt-5">
                  {candidate.overall_summary}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl">
          <div className="flex border-b shadow">
            {["details", "political", "activities"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 font-semibold ${activeTab === tab
                  ? "bg-gray-100 text-gray-700"
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

          <div className="p-6">
            {/* DETAILS */}
            {activeTab === "details" && (
              <div className="space-y-6">
                {candidate.personal_info && (
                  <section>
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                      <User className="w-10 h-10 text-green-800 bg-green-50 p-2 rounded-full" />
                      Personal Information
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {candidate.personal_info.birth_date && (
                        <div className="flex gap-3">
                          <Calendar className="w-10 h-10 bg-green-700 text-white p-2 rounded-md" />
                          <div>
                            <p className="text-sm text-gray-500">Birth Date</p>
                            <p className="font-medium">
                              {candidate.personal_info.birth_date}
                            </p>
                          </div>
                        </div>
                      )}

                      {candidate.personal_info.birth_place && (
                        <div className="flex gap-3">
                          <MapPin className="w-10 h-10 bg-green-700 text-white p-2 rounded-md" />
                          <div>
                            <p className="text-sm text-gray-500">Birth Place</p>
                            <p className="font-medium">
                              {candidate.personal_info.birth_place}
                            </p>
                          </div>
                        </div>
                      )}
                      {/* {candidate.personal_info.nationality && (
                        <p>
                          <strong>Nationality:</strong>{" "}
                          {candidate.personal_info.nationality}
                        </p>
                      )} */}
                    </div>
                  </section>
                )}

                {Array.isArray(candidate.election_constituencies) &&
                  candidate.election_constituencies.length > 0 && (
                    <section>
                      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <Map className="w-10 h-10 text-green-800 bg-green-50 p-2 rounded-full" />
                        Election Constituencies
                      </h2>

                      <div className="space-y-4 md:w-1/2">
                        {candidate.election_constituencies.map((c, idx) => (
                          <div
                            key={idx}
                            className="bg-green-50 p-4 rounded-lg border-l-4 border-green-600"
                          >
                            <p className="font-semibold">
                              {c.actual_place_name}
                            </p>
                            <p className="text-gray-600">
                              {c.election_area_name}
                            </p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                {candidate.academic_career && (
                  <section>
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                      <GraduationCap className="w-10 h-10 text-green-800 bg-green-50 p-2 rounded-full" />
                      Education
                    </h2>

                    <div className="space-y-2">
                      {candidate.academic_career.schools?.length > 0 && (
                        <p>
                          <strong>Schools:</strong>{" "}
                          {candidate.academic_career.schools.join(", ")}
                        </p>
                      )}
                      {candidate.academic_career.college && (
                        <p>
                          <strong>College:</strong>{" "}
                          {candidate.academic_career.college}
                        </p>
                      )}
                      {candidate.academic_career.university?.length > 0 && (
                        <p>
                          <strong>University:</strong>{" "}
                          {candidate.academic_career.university.join(", ")}
                        </p>
                      )}
                      {candidate.academic_career.degree?.length > 0 && (
                        <p>
                          <strong>Degree:</strong>{" "}
                          {candidate.academic_career.degree.join(", ")}
                        </p>
                      )}
                    </div>
                  </section>
                )}
              </div>
            )}

            {/* POLITICAL */}
            {activeTab === "political" && (
              <div className="space-y-6">
                {Array.isArray(candidate.political_career) &&
                  candidate.political_career.length > 0 ? (
                  <section>
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                      <Briefcase className="w-10 h-10 text-green-800 bg-green-50 p-2 rounded-full" />
                      Political Journey
                    </h2>

                    <div className="space-y-4">
                      {candidate.political_career.map((p, idx) => (
                        <div
                          key={idx}
                          className="border-l-4 border-green-600 pl-4 py-3 bg-gray-50 rounded-r-lg"
                        >
                          <p className="text-sm font-semibold text-green-700">
                            {p.year}
                          </p>
                          <p className="text-gray-800">{p.event}</p>
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

            {/* ACTIVITIES */}
            {activeTab === "activities" && (
              <div className="space-y-6">
                <section>
                  <h2 className="text-2xl font-bold mb-4">
                    Current Activities
                  </h2>
                  <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                    <p>
                      {candidate.life_activities ||
                        "No recent activity recorded."}
                    </p>
                  </div>
                </section>

                {Array.isArray(
                  candidate.business_income_source_professional_career
                ) &&
                  candidate.business_income_source_professional_career.length >
                  0 && (
                    <section>
                      <h2 className="text-xl font-bold mb-3">
                        Business / Income Sources
                      </h2>
                      <ul className="list-disc list-inside space-y-2">
                        {candidate.business_income_source_professional_career.map(
                          (s, idx) => (
                            <li key={idx}>{s}</li>
                          )
                        )}
                      </ul>
                    </section>
                  )}

                {Array.isArray(
                  candidate.personal_info?.website_or_social
                ) &&
                  candidate.personal_info.website_or_social.length > 0 && (
                    <section>
                      <h2 className="text-xl font-bold mb-3">
                        Web Presence
                      </h2>
                      <div className="flex flex-wrap gap-3">
                        {candidate.personal_info.website_or_social.map(
                          (link, idx) => (
                            <a
                              key={idx}
                              href={link}
                              target="_blank"
                              rel="noreferrer"
                              className="px-4 py-2 border rounded-lg text-green-600 hover:bg-green-50"
                            >
                              Visit Website
                            </a>
                          )
                        )}
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

// // FROM JSON
// import { Calendar, MapPin, GraduationCap, Map, User } from "lucide-react";
// import { useState } from "react";
// import { useLocation } from "react-router";

// export default function CandidateDetails() {
//   const { state: candidate } = useLocation();
//   const [activeTab, setActiveTab] = useState("details");

//   if (!candidate) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <p className="text-lg text-gray-600 font-semibold">
//           No candidate details available
//         </p>
//       </div>
//     );
//   }

//   const bigImage =
//     candidate.photos?.[0] ||
//     "https://img.freepik.com/premium-vector/user-icon-vector_1272330-86.jpg";

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* HEADER */}
//       <section className="bg-white py-10">
//         <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-10">
//           {/* IMAGE */}
//           <img
//             src={bigImage}
//             alt={candidate.name}
//             className="w-full md:w-80 h-80 object-cover rounded-xl shadow-md"
//             onError={(e) =>
//             (e.currentTarget.src =
//               "https://img.freepik.com/premium-vector/user-icon-vector_1272330-86.jpg")
//             }
//           />

//           {/* INFO */}
//           <div className="flex-1">
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">
//               {candidate.name}
//             </h1>

//             <div className="flex flex-wrap gap-2 mb-4">
//               {candidate.position && (
//                 <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
//                   {candidate.position}
//                 </span>
//               )}
//               {candidate.category && (
//                 <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
//                   {candidate.category}
//                 </span>
//               )}
//             </div>

//             {Array.isArray(candidate.designations) && (
//               <p className="text-green-700 font-semibold mb-4">
//                 {candidate.designations.join(" | ")}
//               </p>
//             )}

//             {candidate.overall_summary && (
//               <p className="text-gray-700 leading-relaxed text-justify">
//                 {candidate.overall_summary}
//               </p>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* TABS */}
//       <section className="max-w-7xl mx-auto px-4 py-8">
//         <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//           {/* TAB HEADER */}
//           <div className="flex border-b bg-gray-50">
//             {["details", "political", "activities"].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`flex-1 py-4 text-sm font-semibold transition
//                   ${activeTab === tab
//                     ? "bg-white text-green-700 border-b-2 border-green-700"
//                     : "text-gray-600 hover:text-gray-800"
//                   }`}
//               >
//                 {tab === "details"
//                   ? "Personal Details"
//                   : tab === "political"
//                     ? "Political Career"
//                     : "Activities"}
//               </button>
//             ))}
//           </div>

//           {/* TAB CONTENT */}
//           <div className="p-6">
//             {/* DETAILS */}
//             {activeTab === "details" && (
//               <div className="space-y-8">
//                 {/* PERSONAL INFO */}
//                 {candidate.personal_info && (
//                   <section>
//                     <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
//                       <User className="w-8 h-8 text-green-700 bg-green-50 p-1.5 rounded-full" />
//                       Personal Information
//                     </h2>

//                     <div className="grid sm:grid-cols-2 gap-5">
//                       {candidate.personal_info.birth_date && (
//                         <InfoItem
//                           icon={<Calendar />}
//                           label="Birth Date"
//                           value={candidate.personal_info.birth_date}
//                         />
//                       )}
//                       {candidate.personal_info.birth_place && (
//                         <InfoItem
//                           icon={<MapPin />}
//                           label="Birth Place"
//                           value={candidate.personal_info.birth_place}
//                         />
//                       )}
//                     </div>
//                   </section>
//                 )}

//                 {/* CONSTITUENCY */}
//                 {candidate.election_constituencies?.length > 0 && (
//                   <section>
//                     <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
//                       <Map className="w-8 h-8 text-green-700 bg-green-50 p-1.5 rounded-full" />
//                       Election Constituency
//                     </h2>

//                     {candidate.election_constituencies.map((c, idx) => (
//                       <div
//                         key={idx}
//                         className="bg-green-50 p-4 rounded-lg border-l-4 border-green-600"
//                       >
//                         <p className="font-semibold">{c.actual_place_name}</p>
//                         <p className="text-gray-600">{c.election_area_name}</p>
//                       </div>
//                     ))}
//                   </section>
//                 )}

//                 {/* EDUCATION */}
//                 {candidate.academic_career && (
//                   <section>
//                     <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
//                       <GraduationCap className="w-8 h-8 text-green-700 bg-green-50 p-1.5 rounded-full" />
//                       Education
//                     </h2>

//                     <div className="space-y-2 text-gray-800">
//                       {candidate.academic_career.schools?.length > 0 && (
//                         <p>
//                           <strong>Schools:</strong>{" "}
//                           {candidate.academic_career.schools.join(", ")}
//                         </p>
//                       )}
//                       {candidate.academic_career.college && (
//                         <p>
//                           <strong>College:</strong>{" "}
//                           {candidate.academic_career.college}
//                         </p>
//                       )}
//                       {candidate.academic_career.university && (
//                         <p>
//                           <strong>University:</strong>{" "}
//                           {candidate.academic_career.university}
//                         </p>
//                       )}
//                       {candidate.academic_career.degree && (
//                         <p>
//                           <strong>Degree:</strong>{" "}
//                           {candidate.academic_career.degree}
//                         </p>
//                       )}
//                     </div>
//                   </section>
//                 )}
//               </div>
//             )}

//             {/* POLITICAL */}
//             {activeTab === "political" && (
//               <div className="space-y-6">
//                 {candidate.political_career?.length > 0 ? (
//                   candidate.political_career.map((p, idx) => (
//                     <div
//                       key={idx}
//                       className="bg-gray-50 border-l-4 border-green-600 p-4 rounded-r-lg"
//                     >
//                       <p className="text-sm font-semibold text-green-700">
//                         {p.year}
//                       </p>
//                       <p className="text-gray-800">{p.event}</p>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-gray-600">
//                     No political career information available.
//                   </p>
//                 )}
//               </div>
//             )}

//             {/* ACTIVITIES */}
//             {activeTab === "activities" && (
//               <div className="space-y-6">
//                 <div className="bg-green-50 p-6 rounded-lg">
//                   <p className="text-gray-800 leading-relaxed">
//                     {candidate.life_activities ||
//                       "No recent activity recorded."}
//                   </p>
//                 </div>

//                 {candidate.social_links?.length > 0 && (
//                   <div className="flex flex-wrap gap-3">
//                     {candidate.social_links.map((link, idx) => (
//                       <a
//                         key={idx}
//                         href={link}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="px-4 py-2 text-sm rounded-full border border-green-600 text-green-700 hover:bg-green-50 transition"
//                       >
//                         Visit Website
//                       </a>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// /* SMALL REUSABLE COMPONENT */
// function InfoItem({ icon, label, value }) {
//   return (
//     <div className="flex gap-3 items-start">
//       <div className="w-10 h-10 bg-green-700 text-white flex items-center justify-center rounded-md">
//         {icon}
//       </div>
//       <div>
//         <p className="text-sm text-gray-500">{label}</p>
//         <p className="font-medium">{value}</p>
//       </div>
//     </div>
//   );
// }
