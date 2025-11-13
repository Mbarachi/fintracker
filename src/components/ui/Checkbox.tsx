import React from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, ...props }) => {
    return (
        <label className="flex items-center gap-3 cursor-pointer">
            <input
                type="checkbox"
                {...props}
                className="h-5 w-5 rounded border-2 border-gray-400 text-primary focus:ring-0 dark:border-[#326744]"
            />
            <span className="text-base font-normal text-gray-700 dark:text-white">
                {label}
            </span>
        </label>
    );
};

export default Checkbox;