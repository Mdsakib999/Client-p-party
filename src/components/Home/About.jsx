import about from "../../assets/about.jpg";

const About = () => {
  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <div className="relative">
            <img
              src="https://morenewsbd.com/storage/posts/2025/12/8287c938ebae1b6e5eff99f98e6f62fd13e0.jpg"
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
              Khaleda Zia stands as an enduring symbol of democratic leadership in Bangladesh, whose political journey reflects a lifelong struggle for democracy, national sovereignty, and the rights of the people. Through years of leadership, resistance, and personal sacrifice, she has demonstrated resilience and unwavering commitment to democratic values, leaving a legacy shaped by courage, perseverance, and dedication to the will of the nation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
