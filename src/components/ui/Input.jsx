import React from "react";

function Input({ value, onChange, type = "text", placeholder = "", className = "", ...rest }) {
  const classes = ["input", className].filter(Boolean).join(" ");
  return (
    <input
      className={classes}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      {...rest}
    />
  );
}

export default Input;


