import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";

export default function Countup({ children }) {
  const number = Number(children);
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="inline-block" ref={ref}>
      {inView ? (
        <CountUp
          start={0}
          end={number}
          duration={4}
          decimals={number % 1 !== 0 ? 1 : 0}
        />
      ) : (
        0
      )}
    </div>
  );
}
