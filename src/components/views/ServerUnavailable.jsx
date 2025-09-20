import React from "react";
import ThemeToggle from "../ui/ThemeToggle.jsx";
import Button from "../ui/Button.jsx";

function ServerUnavailable({ onRetry }) {
  return (
    <div className="app">
      <ThemeToggle />
      <div style={{ color: '#fff', textAlign: 'center', maxWidth: 420 }}>
        <h2>Service is not available</h2>
        <p>Unable to connect to the server. Check the internet or try again later.</p>
        <Button onClick={onRetry}>Try again</Button>
      </div>
    </div>
  );
}

export default ServerUnavailable;


