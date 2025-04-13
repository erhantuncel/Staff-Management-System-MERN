import React from "react";

const Select = ({ className, defaultValue, options, error, ...rest }) => {
    return (
        <>
            <select
                defaultValue={defaultValue}
                className={`select ${className} ${error && "input-error"}`}
                {...rest}
            >
                <option disabled={true}>{defaultValue}</option>
                {options.map((option) => {
                    return <option key={option.key}>{option.value}</option>;
                })}
            </select>
            {error && <div className="validator-hint text-error">{error}</div>}
        </>
    );
};

export default Select;
