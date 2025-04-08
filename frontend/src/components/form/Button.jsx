import React from "react";

const Button = ({ type, className, onClick, children, ...rest }) => {
    return (
        <button type={type} className={className} onClick={onClick} {...rest}>
            {children}
        </button>
    );
};

export default Button;
