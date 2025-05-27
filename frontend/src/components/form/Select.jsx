const Select = ({
    className,
    defaultOptionValue,
    defaultOptionLabel,
    options,
    error,
    showErrorMessage = true,
    ...rest
}) => {
    return (
        <>
            <select
                defaultValue={defaultOptionValue}
                className={`select ${className} ${error && "input-error"}`}
                {...rest}
            >
                <option disabled={true} value={defaultOptionValue}>
                    {defaultOptionLabel}
                </option>
                {options.map((option) => {
                    return (
                        <option key={option.key} value={option.value}>
                            {option.label}
                        </option>
                    );
                })}
            </select>
            {error && showErrorMessage && (
                <div className="validator-hint text-error">{error}</div>
            )}
        </>
    );
};

export default Select;
