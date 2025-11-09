import { Link } from "react-router";

export default function CandidateCard({ candidate }) {
  return (
    <Link
      state={candidate}
      to={`${candidate._id}`}
      className="block w-full max-w-96 mx-auto"
    >
      <div className="rounded-lg overflow-hidden bg-white shadow hover:shadow-lg transition-shadow duration-200 h-full flex flex-col">
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
          <img
            loading="lazy"
            className="w-full h-full object-cover"
            src={
              candidate?.photos?.[0] ||
              "https://img.freepik.com/premium-vector/user-icon-vector_1272330-86.jpg"
            }
            alt={`${candidate?.name}'s photo`}
          />
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-base sm:text-lg text-gray-900 mb-1 line-clamp-2">
            {candidate?.name}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-1">
            {candidate?.position}
          </p>
        </div>
      </div>
    </Link>
  );
}
