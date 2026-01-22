import React from "react";

const Card = ({ children, className = "" }) => {
    return (
        <div
            className={`
        rounded-lg border border-gray-200 bg-white shadow-sm
        ${className}
      `}
        >
            {children}
        </div>
    );
};

/* ---------- Header ---------- */
Card.Header = ({ children, className = "" }) => {
    return (
        <div
            className={`
        border-b border-gray-200 px-5 py-3
        text-gray-800 font-medium
        ${className}
      `}
        >
            {children}
        </div>
    );
};

/* ---------- Body ---------- */
Card.Body = ({ children, className = "" }) => {
    return (
        <div className={`px-5 py-4 text-gray-700 ${className}`}>
            {children}
        </div>
    );
};

/* ---------- Footer ---------- */
Card.Footer = ({ children, className = "" }) => {
    return (
        <div
            className={`
        border-t border-gray-200 px-5 py-3
        text-gray-600
        ${className}
      `}
        >
            {children}
        </div>
    );
};

export default Card;
