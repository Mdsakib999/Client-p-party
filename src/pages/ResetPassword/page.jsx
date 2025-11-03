import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { useResetPasswordMutation } from "../../redux/features/auth/auth.api";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const id = searchParams.get("id");
  const token = searchParams.get("token");
  const [resetPassword, { isLoading, isSuccess }] = useResetPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await resetPassword({ id, newPassword: password, token }).unwrap();
      if (isSuccess) {
        toast.success("Password reset successful 🎉");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="min-h-screen bg-emerald-50 pt-32">
      {" "}
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto flex flex-col gap-4 p-6 rounded-md shadow-md"
      >
        <h2 className="text-xl font-semibold">Reset Your Password</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New Password"
          className="border border-emerald-600 rounded-md px-4 py-2"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm New Password"
          className="border border-emerald-600 rounded-md px-4 py-2"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-emerald-600 text-white rounded-md py-2 hover:bg-emerald-700 disabled:opacity-60"
        >
          {isLoading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
