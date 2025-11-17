import { Navigate } from "react-router";
import { useUserInfoQuery } from "../redux/features/auth/auth.api";
import BNPLoader from "./BNPLoader";

// eslint-disable-next-line no-unused-vars
export default function withPublic(Component) {
  return function PublicWrapper() {
    const { data, isLoading } = useUserInfoQuery();
    if (isLoading) {
      return <BNPLoader />;
    }
    if (!isLoading && data?.data?.email) {
      return <Navigate to="/" replace />;
    }

    return <Component />;
  };
}
