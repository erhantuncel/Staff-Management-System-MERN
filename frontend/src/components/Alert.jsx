import React from "react";
import ExclamationCircleIcon from "./icons/ExclamationCircleIcon";

const Alert = ({ message }) => {
    return (
        <div role="alert" className="alert alert-soft">
            <ExclamationCircleIcon type="outline" />
            <span>{message}</span>
        </div>
    );
};

export default Alert;
