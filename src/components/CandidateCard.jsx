import { Link } from "react-router";

export default function CandidateCard({ candidate }) {
  return (
    <Link state={candidate} to={`${candidate._id}`}>
      <div className="rounded-lg lg:w-80 xl:w-96 max-w-[350px] h-[350px] mx-auto hover:shadow group">
        <img
          className="w-full h-64 rounded-t-lg"
          src={candidate?.Photos?.[0]}
          alt={`${candidate?.name}'s photo`}
        />
        <div className="mt-3 group-hover:p-3 group-hover:mt-0 duration-300">
          <p className="font-bold text-lg">{candidate?.name}</p>
          <p>{candidate?.position}</p>
        </div>
      </div>
    </Link>
  );
}
