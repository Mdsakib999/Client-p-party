import { useUserInfoQuery } from "../redux/features/auth/auth.api";
import BNPLoader from "./BNPLoader";
import { Navigate } from "react-router";

export default function withAuth(Component, requiredRoles = []) {
  return function AuthWrapper() {
    const { data, isLoading, error } = useUserInfoQuery();

    console.log("Full auth data:", data);
    console.log("Auth error:", error);

    if (isLoading) return <BNPLoader />;

    if (!data?.data?.email) {
      console.log("No email found in user data, redirecting to login", data);
      return <Navigate to="/login" />;
    }

    if (requiredRoles.length > 0 && !requiredRoles.includes(data?.data?.role)) {
      console.log(
        "User role not authorized:",
        data?.data?.role,
        "Required roles:",
        requiredRoles
      );
      return <Navigate to="/" />;
    }

    return <Component />;
  };
}
