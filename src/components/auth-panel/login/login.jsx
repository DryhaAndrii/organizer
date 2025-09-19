import React, { useState } from "react";

function Login(props) {
  const [userInfo, setUserInfo] = useState({ login: "", password: "" });
  function login() {
    if (userInfo.login !== "" && userInfo.password !== "") {
      console.log("posted");
      fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(userInfo),
      })
        .then((response) => response.json())
        .then((res) => {
          props.setShowMessage({ text: res.text, show: true });
          if (res.text === "success") {
            props.auth(userInfo.login);
          }
        })
        .catch(() => {
          props.setShowMessage({
            text: "Server is not available. Try later.",
            show: true,
          });
        });
    } else {
      props.setShowMessage({ text: "All inputs are required", show: true });
    }
  }
  return (
    <div className="login panel">
      <h1>Login</h1>
      <input
        type="text"
        value={userInfo.login}
        onChange={(e) => {
          setUserInfo({ ...userInfo, login: e.target.value });
        }}
        placeholder="Your login"
      />
      <input
        type="text"
        value={userInfo.password}
        onChange={(e) => {
          setUserInfo({ ...userInfo, password: e.target.value });
        }}
        placeholder="Your password"
      />
      <button
        onClick={() => {
          login();
        }}
      >
        Log in
      </button>
      <button
        onClick={() => {
          props.setIsLoginPage(false);
        }}
      >
        Registration
      </button>
    </div>
  );
}

export default Login;
