import React from "react";
import AuthPanel from "../auth-panel/auth-panel.jsx";
import Message from "../message/message.jsx";
import ThemeToggle from "../ui/ThemeToggle.jsx";

function UnauthenticatedView({ auth, showMessage, setShowMessage }) {
  return (
    <div className="app">
      <ThemeToggle />
      <AuthPanel setShowMessage={setShowMessage} auth={auth} />
      {showMessage.show && (
        <Message setShowMessage={setShowMessage} showMessage={showMessage} />
      )}
    </div>
  );
}

export default UnauthenticatedView;


