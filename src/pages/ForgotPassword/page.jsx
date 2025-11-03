import { useState } from "react";
import { Link } from "react-router";
import { toast } from "react-hot-toast";
import { useForgotPasswordMutation } from "../../redux/features/auth/auth.api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await forgotPassword({ email }).unwrap();
      toast.success("Password reset link sent to your email!");
      setEmail("");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-emerald-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 bg-white rounded-xl shadow-md flex flex-col gap-4"
      >
        <h2 className="text-xl font-semibold text-center">Forgot Password</h2>
        <p className="text-sm text-gray-500 text-center">
          Enter your email address and we’ll send you a link to reset your
          password.
        </p>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        <button
          type="submit"
          disabled={isLoading}
          className={`py-2 rounded-lg text-white font-medium transition ${
            isLoading
              ? "bg-green-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {isLoading ? "Sending..." : "Send Reset Link"}
        </button>

        <Link
          to="/login"
          className="text-sm text-center text-green-700 hover:underline"
        >
          Back to Login
        </Link>
      </form>
    </div>
  );
}
