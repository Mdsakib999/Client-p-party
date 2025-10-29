import { useState } from "react";
import { useForm } from "react-hook-form";
import Leaders from "../../utils/Leaders";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router";
import Google from "../../utils/Google";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const password = watch("password");

  const onSubmit = (data) => {
    console.log("Registration Data:", data);
    alert("Registration successful! Check console for data.");
  };

  const validatePassword = (value) => {
    const errors = [];
    if (value.length < 6) errors.push("at least 6 characters");
    if (value.length > 30) errors.push("maximum 30 characters");
    if (!/[a-z]/.test(value)) errors.push("one lowercase letter");
    if (!/[A-Z]/.test(value)) errors.push("one uppercase letter");
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
      errors.push("one special character");

    return errors.length === 0 || `Password must contain ${errors.join(", ")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 py-8 px-4">
      <div className="max-w-7xl mx-auto mt-10">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="lg:sticky lg:top-8">
            <div className="text-center mb-6">
              <div className="bg-green-700 w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                <div className="text-white text-3xl font-bold">BNP</div>
              </div>
              <h1 className="text-4xl font-bold text-green-800 mb-2">
                Bangladesh Nationalist Party
              </h1>
              <p className="text-gray-600 text-lg">
                Join us in building a better Bangladesh
              </p>
            </div>

            <Leaders />
          </div>

          <div className="max-w-xl bg-white rounded-3xl shadow-2xl p-8 lg:p-10 border border-green-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8">
              Create Your Account
            </h2>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("name", { required: "Name is required" })}
                  type="text"
                  className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 outline-none"
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1 duration-300">
                    <span className="inline-block w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  type="email"
                  className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 outline-none"
                  placeholder="example@email.com"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1 duration-300">
                    <span className="inline-block w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    {...register("password", {
                      required: "Password is required",
                      validate: validatePassword,
                    })}
                    type={showPassword ? "text" : "password"}
                    className="w-full px-5 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 outline-none"
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-all duration-300"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600 flex items-start gap-1.5 animate-in fade-in slide-in-from-top-1 duration-300">
                    <span className="inline-block w-1.5 h-1.5 bg-red-600 rounded-full mt-1.5"></span>
                    <span>{errors.password.message}</span>
                  </p>
                )}
                {password && !errors.password && (
                  <div className="mt-3 space-y-2 animate-in fade-in slide-in-from-top-2 duration-500">
                    <div className="flex items-center gap-2.5 text-xs text-gray-600">
                      <span
                        className={`w-2 h-2 rounded-full transition-all duration-500 ${
                          password.length >= 6 && password.length <= 30
                            ? "bg-green-500 shadow-sm shadow-green-300"
                            : "bg-gray-300"
                        }`}
                      ></span>
                      <span>6-30 characters</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-gray-600">
                      <span
                        className={`w-2 h-2 rounded-full transition-all duration-500 ${
                          /[a-z]/.test(password)
                            ? "bg-green-500 shadow-sm shadow-green-300"
                            : "bg-gray-300"
                        }`}
                      ></span>
                      <span>Lowercase letter</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-gray-600">
                      <span
                        className={`w-2 h-2 rounded-full transition-all duration-500 ${
                          /[A-Z]/.test(password)
                            ? "bg-green-500 shadow-sm shadow-green-300"
                            : "bg-gray-300"
                        }`}
                      ></span>
                      <span>Uppercase letter</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-gray-600">
                      <span
                        className={`w-2 h-2 rounded-full transition-all duration-500 ${
                          /[!@#$%^&*(),.?":{}|<>]/.test(password)
                            ? "bg-green-500 shadow-sm shadow-green-300"
                            : "bg-gray-300"
                        }`}
                      ></span>
                      <span>Special character</span>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number{" "}
                  <span className="text-gray-400 text-xs">(optional)</span>
                </label>
                <input
                  {...register("phoneNumber")}
                  type="tel"
                  className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 outline-none"
                  placeholder="+880 1XXX-XXXXXX"
                />
              </div>

              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                className="cursor-pointer mt-2 w-full bg-green-600 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 shadow"
              >
                Sign Up
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
            </div>
            {/* google signin component */}
            <Google />
            <p className="text-center text-sm text-gray-600 mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-green-700 hover:text-green-600 hover:underline font-semibold transition-colors duration-300"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
