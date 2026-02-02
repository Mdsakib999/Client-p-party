const rows = Array.from({ length: 8 });

const CandidateTableSkeleton = () => {
  return (
    <div className="hidden md:block bg-white rounded-lg shadow w-full pt-3">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {Array.from({ length: 7 }).map((_, i) => (
              <th key={i} className="px-6 py-3" />
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {rows.map((_, i) => (
            <tr key={i} className="animate-pulse">
              <td className="px-6 py-4">
                <div className="h-4 w-6 bg-gray-200 rounded" />
              </td>

              <td className="px-6 py-4">
                <div className="h-12 w-12 rounded-full bg-gray-200" />
              </td>

              <td className="px-6 py-4">
                <div className="h-4 w-32 bg-gray-200 rounded" />
              </td>

              <td className="px-6 py-4">
                <div className="h-4 w-40 bg-gray-200 rounded" />
              </td>

              <td className="px-6 py-4">
                <div className="h-4 w-48 bg-gray-200 rounded" />
              </td>

              <td className="px-6 py-4">
                <div className="h-4 w-32 bg-gray-200 rounded" />
              </td>

              <td className="px-6 py-4">
                <div className="h-8 w-20 bg-gray-200 rounded ml-auto" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CandidateTableSkeleton;
