import Leaders from "../../utils/Leaders";

const Legacy = () => {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 tracking-tight">
          Legacy of Leadership
        </h2>

        {/* Description */}
        <p className="text-center text-gray-700 max-w-3xl mx-auto leading-relaxed">
          From the founding vision of Ziaur Rahman to the courage and resilience
          of Khaleda Zia, and the leadership of Tarique Rahman, the Zia family
          has steered BNP through decades of democratic struggle, sacrifice and
          hope. Their legacy inspires today's BNP to uphold nationalism, freedom
          and the voice of the people.
        </p>

        {/* Carousel */}
        <Leaders />
      </div>
    </section>
  );
};

export default Legacy;
