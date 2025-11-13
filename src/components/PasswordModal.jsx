import { useState } from "react";
import { useForm } from "react-hook-form";
import { X, Eye, EyeOff } from "lucide-react";

const PasswordModal = ({ isOpen, onClose, mode, onSubmit, isLoading }) => {
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const isChangeMode = mode === "change";

  const handleClose = () => {
    reset();
    setShowPassword({ old: false, new: false, confirm: false });
    onClose();
  };

  const onFormSubmit = async (data) => {
    await onSubmit(data);
    handleClose();
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      <div className="relative w-full max-w-md mx-4 bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-medium text-slate-900">
            {isChangeMode ? "Change Password" : "Set Password"}
          </h3>
          <button
            onClick={handleClose}
            className="text-slate-500 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="p-6 space-y-4">
          {isChangeMode && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showPassword.old ? "text" : "password"}
                  {...register("oldPassword", {
                    required: "Current password is required",
                  })}
                  className="w-full px-3.5 py-2 pr-10 border border-slate-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("old")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword.old ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.oldPassword && (
                <p className="text-sm text-red-600 mt-1.5">
                  {errors.oldPassword.message}
                </p>
              )}
            </div>
          )}

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword.new ? "text" : "password"}
                {...register("newPassword", {
                  required: "New password is required",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{6,30}$/,
                    message:
                      "Password must be 6-30 characters and include lowercase, uppercase, number and special character",
                  },
                  maxLength: {
                    value: 30,
                    message: "Password must not exceed 30 characters",
                  },
                })}
                className="w-full px-3.5 py-2 pr-10 border border-slate-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("new")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword.new ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-sm text-red-600 mt-1.5">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showPassword.confirm ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("newPassword") || "Passwords do not match",
                })}
                className="w-full px-3.5 py-2 pr-10 border border-slate-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none"
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirm")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword.confirm ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-600 mt-1.5">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed font-medium"
            >
              {isLoading ? "Saving..." : "Save Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordModal;
