import React from "react";
import { useRegistration } from "./useRegistration";
import Button from "../../ui/Button.jsx";
import Input from "../../ui/Input.jsx";

function Registration(props) {
  const { userInfo, setUserInfo, register } = useRegistration({
    setShowMessage: props.setShowMessage,
  });
  return (
    <div className="register panel">
      <h1>Registration</h1>
       <Input
        onChange={(e) => {
          setUserInfo({ ...userInfo, login: e.target.value });
        }}
        value={userInfo.login}
        type="text"
        placeholder="Your login"
      />
       <Input
        onChange={(e) => {
          setUserInfo({ ...userInfo, password: e.target.value });
        }}
        value={userInfo.password}
        type="text"
        placeholder="Your password"
      />
       <Input
        onChange={(e) => {
          setUserInfo({ ...userInfo, confirmPassword: e.target.value });
        }}
        value={userInfo.confirmPassword}
        type="text"
        placeholder="Confirm password"
      />
       <Button
        onClick={() => {
          register();
        }}
      >
        Register
       </Button>
       <Button
         variant="ghost"
        onClick={() => {
          props.setIsLoginPage(true);
        }}
      >
        Back to Log in
       </Button>
    </div>
  );
}

export default Registration;
