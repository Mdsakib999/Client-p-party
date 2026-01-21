export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 py-12 px-6 md:px-12">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-10">
        <h1 className="text-3xl font-extrabold text-center text-emerald-800 mb-6">
          Privacy Policy
        </h1>

        <p className="text-lg mb-4"></p>

        <div className="space-y-4">
          <section>
            <h2 className="text-2xl font-semibold text-emerald-700 mb-2">
              Types of Information Gathered
            </h2>
            <p>
              The Website may collect your full name, contact number,
              residential address, email address, and any social media details
              you choose to provide. 
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-emerald-700 mb-2">
              Purpose of Data Collection
            </h2>
            <p>
              bnpcandidates.com gathers personal details exclusively to verify
              party membership and communicate with members.
            </p>
            {/* <ul className="list-disc list-inside ml-5">
              <li>Candidate search personalization</li>
              <li>Secure access to features</li>
              <li>Improving app performance</li>
            </ul> */}
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-emerald-700 mb-2">
              How Information Is Used
            </h2>
            <p>
              Collected data is utilized to confirm member identity, complete
              registration, send membership-related communications and fulfill legal or financial reporting
              obligations when required.
            </p>
          </section>

          {/* <section>
            <h2 className="text-2xl font-semibold text-emerald-700 mb-2">
              Eligibility and User Consent
            </h2>
            <p>
              Only citizens of Bangladesh are permitted to submit donations or
              membership payments through this Website. By completing a
              transaction, you declare that you are a Bangladeshi national.
            </p>
          </section> */}

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
              Data Storage and Protection
            </h2>
            <p>
              Information is kept only for the period necessary to achieve its
              intended purpose and is safeguarded through suitable
              administrative and technical security measures.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-emerald-700 mb-2">
              Updates to This Policy
            </h2>
            <p>
              This Privacy Policy may be revised periodically. Any material
              modifications will be announced on the Website.
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
