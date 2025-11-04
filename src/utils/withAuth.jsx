import { useUserInfoQuery } from "../redux/features/auth/auth.api";
import BNPLoader from "./BNPLoader";
import { Navigate } from "react-router";

export default function withAuth(Component, requiredRoles = []) {
  return function AuthWrapper() {
    const { data, isLoading } = useUserInfoQuery();

    if (isLoading) return <BNPLoader />;

    if (!data?.data?.email) {
      return <Navigate to="/login" />;
    }

    if (requiredRoles.length > 0 && !requiredRoles.includes(data?.data?.role)) {
      return <Navigate to="/" />;
    }

    return <Component />;
  };
}
