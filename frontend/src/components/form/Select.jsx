import React from "react";

const Select = ({ className, defaultValue, options, ...rest }) => {
    return (
        <select
            defaultValue={defaultValue}
            className={"select " + className}
            {...rest}
        >
            <option disabled={true}>{defaultValue}</option>
            {options.map((option) => {
                return <option key={option.key}>{option.value}</option>;
            })}
        </select>
    );
};

export default Select;
