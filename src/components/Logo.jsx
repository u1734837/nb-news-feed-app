import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import "../css/Logo.css";

const letters = [
  { char: "N", direction: -1 },
  { char: "B", direction: 1 },
];

const Logo = () => {
  const controls = letters.map(() => useAnimation());

  useEffect(() => {
    const interval = setInterval(() => {
      // trigger a fast wiggle every 5 seconds
      controls.forEach((control, i) => {
        const dir = letters[i].direction;
        control.start({
          rotate: [0, dir * 15, dir * -15, 0],
          x: [0, dir * 5, dir * -5, 0],
          y: [0, -5, 5, 0],
          transition: { duration: 0.5, ease: "easeInOut" },
        });
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [controls]);

  return (
    <div className="logo-container">
      {letters.map(({ char }, i) => (
        <motion.span
          key={i}
          className="logo-letter"
          initial={{ opacity: 1, y: 0, rotate: 0, x: 0 }}
          animate={controls[i]}
          transition={{ duration: 2, yoyo: Infinity, ease: "easeInOut" }} // calm subtle breathing
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
};

export default Logo;
