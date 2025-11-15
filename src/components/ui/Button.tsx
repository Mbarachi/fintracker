import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
  size?: "sm" | "md" | "lg"; // type it explicitly
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  fullWidth = false,
  size = "lg", // default size
  className,
  disabled,
  ...props
}) => {
  const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
    sm: "h-10 px-4 text-xs",
    md: "h-12 px-5 text-base",
    lg: "h-14 px-6 text-lg",
  };

  return (
    <button
      {...props}
      disabled={disabled}
      className={clsx(
        "flex items-center justify-center rounded-lg font-bold tracking-wide transition-colors",
        sizeClasses[size],
        {
          "bg-primary text-[#112217] hover:bg-primary/90": variant === "primary",
          "bg-transparent border border-primary text-primary hover:bg-primary/10":
            variant === "secondary",
          "w-full": fullWidth,
          "opacity-50 cursor-not-allowed pointer-events-none":
            disabled
        },
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;