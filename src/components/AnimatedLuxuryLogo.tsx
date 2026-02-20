import { motion, useScroll, useTransform } from "framer-motion";
import { Scale } from "lucide-react";

interface AnimatedLuxuryLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
  onClick?: () => void;
  disableParallax?: boolean;
}

const AnimatedLuxuryLogo = ({
  size = "md",
  showText = true,
  className = "",
  onClick,
  disableParallax = false,
}: AnimatedLuxuryLogoProps) => {
  const { scrollY } = useScroll();
  
  // Parallax effect for scroll (only when not disabled)
  const y = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

  const sizeClasses = {
    sm: "h-8",
    md: "h-10 md:h-12",
    lg: "h-14 md:h-16",
  };

  const iconSizes = {
    sm: 20,
    md: 28,
    lg: 36,
  };

  return (
    <motion.div
      className={`flex items-center gap-3 group cursor-pointer ${className}`}
      style={{ 
        y: disableParallax ? 0 : y, 
        opacity: disableParallax ? 1 : opacity, 
        scale: disableParallax ? 1 : scale 
      }}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {/* Logo Icon Container with 3D Effect */}
      <motion.div
        className="relative flex items-center justify-center"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* Outer glow ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: "radial-gradient(circle, hsl(46 75% 60% / 0.4) 0%, transparent 70%)",
          }}
        />

        {/* Middle ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.5, 0.2, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          style={{
            border: "1px solid hsl(46 75% 60% / 0.3)",
          }}
        />

        {/* Inner scale icon */}
        <motion.div
          className="relative z-10 flex items-center justify-center"
          style={{
            width: sizeClasses[size],
            height: sizeClasses[size],
          }}
        >
          <Scale
            size={iconSizes[size]}
            className="text-primary"
            strokeWidth={1.5}
          />
        </motion.div>

        {/* Corner accents - top left */}
        <motion.div
          className="absolute -top-1 -left-1 w-3 h-3"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-full h-[1px] bg-primary" />
          <div className="w-[1px] h-full bg-primary absolute top-0 left-0" />
        </motion.div>

        {/* Corner accents - bottom right */}
        <motion.div
          className="absolute -bottom-1 -right-1 w-3 h-3"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        >
          <div className="w-full h-[1px] bg-primary absolute bottom-0 right-0" />
          <div className="w-[1px] h-full bg-primary absolute bottom-0 right-0" />
        </motion.div>
      </motion.div>

      {/* Text Section */}
      {showText && (
        <div className="flex flex-col">
          <motion.span
            className="font-heading text-xl md:text-2xl font-bold gold-gradient-text tracking-wide leading-none"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            MERSAW
          </motion.span>
          <motion.span
            className="text-muted-foreground text-[10px] font-body tracking-[0.25em] uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Law Firm
          </motion.span>
        </div>
      )}
    </motion.div>
  );
};

export default AnimatedLuxuryLogo;
