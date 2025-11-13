import React, { useState } from "react";
import clsx from "clsx";
import { Eye, EyeOff } from "lucide-react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  showPasswordToggle?: boolean;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, type = "text", showPasswordToggle = false, className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputType =
      showPasswordToggle && type === "password"
        ? showPassword
          ? "text"
          : "password"
        : type;

    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label
            htmlFor={props.id}
            className="text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          <input
            ref={ref}
            {...props}
            type={inputType}
            className={clsx(
              "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/40 dark:border-[#326744] dark:bg-[#193322] dark:text-white dark:placeholder-[#92c9a4]",
              error && "border-red-500 focus:border-red-500 focus:ring-red-200",
              className
            )}
          />

          {/* Toggle icon (only if password toggle is enabled) */}
          {showPasswordToggle && type === "password" && (
            <div
              className="absolute right-3 cursor-pointer text-gray-500 dark:text-[#92c9a4]"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          )}
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

InputField.displayName = "InputField";
export default InputField;