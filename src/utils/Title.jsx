export default function Title({ children }) {
  return (
    <p className = "text-sm md:text-xl uppercase tracking-widest opacity-80 pb-2 font-semibold" >
      {children}
    </p>
  );
}