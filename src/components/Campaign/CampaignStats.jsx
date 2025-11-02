const CampaignStats = () => {
  return (
    <section className="py-12 px-4 bg-green-700 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Campaign Impact
          </h2>
          <p className="text-green-100 text-lg max-w-2xl mx-auto">
            Our campaign activities are reaching communities across Bangladesh,
            building momentum for change.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold mb-2">
              150+
            </div>
            <div className="text-green-100">
              Campaign Events
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold mb-2">
              300+
            </div>
            <div className="text-green-100">
              Constituencies Covered
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold mb-2">
              50K+
            </div>
            <div className="text-green-100">
              People Engaged
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold mb-2">
              180
            </div>
            <div className="text-green-100">
              Days to Election
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CampaignStats;
