import React from "react";

const Button = ({ type, className, onClick, children, ...rest }) => {
    return (
        <button
            type={type || "button"}
            className={className}
            onClick={onClick}
            {...rest}
        >
            {children}
        </button>
    );
};

export default Button;
