import { forwardRef } from "react";

type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "sm" | "md";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-accent text-ink-950 hover:bg-accent-light",
  outline: "bg-transparent text-cream border border-stone-600 hover:border-stone-400",
  ghost: "bg-transparent text-stone-300 hover:text-cream",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-5 py-2.5 text-[11px]",
  md: "px-7 py-3 text-xs",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", href, children, className = "", ...props }, ref) => {
    const cls = `inline-flex items-center justify-center gap-2 tracking-[0.08em] uppercase transition-all duration-300 cursor-pointer select-none active:scale-[0.97] ${variantStyles[variant]} ${sizeStyles[size]} ${className}`.trim();

    if (href) {
      return (
        <a href={href} className={cls}>
          {children}
        </a>
      );
    }

    return (
      <button ref={ref} className={cls} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
