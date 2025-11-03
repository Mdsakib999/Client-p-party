import { useState } from "react";
import { Link } from "react-router";
import { toast } from "react-hot-toast";
import { useForgotPasswordMutation } from "../../redux/features/auth/auth.api";
import { Mail, CheckCircle, ArrowLeft } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await forgotPassword({ email }).unwrap();
      setIsSuccess(true);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 px-4">
      <div className="w-full max-w-md">
        {!isSuccess ? (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                <Mail className="w-8 h-8 text-emerald-600" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
              Forgot Password?
            </h2>
            <p className="text-sm text-gray-600 text-center mb-8">
              No worries! Enter your email address and we'll send you a link to
              reset your password.
            </p>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSubmit(e);
                  }}
                  placeholder="you@example.com"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                  required
                  disabled={isLoading}
                />
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading || !email}
                className={`w-full py-3 rounded-lg text-white font-semibold transition-all ${
                  isLoading || !email
                    ? "bg-emerald-600 cursor-not-allowed"
                    : "bg-emerald-600 hover:bg-emerald-700 hover:shadow-md"
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </div>

            <div className="mt-6 text-center">
              <Link
                to="/login"
                className={`inline-flex items-center gap-2 text-sm text-emerald-700 hover:text-emerald-800 font-medium transition ${
                  isLoading ? "pointer-events-none opacity-50" : ""
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center animate-pulse">
                <CheckCircle className="w-12 h-12 text-emerald-600" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Check Your Email
            </h2>
            <p className="text-gray-600 mb-2">
              We've sent a password reset link to
            </p>
            <p className="text-emerald-700 font-semibold mb-6">{email}</p>
            <p className="text-sm text-gray-500 mb-8">
              Click the link in the email to reset your password. If you don't
              see it, check your spam folder.
            </p>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => {
                  setIsSuccess(false);
                  setEmail("");
                }}
                className="w-full py-3 rounded-lg bg-emerald-700 text-white font-semibold hover:bg-emerald-800 transition"
              >
                Try Another Email
              </button>

              <Link
                to="/login"
                className="block w-full py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition"
              >
                Back to Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
