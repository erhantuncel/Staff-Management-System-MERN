import React from "react";
import { Controller } from "react-hook-form";
import CreatableSelect from "react-select/creatable";

const ControllerSelect = ({
    name,
    className,
    control,
    isHidden,
    options,
    error,
    ...rest
}) => {
    const customStyles = {
        control: (base, state) => ({
            ...base,
            minHeight: "10px",
            fontSize: "12px",
            transition: "none",
            boxShadow: "none",
            borderColor: error
                ? "var(--color-error)"
                : state.isFocused
                  ? error
                      ? "var(--color-error)"
                      : "#000000"
                  : "color-mix(in oklab, var(--color-base-content) 20%, #0000)",
            "&:hover": state.isFocused && {
                borderColor: error ? "var(--color-error)" : "#000000",
            },
            outline: state.isFocused ? "2px" : "",
            outlineStyle: state.isFocused ? "solid" : "",
            outlineColor: state.isFocused
                ? error
                    ? "var(--color-error)"
                    : "black"
                : "",
            outlineOffset: state.isFocused ? "2px" : "",
        }),
        dropdownIndicator: (base, state) =>
            error
                ? {
                      ...base,
                      color: "var(--color-error)",
                      "&:hover": {
                          color: "var(--color-error)",
                      },
                  }
                : { ...base },
        indicatorSeparator: (base, state) =>
            error
                ? {
                      ...base,
                      backgroundColor: "var(--color-error)",
                      "&:hover": {
                          backgroundColor: "var(--color-error)",
                      },
                  }
                : { ...base },

        option: (base, state) =>
            state.isFocused && state.isSelected
                ? {
                      ...base,
                      backgroundColor: "var(--color-neutral)",
                      color: "var(--color-neutral-content)",
                  }
                : state.isSelected
                  ? {
                        ...base,
                        backgroundColor: "var(--color-neutral)",
                        color: "var(--color-neutral-content)",
                    }
                  : state.isFocused
                    ? {
                          ...base,
                          backgroundColor: "var(--color-base-300)",
                          color: "var(--color-base-content)",
                      }
                    : {
                          ...base,
                          backgroundColor: "#ffffff",
                          color: "var(--color-base-content)",
                      },
    };
    return (
        <div hidden={isHidden}>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <CreatableSelect
                        {...field}
                        {...rest}
                        placeholder=""
                        isClearable
                        styles={customStyles}
                        classNames={{
                            container: () => "h-[2rem]",
                            indicatorsContainer: () => "h-8",
                            menuList: () =>
                                "border border-grey-300 h-20 text-xs",
                        }}
                        options={options}
                    />
                )}
            />
            {error && (
                <div hidden={isHidden} className={"validator-hint text-error"}>
                    {error}
                </div>
            )}
        </div>
    );
};

export default ControllerSelect;
