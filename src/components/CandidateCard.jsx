import { Link } from "react-router";

import { getLangField } from "../utils/languageUtils";

export default function CandidateCard({ candidate }) {
  const name = getLangField(candidate, "name");
  const designation = getLangField(candidate, "designation");
  return (
    <Link
      state={candidate}
      to={`${candidate._id}`}
      className="block w-full max-w-80 mx-auto group"
    >
      <div className="h-full rounded-2xl overflow-hidden bg-white border border-emerald-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
        {/* Image */}
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-emerald-50">
          <img
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            src={
              candidate?.photos?.[0]?.secure_url ||
              candidate?.photo ||
              "https://img.freepik.com/premium-vector/user-icon-vector_1272330-86.jpg"
            }
            alt={`${candidate?.name}'s photo`}
          />

          {/* subtle gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col gap-2">
          <h3 className="font-semibold text-base sm:text-lg text-gray-900 leading-snug line-clamp-2">
            {name}
            {/* <p className="text-emerald-700 font-semibold text-sm line-clamp-1">
              {designation}
            </p> */}

            <p>
              {candidate?.election_constituencies?.length > 0 && (
                <span className="text-sm font-normal text-gray-500">
                  (
                  {candidate.election_constituencies
                    .map((area) => getLangField(area, "actual_place_name"))
                    .join(", ")}
                  )
                </span>
              )}
            </p>
          </h3>
        </div>
      </div>
    </Link>
  );
}
