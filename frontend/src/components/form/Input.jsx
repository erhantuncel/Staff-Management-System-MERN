import React from "react";

const Input = ({
    name,
    type,
    className,
    placeholder,
    value,
    onChange,
    error,
    ...rest
}) => {
    return (
        <>
            <input
                className={`${className} ${error && "input-error"}`}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                name={name}
                {...rest}
            />
            {error && <div className="validator-hint text-error">{error}</div>}
        </>
    );
};

export default Input;
