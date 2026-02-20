import { motion } from "framer-motion";

const GoldSeparator = ({ className = "", animated = true }: { className?: string; animated?: boolean }) => (
  <div className={`relative my-8 ${className}`}>
    <div className="gold-line" />
    {animated && (
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full gold-gradient-bg"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.8, 1, 0.8],
          boxShadow: [
            "0 0 4px rgba(205,170,80,0.3)",
            "0 0 12px rgba(205,170,80,0.6)",
            "0 0 4px rgba(205,170,80,0.3)",
          ],
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
    )}
  </div>
);

export default GoldSeparator;
