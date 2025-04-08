import React from "react";

const Input = ({
    name,
    type,
    className,
    placeholder,
    value,
    onChange,
    ...rest
}) => {
    return (
        <input
            className={className}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            name={name}
            {...rest}
        />
    );
};

export default Input;
