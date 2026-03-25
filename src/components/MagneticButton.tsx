"use client";

import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
  disabled?: boolean;
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  ariaLabel,
  disabled = false,
}: MagneticButtonProps) {
  return (
    <motion.button
      className={className}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      style={{ opacity: disabled ? 0.5 : 1, cursor: disabled ? "not-allowed" : "pointer" }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.button>
  );
}
