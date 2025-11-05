import React, { useState } from "react";
import {
  User,
  Mail,
  Shield,
  Calendar,
  Camera,
  ChevronRight,
} from "lucide-react";

const ManageAccount = ({ userData }) => {
  console.log(userData);

  const [formData, setFormData] = useState({
    name: userData?.name || "",
    email: userData?.email || "",
  });

  // Determine authentication providers
  const hasCredentialAuth = userData?.auths?.some(
    (auth) => auth.provider === "credential"
  );
  const hasGoogleAuth = userData?.auths?.some(
    (auth) => auth.provider === "google"
  );

  // Show "Change Password" if credential exists, otherwise show "Set Password" if only Google
  const showChangePassword = hasCredentialAuth;
  const showSetPassword = hasGoogleAuth && !hasCredentialAuth;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfileUpdate = () => {
    console.log("Profile Update:", formData);
    // Add your update logic here
  };

  const handlePasswordClick = () => {
    console.log("Navigate to password change/set page");
    // Add navigation logic here
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Manage Account
          </h1>
          <p className="text-gray-600">
            Update your account information and settings
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
          {/* Profile Header */}
          <div className="bg-emerald-500 px-6 py-8">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                  {userData?.photos && userData.photos.length > 0 ? (
                    <img
                      src={userData.photos[0]}
                      alt="Profile"
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-10 h-10 text-emerald-500" />
                  )}
                </div>
                <button className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-md hover:bg-gray-50 transition-colors">
                  <Camera className="w-3.5 h-3.5 text-gray-600" />
                </button>
              </div>
              <div className="text-white">
                <h2 className="text-2xl font-semibold mb-1">
                  {userData?.name}
                </h2>
                <div className="flex items-center space-x-2 text-emerald-50">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm">
                    {userData?.role?.replace("_", " ")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="p-6">
            <div className="space-y-5 mb-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors outline-none"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed outline-none"
                  disabled
                />
              </div>
            </div>

            {/* Account Details */}
            <div className="grid grid-cols-2 gap-4 mb-6 pt-4 border-t border-gray-200">
              <div>
                <p className="text-xs text-gray-500 mb-1">Account Created</p>
                <p className="text-sm font-medium text-gray-900">
                  {formatDate(userData?.createdAt)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Last Updated</p>
                <p className="text-sm font-medium text-gray-900">
                  {formatDate(userData?.updatedAt)}
                </p>
              </div>
            </div>

            {/* Status Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {userData?.isVerified && (
                <span className="inline-flex items-center px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full border border-emerald-200">
                  Verified
                </span>
              )}
              {userData?.auths?.map((auth, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full border border-gray-200"
                >
                  {auth.provider === "credential"
                    ? "Email Login"
                    : "Google Login"}
                </span>
              ))}
            </div>

            <button
              onClick={handleProfileUpdate}
              className="w-full bg-emerald-500 text-white font-medium py-2.5 rounded-md hover:bg-emerald-600 transition-colors"
            >
              Update Profile
            </button>
          </div>
        </div>

        {/* Security Section */}
        {(showChangePassword || showSetPassword) && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Security
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Manage your password and security settings
              </p>

              <button
                onClick={handlePasswordClick}
                className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors group"
              >
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">
                    {showChangePassword ? "Change Password" : "Set Password"}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {showChangePassword
                      ? "Want to change your password?"
                      : "Set a password to enable email login"}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageAccount;
