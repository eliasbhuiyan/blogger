import React from "react";

const Input = ({
    label,
    type = "text",
    name,
    value,
    onChange,
    placeholder,
    error,
    helperText,
    disabled = false,
    size = "md",
    className = "",
    ...props
}) => {
    const baseStyles =
        "block w-full rounded-md border transition-colors duration-200 focus:outline-none focus:ring-2";

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-4 py-3 text-base",
    };

    const normalStyles =
        "border-gray-300 focus:border-blue-500 focus:ring-blue-500";

    const errorStyles =
        "border-red-500 focus:border-red-500 focus:ring-red-500";

    const disabledStyles =
        "bg-gray-100 text-gray-500 cursor-not-allowed";

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={name}
                    className="mb-1 block text-sm font-medium text-gray-700"
                >
                    {label}
                </label>
            )}

            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                className={`
          ${baseStyles}
          ${sizes[size]}
          ${error ? errorStyles : normalStyles}
          ${disabled ? disabledStyles : ""}
          ${className}
        `}
                {...props}
            />

            {helperText && !error && (
                <p className="mt-1 text-xs text-gray-500">{helperText}</p>
            )}

            {error && (
                <p className="mt-1 text-xs text-red-600">{error}</p>
            )}
        </div>
    );
};

export default Input;
