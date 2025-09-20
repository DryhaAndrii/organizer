import React from "react";

function Button({ children, onClick, type = "button", variant = "default", className = "", ...rest }) {
  const classes = ["btn", `btn-${variant}`, className].filter(Boolean).join(" ");
  return (
    <button type={type} className={classes} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}

export default Button;


