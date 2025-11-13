import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  User,
  Shield,
  Camera,
  Lock,
  Mail,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { useUpdateUserMutation } from "../../../redux/features/user/user.api";
import {
  authApi,
  useChangePasswordMutation,
  useLogoutMutation,
  useSetPasswordMutation,
} from "../../../redux/features/auth/auth.api";
import toast from "react-hot-toast";
import PasswordModal from "../../../components/PasswordModal";
import { useDispatch } from "react-redux";

const ManageAccount = ({ userData }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    defaultValues: {
      name: userData?.name || "",
      phoneNumber: userData?.phoneNumber || "",
      profileImage: null,
    },
  });

  const fileInputRef = useRef(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordMode, setPasswordMode] = useState("set");
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [setPassword, { isLoading: isSettingPassword }] =
    useSetPasswordMutation();
  const [changePassword, { isLoading: isChangingPassword }] =
    useChangePasswordMutation();
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userData) {
      reset({
        name: userData.name || "",
        phoneNumber: userData?.phoneNumber || "",
        profileImage: null,
      });
    }
  }, [userData, reset]);

  const hasCredentialAuth = userData?.auths?.some(
    (auth) => auth.provider === "credential"
  );
  const hasGoogleAuth = userData?.auths?.some(
    (auth) => auth.provider === "google"
  );

  const showChangePassword = hasCredentialAuth;
  const showSetPassword = hasGoogleAuth && !hasCredentialAuth;

  const getProfileImageUrl = () => {
    if (profilePreview) return profilePreview;
    return userData?.photos?.[0]?.url || null;
  };

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5 MB");
      if (fileInputRef.current) fileInputRef.current.value = "";
      setValue("profileImage", null, { shouldDirty: true });
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      if (fileInputRef.current) fileInputRef.current.value = "";
      setValue("profileImage", null, { shouldDirty: true });
      return;
    }

    if (profilePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(profilePreview);
    }

    setProfilePreview(URL.createObjectURL(file));
    setValue("profileImage", e.target.files, { shouldDirty: true });
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    if (data.name.trim()) formData.append("name", data.name.trim());
    if (data.phoneNumber?.trim())
      formData.append("phoneNumber", data.phoneNumber.trim());
    if (data.profileImage?.[0]) formData.append("image", data.profileImage[0]);

    if (
      !data.name.trim() &&
      !data.phoneNumber?.trim() &&
      !data.profileImage?.[0]
    ) {
      toast.error("No changes to update");
      return;
    }

    try {
      const result = await updateUser({
        userInfo: formData,
        userId: userData?._id,
      }).unwrap();

      if (result?.success) {
        toast.success("Profile updated successfully");
      }

      const newPhotoUrl =
        result?.data?.photos?.[0]?.url ||
        result?.photos?.[0]?.url ||
        result?.user?.photos?.[0]?.url;

      if (newPhotoUrl) {
        if (profilePreview?.startsWith("blob:")) {
          URL.revokeObjectURL(profilePreview);
        }
        setProfilePreview(newPhotoUrl);
      }

      setValue("profileImage", null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error("Update failed:", err);
      toast.error(err?.data?.message || "Failed to update profile");
    }
  };

  const handlePasswordModalOpen = (mode) => {
    setPasswordMode(mode);
    setIsPasswordModalOpen(true);
  };

  const handlePasswordSubmit = async (data) => {
    try {
      if (passwordMode === "set") {
        const res = await setPassword(data.newPassword).unwrap();
        console.log(res);
        if (res.success) {
          toast.success(
            <h1 className="font-serif text-center">
              Password set successfully! please login again
            </h1>
          );
          await logout();
          dispatch(authApi.util.resetApiState());
        }
      } else {
        const res = await changePassword({
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        }).unwrap();
        console.log(res);
        if (res.success) {
          toast.success(
            <h1 className="font-serif text-center">
              Password changed successfully! please login again
            </h1>
          );
          await logout();
          dispatch(authApi.util.resetApiState());
        }
      }
    } catch (err) {
      console.error("Set password failed:", err);
      toast.error(
        <h1 className="text-center font-serif">
          {err?.data?.message || "Failed to set/change password"}
        </h1>
      );
      throw err;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1000px] mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-900">
            Account Settings
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Manage your profile information and security settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6">
                {/* Profile Image */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    Profile Photo
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageSelect}
                        accept="image/*"
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center overflow-hidden hover:bg-slate-200 transition-colors border-2 border-slate-200"
                      >
                        {getProfileImageUrl() ? (
                          <img
                            src={
                              userData?.photos?.[0]?.url || getProfileImageUrl()
                            }
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User className="w-9 h-9 text-slate-400" />
                        )}
                        <div className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-sm border border-slate-200">
                          <Camera className="w-3.5 h-3.5 text-slate-600" />
                        </div>
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
                      >
                        Change photo (JPG, PNG or GIF)
                      </button>
                      <p className="text-xs text-slate-500 mt-1">
                        Max size 5MB
                      </p>
                    </div>
                  </div>
                </div>

                {/* Name Field */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    {...register("name", {
                      required: "Name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters",
                      },
                      maxLength: {
                        value: 50,
                        message: "Name must not exceed 50 characters",
                      },
                    })}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none text-slate-900"
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-600 mt-1.5">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email Field (Read-only) */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={userData?.email || ""}
                      className="w-full px-3.5 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed outline-none"
                      disabled
                    />
                    <Mail className="absolute right-3 top-2.5 w-4 h-4 text-slate-400" />
                  </div>
                  <p className="text-xs text-slate-500 mt-1.5">
                    Email cannot be changed
                  </p>
                </div>

                {/* Phone Number Field */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {userData?.phoneNumber
                      ? "Phone Number"
                      : "Add Phone Number"}
                  </label>
                  <input
                    type="tel"
                    {...register("phoneNumber", {
                      pattern: {
                        value:
                          /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
                        message: "Please enter a valid phone number",
                      },
                    })}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none text-slate-900"
                    placeholder={userData?.phoneNumber || "+1 (555) 000-0000"}
                  />
                  {errors.phoneNumber && (
                    <p className="text-sm text-red-600 mt-1.5">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleSubmit(onSubmit)}
                  disabled={isUpdating || !isDirty}
                  className="w-full bg-emerald-600 text-white font-medium py-2.5 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-emerald-600"
                >
                  {isUpdating ? "Saving changes..." : "Save changes"}
                </button>
              </div>
            </div>

            {/* Security Section */}
            {(showChangePassword || showSetPassword) && (
              <div className="bg-white rounded-lg border border-slate-200 shadow-sm mt-6">
                <div className="p-6 border-b border-slate-200">
                  <h2 className="text-lg font-medium text-slate-900">
                    Security
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Manage your password and authentication
                  </p>
                </div>

                <div className="p-6">
                  <button
                    onClick={() =>
                      handlePasswordModalOpen(
                        showChangePassword ? "change" : "set"
                      )
                    }
                    className="w-full flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-slate-300 hover:bg-slate-50 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                        <Lock className="w-5 h-5 text-slate-600" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium text-slate-900">
                          {showChangePassword
                            ? "Change Password"
                            : "Set Password"}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {showChangePassword
                            ? "Update your current password"
                            : "Enable email/password login for your account"}
                        </p>
                      </div>
                    </div>
                    <svg
                      className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-lg font-medium text-slate-900">
                  Account Details
                </h2>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-slate-500" />
                    <span className="text-xs font-medium text-slate-500 uppercase">
                      Role
                    </span>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 bg-emerald-50 text-emerald-700 text-sm font-medium rounded-md border border-emerald-200">
                    {userData?.role?.replace("_", " ") || "User"}
                  </span>
                </div>

                {userData?.isVerified && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-4 h-4 text-slate-500" />
                      <span className="text-xs font-medium text-slate-500 uppercase">
                        Status
                      </span>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 bg-emerald-50 text-emerald-700 text-sm font-medium rounded-md border border-emerald-200">
                      Verified Account
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Lock className="w-4 h-4 text-slate-500" />
                    <span className="text-xs font-medium text-slate-500 uppercase">
                      Login Methods
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {userData?.auths?.map((auth, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 bg-slate-50 text-slate-700 text-sm font-medium rounded-md border border-slate-200"
                      >
                        {auth.provider === "credential"
                          ? "Email & Password"
                          : "Google"}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-4 h-4 text-slate-500" />
                    <span className="text-xs font-medium text-slate-500 uppercase">
                      Timeline
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Joined</p>
                      <p className="text-sm font-medium text-slate-900">
                        {formatDate(userData?.createdAt)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">
                        Last Updated
                      </p>
                      <p className="text-sm font-medium text-slate-900">
                        {formatDate(userData?.updatedAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Password Modal */}
      <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        mode={passwordMode}
        onSubmit={handlePasswordSubmit}
        isLoading={isSettingPassword || isChangingPassword}
      />
    </div>
  );
};

export default ManageAccount;
