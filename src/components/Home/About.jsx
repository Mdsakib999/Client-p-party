import about from "../../assets/about.jpg";

const About = () => {
  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <div className="relative">
            <img
              src={about}
              alt="Champion of Democracy in Bangladesh"
              className="w-full h-[500px] md:h-[550px] object-cover rounded-md shadow-xl"
            />
          </div>

          {/* Right - Content */}
          <div className="space-y-6 w-full flex flex-col items-center text-center">
            <span className="inline-block bg-green-700 text-white px-4 py-1.5 rounded-full text-sm font-medium">
              About
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 tracking-tight">
              Champion of Democracy in Bangladesh
            </h2>

            <p className="text-gray-700 text-lg leading-relaxed">
              Local Government Faces Criticism Over New Policies as thousands
              took to the streets to oppose recent policy changes, leading to
              clashes with law enforcement and a state of emergency declared in
              several cities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
