import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { TbBrain } from "react-icons/tb";
import { FiLayers, FiShield, FiZap } from "react-icons/fi";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];


const FEATURES = [
  { icon: FiZap, label: "Instant answers" },
  { icon: FiLayers, label: "Built for your workflow" },
  { icon: FiShield, label: "Private by design" },
];

const PROMPTS = [
  { q: "Summarize my meeting notes into action items.", a: "Done — 5 action items, 2 owners assigned, 1 deadline flagged for Friday." },
  { q: "Explain Redux Toolkit like I'm new to it.", a: "Think of it as a toolbox that removes the boilerplate from Redux. Start with createSlice…" },
  { q: "Draft a launch email for our new feature.", a: "Here's a clear, friendly draft with a subject line and a single call to action." },
];


const NODES = [
  { x: 90, y: 140 }, { x: 250, y: 70 }, { x: 430, y: 130 }, { x: 540, y: 260 },
  { x: 380, y: 300 }, { x: 200, y: 260 }, { x: 70, y: 380 }, { x: 300, y: 460 },
  { x: 500, y: 480 }, { x: 160, y: 580 }, { x: 400, y: 620 },
];
const EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [1, 4], [2, 4], [0, 5], [5, 4], [4, 3], [5, 6],
  [5, 7], [4, 7], [3, 8], [7, 8], [6, 9], [7, 9], [7, 10], [8, 10],
];
const SIGNAL_EDGES = [0, 3, 6, 9, 12, 15];

/* ------------------------------------------------------------------
   Entrance variants
------------------------------------------------------------------- */
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.35 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.75, ease: EASE } },
};

/* ------------------------------------------------------------------
   Logo (also used above the form on mobile)
------------------------------------------------------------------- */
export function BrandLogo() {
  const reduce = useReducedMotion();
  return (
    <div className="brand-logo-row">
      <div className="brand-logo">
        <motion.span
          className="brand-logo-ring"
          aria-hidden="true"
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 6, ease: "linear", repeat: Infinity }}
        />
        <TbBrain size={22} />
      </div>
      <span className="brand-name">CortexAI</span>
    </div>
  );
}


export default function BrandPanel() {

  const reduce = useReducedMotion();
  
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setIndex((n) => (n + 1) % PROMPTS.length), 5200);
    return () => clearInterval(id);
  }, [reduce]);

  const prompt = PROMPTS[index];

  return (
    <aside className="brand-panel" aria-label="About CortexAI">
      {/* Background layers */}
      <div className="brand-grid" aria-hidden="true" />
      <motion.div
        className="brand-orb brand-orb-a"
        aria-hidden="true"
        animate={reduce ? undefined : { x: [0, 50, 0], y: [0, 36, 0] }}
        transition={{ duration: 14, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.div
        className="brand-orb brand-orb-b"
        aria-hidden="true"
        animate={reduce ? undefined : { x: [0, -44, 0], y: [0, -30, 0] }}
        transition={{ duration: 17, ease: "easeInOut", repeat: Infinity }}
      />

      <svg className="brand-network" viewBox="0 0 600 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {/* Edges draw themselves in */}
        {EDGES.map(([a, b], i) => (
          <motion.path
            key={`e-${i}`}
            className="net-edge"
            d={`M${NODES[a].x} ${NODES[a].y} L${NODES[b].x} ${NODES[b].y}`}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4 + i * 0.07, ease: EASE }}
          />
        ))}

        {/* Signals travelling along some edges */}
        {!reduce &&
          SIGNAL_EDGES.map((edgeIndex, i) => {
            const [a, b] = EDGES[edgeIndex];
            return (
              <motion.circle
                key={`s-${i}`}
                className="net-signal"
                r={2.6}
                initial={{ opacity: 0 }}
                animate={{
                  cx: [NODES[a].x, NODES[b].x],
                  cy: [NODES[a].y, NODES[b].y],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{ duration: 2.2, delay: 2 + i * 0.9, repeat: Infinity, repeatDelay: 2.4, ease: "easeInOut" }}
              />
            );
          })}

        {/* Nodes pop in, then pulse */}
        {NODES.map((n, i) => (
          <g key={`n-${i}`}>
            {!reduce && (
              <motion.circle
                className="net-halo"
                cx={n.x}
                cy={n.y}
                initial={{ r: 5, opacity: 0 }}
                animate={{ r: [5, 18], opacity: [0.45, 0] }}
                transition={{ duration: 2.6, delay: 1.6 + i * 0.35, repeat: Infinity, ease: "easeOut" }}
              />
            )}
            <motion.circle
              className="net-node"
              cx={n.x}
              cy={n.y}
              initial={{ r: 0, opacity: 0 }}
              animate={{ r: 4.5, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.09, ease: EASE }}
            />
          </g>
        ))}
      </svg>

      {/* Content */}
      <motion.div
        className="brand-top"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <BrandLogo />
      </motion.div>

      <motion.div className="brand-body" variants={container} initial="hidden" animate="show">
        <motion.span variants={item} className="brand-eyebrow">
          <span className="brand-dot" /> Your AI workspace
        </motion.span>

        <motion.h2 variants={item} className="brand-headline">
          Think faster.
          <br />
          <span className="brand-gradient-text">Build smarter.</span>
        </motion.h2>

        <motion.p variants={item} className="brand-desc">
          CortexAI turns questions into answers, drafts and decisions, so you spend less time searching and more
          time building.
        </motion.p>

        <motion.ul variants={item} className="brand-chips" aria-label="Highlights">
          {FEATURES.map(({ icon: Icon, label }) => (
            <li key={label} className="brand-chip">
              <Icon size={14} />
              {label}
            </li>
          ))}
        </motion.ul>

        {/* Rotating chat preview */}
        <motion.div variants={item}>
          <motion.div
            className="brand-card"
            animate={reduce ? undefined : { y: [0, -7, 0] }}
            transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
          >
            <div className="brand-card-head">
              <span className="brand-live" /> CortexAI
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                className="stack-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <p className="brand-msg brand-msg-user">{prompt.q}</p>
                <motion.p
                  className="brand-msg brand-msg-ai"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  {prompt.a}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.p
        className="brand-foot"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        © 2026 CortexAI. All rights reserved.
      </motion.p>
    </aside>
  );
}