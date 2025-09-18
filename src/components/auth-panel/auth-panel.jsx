import React, { useState } from "react";
import "./auth-panel.sass";
import Login from "./login/login";
import Registration from "./registration/registration";
function AuthPanel(props) {
  const [isLoginPage, setIsLoginPage] = useState(true);

  return (
    <div className="auth-panel">
      {isLoginPage ? (
        <Login
          setIsLoginPage={setIsLoginPage}
          setShowMessage={props.setShowMessage}
          auth={props.auth}
        />
      ) : (
        <Registration
          setIsLoginPage={setIsLoginPage}
          setShowMessage={props.setShowMessage}
        />
      )}
    </div>
  );
}

export default AuthPanel;
