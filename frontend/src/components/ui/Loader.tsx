import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { TbBrain } from "react-icons/tb";

interface LoaderProps {
 
  label?: string;
  fullScreen?: boolean;
  className?: string;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Loader({ label = "Loading…", fullScreen = true, className = "" }: LoaderProps) {
  const reduce = useReducedMotion();

  return (
    <div
      className={`loader ${fullScreen ? "loader-fullscreen" : ""} ${className}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="loader-inner">
        <div className="loader-stage" aria-hidden="true">
          {/* Expanding pulse rings */}
          {!reduce &&
            [0, 1].map((i) => (
              <motion.span
                key={i}
                className="loader-pulse"
                initial={{ scale: 1, opacity: 0 }}
                animate={{ scale: [1, 2.1], opacity: [0.45, 0] }}
                transition={{ duration: 2.4, delay: i * 1.2, repeat: Infinity, ease: "easeOut" }}
              />
            ))}

          {/* Orbiting dots */}
          <motion.div
            className="loader-orbit"
            animate={reduce ? undefined : { rotate: 360 }}
            transition={{ duration: 3.2, ease: "linear", repeat: Infinity }}
          >
            <span className="loader-dot" />
            <span className="loader-dot loader-dot-b" />
          </motion.div>

          {/* Logo mark */}
          <motion.div
            className="loader-mark"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={reduce ? { scale: 1, opacity: 1 } : { scale: [1, 1.06, 1], opacity: 1 }}
            transition={
              reduce
                ? { duration: 0.3 }
                : { scale: { duration: 2, ease: "easeInOut", repeat: Infinity }, opacity: { duration: 0.4, ease: EASE } }
            }
          >
            <motion.span
              className="loader-mark-ring"
              animate={reduce ? undefined : { rotate: 360 }}
              transition={{ duration: 4, ease: "linear", repeat: Infinity }}
            />
            <TbBrain size={30} />
          </motion.div>
        </div>

        <div className="loader-text">
          <span className="loader-name">CortexAI</span>

          {/* The label animates whenever the prop changes */}
          <AnimatePresence mode="wait">
            <motion.span
              key={label}
              className="loader-label"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: EASE }}
            >
              {label}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}