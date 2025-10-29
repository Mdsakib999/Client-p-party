import { useForm } from "react-hook-form";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import Google from "../../utils/Google";
import { Link } from "react-router";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data) => {
    setIsLoading(true);
    setTimeout(() => {
      console.log("Login Data:", data);
      alert("Login successful! Check console for data.");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="relative w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-center">
        <div className="hidden lg:block text-center">
          <div className="bg-gradient-to-br from-green-600 to-green-800 w-36 h-36 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-2xl transform hover:rotate-6 transition-transform duration-500">
            <div className="text-white text-5xl font-bold">BNP</div>
          </div>
          <h1 className="text-5xl font-bold text-green-900 mb-4 leading-tight">
            Welcome Back
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Sign in to continue your journey with
            <br />
            <span className="font-semibold text-green-700">
              Bangladesh Nationalist Party
            </span>
          </p>

          <div className="space-y-4 text-left max-w-md mx-auto">
            <div className="flex items-start gap-3 bg-white backdrop-blur-sm p-4 rounded-xl">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
              <div>
                <p className="font-semibold text-gray-800">Stay Connected</p>
                <p className="text-sm text-gray-600">
                  Access your member dashboard
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white backdrop-blur-sm p-4 rounded-xl">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
              <div>
                <p className="font-semibold text-gray-800">Join Events</p>
                <p className="text-sm text-gray-600">
                  Participate in party activities
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white backdrop-blur-sm p-4 rounded-xl">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
              <div>
                <p className="font-semibold text-gray-800">Make Impact</p>
                <p className="text-sm text-gray-600">
                  Contribute to our vision
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white backdrop-blur-md rounded-3xl shadow p-8 lg:p-10 border border-green-100/50 mt-5">
          <div className="lg:hidden text-center mb-8">
            <div className="bg-green-700 w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
              <div className="text-white text-3xl font-bold">BNP</div>
            </div>
            <h1 className="text-3xl font-bold text-green-800">Welcome Back</h1>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Sign In</h2>
          <p className="text-gray-600 mb-8">
            Enter your credentials to access your account
          </p>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  type="email"
                  className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none bg-white/50"
                  placeholder="your.email@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link
                  to="forgot-password"
                  className="text-sm text-green-700 hover:text-green-800 font-medium transition-colors"
                >
                  forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  {...register("password", {
                    required: "Password is required",
                  })}
                  type={showPassword ? "text" : "password"}
                  className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none bg-white/50"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-700 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
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
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>

            <div className="relative mt-2 mb-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>
            <Google />
          </div>

          <p className="text-center text-sm text-gray-600 mt-5">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-green-700 hover:text-green-600 hover:underline font-semibold transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
