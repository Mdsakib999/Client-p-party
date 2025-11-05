import { Navigate } from "react-router";
import Loader from "./Loader";
import { useUserInfoQuery } from "../redux/features/auth/auth.api";

export default function withAuth(Component, requiredRole) {
  return function AuthWrapper() {
    const { data, isLoading } = useUserInfoQuery();

    if (isLoading) {
      return <Loader />;
    }

    if (!isLoading && !data?.data?.email) {
      return <Navigate to="/login" />;
    }

    if (requiredRole && !isLoading && requiredRole !== data?.data?.role) {
      return <Navigate to="/" />;
    }

    return <Component />;
  };
}
