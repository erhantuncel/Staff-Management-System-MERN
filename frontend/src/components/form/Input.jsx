import React from "react";

const Input = ({
    name,
    type,
    className,
    placeholder,
    value,
    isHidden,
    onChange,
    error,
    readOnly,
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
                readOnly={readOnly}
                hidden={isHidden}
                {...rest}
            />
            {error && (
                <div hidden={isHidden} className={"validator-hint text-error"}>
                    {error}
                </div>
            )}
        </>
    );
};

export default Input;
