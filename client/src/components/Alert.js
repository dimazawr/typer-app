import React from "react";

export const Alert = ({ text }) => {
    return (
        <div className="alert alert-dark bg-dark" role="alert"> {text} </div>
    )
}