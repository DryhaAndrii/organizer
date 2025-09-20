import React from "react";

function ServerUnavailable({ onRetry }) {
  return (
    <div className="app">
      <div style={{ color: '#fff', textAlign: 'center', maxWidth: 420 }}>
        <h2>Service is not available</h2>
        <p>Unable to connect to the server. Check the internet or try again later.</p>
        <button onClick={onRetry}>Try again</button>
      </div>
    </div>
  );
}

export default ServerUnavailable;


