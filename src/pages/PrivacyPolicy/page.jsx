export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 py-12 px-6 md:px-12">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-10">
        <h1 className="text-3xl font-extrabold text-center text-emerald-800 mb-6">
          Privacy Policy
        </h1>

        <p className="text-lg mb-4">
          Your privacy is important to us. When you use our candidate nomination
          platform, we collect only essential information that helps improve
          your experience.
        </p>

        <div className="space-y-4">
          <section>
            <h2 className="text-2xl font-semibold text-emerald-700 mb-2">
              What We Collect
            </h2>
            <p>
              We gather basic information like name, email, and device data
              strictly to show you nominated candidates and personalize your
              dashboard. Personal data is used for authentication and secure
              login.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-emerald-700 mb-2">
              How We Use Your Data
            </h2>
            <p>Your information is used only for:</p>
            <ul className="list-disc list-inside ml-5">
              <li>Candidate search personalization</li>
              <li>Secure access to features</li>
              <li>Improving app performance</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-emerald-700 mb-2">
              Third-Party Sharing
            </h2>
            <p>
              We do not share your data with any third parties except essential
              service providers for analytics and security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-emerald-700 mb-2">
              Security Measures
            </h2>
            <p>
              We use industry-standard encryption and secure protocols to
              protect your data. Unauthorized access attempts are monitored and
              blocked automatically.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-emerald-700 mb-2">
              Children’s Privacy
            </h2>
            <p>
              Our platform is targeted for general audiences. We do not
              intentionally collect information from children under 13.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-emerald-700 mb-2">
              Your Rights
            </h2>
            <p>
              You may request deletion of your account and related data at any
              time. Contact support for assistance.
            </p>
          </section>
        </div>

        <p className="text-sm text-center text-gray-500 mt-8">
          Effective Date: January 2026
        </p>
      </div>
    </div>
  );
}
