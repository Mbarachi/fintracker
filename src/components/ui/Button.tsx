import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  fullWidth = false,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={clsx(
        "flex items-center justify-center h-14 rounded-lg font-bold tracking-wide transition-colors",
        {
          "bg-primary text-[#112217] hover:bg-primary/90": variant === "primary",
          "bg-transparent border border-primary text-primary hover:bg-primary/10":
            variant === "secondary",
          "w-full": fullWidth,
        },
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;