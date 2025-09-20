import React from "react";
import { useLogin } from "./useLogin";
import Button from "../../ui/Button.jsx";
import Input from "../../ui/Input.jsx";

function Login(props) {
  const { userInfo, setUserInfo, login } = useLogin({
    auth: props.auth,
    setShowMessage: props.setShowMessage,
  });
  return (
    <div className="login panel">
      <h1>Login</h1>
      <Input
        type="text"
        value={userInfo.login}
        onChange={(e) => {
          setUserInfo({ ...userInfo, login: e.target.value });
        }}
        placeholder="Your login"
      />
      <Input
        type="text"
        value={userInfo.password}
        onChange={(e) => {
          setUserInfo({ ...userInfo, password: e.target.value });
        }}
        placeholder="Your password"
      />
      <Button
        onClick={() => {
          login();
        }}
      >
        Log in
      </Button>
      <Button
        onClick={() => {
          props.setIsLoginPage(false);
        }}
      >
        Registration
      </Button>
    </div>
  );
}

export default Login;
