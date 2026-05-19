"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";

type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "sm" | "md";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  children: React.ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  primary: "bg-accent text-ink-950 hover:bg-accent-light",
  outline: "bg-transparent text-cream border border-stone-600 hover:border-stone-400",
  ghost: "bg-transparent text-stone-300 hover:text-cream",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-5 py-2.5 text-[11px]",
  md: "px-7 py-3 text-xs",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", href, children, className = "", ...props }, ref) => {
    const cls = `inline-flex items-center justify-center gap-2 tracking-[0.08em] uppercase transition-all duration-300 cursor-pointer select-none ${variants[variant]} ${sizes[size]} ${className}`.trim();

    const springConfig = { type: "spring" as const, stiffness: 400, damping: 25 };

    if (href) {
      return (
        <motion.a 
          href={href} 
          className={cls} 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }} 
          transition={springConfig}
          {...(props as HTMLMotionProps<"a">)}
        >
          {children}
        </motion.a>
      );
    }

    return (
      <motion.button 
        ref={ref} 
        className={cls} 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }} 
        transition={springConfig}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
export default Button;
