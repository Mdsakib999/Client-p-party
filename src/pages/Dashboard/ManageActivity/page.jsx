import ActivityTable from "../../../components/Activity/ActivityTable"
import { useGetAllActivitiesQuery } from "../../../redux/features/activity/activity.api"
import BNPLoader from "../../../utils/BNPLoader"

export default function ManageActivity() {
  const { data: activities, isLoading } = useGetAllActivitiesQuery()
  if (isLoading) return <BNPLoader />

  return (
    <div className="p-10">
      {(!activities || activities?.data?.length === 0) ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-3xl font-serif">No activities found</p>
        </div>
      ) : (
        <>
          <div className="pl-4">
            <h2 className="text-2xl font-bold text-gray-900">Manage Activities</h2>
            <p className="text-sm text-gray-600 mt-1">View and manage all activities</p>
          </div>
          <ActivityTable activities={activities?.data} />
        </>
      )}
    </div>
  )
}
