import React from "react";
import ThemeToggle from "../ui/ThemeToggle.jsx";

function LoadingView() {
  return (
    <div className="app">
      <ThemeToggle />
      <div style={{ color: '#fff' }}>Loading...</div>
    </div>
  );
}

export default LoadingView;


