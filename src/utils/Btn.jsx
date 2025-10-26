export default function Btn({ children }) {
  return (
    <button
      className="
        px-8 py-3 bg-black  uppercase text-yellow-500 text-sm sm:text-base md:text-lg rounded-xl  
        text-center flex justify-center items-center cursor-pointer  transition duration-300 hover:bg-yellow-500 hover:text-black
      "
    >
      {children}
    </button>
  );
}
