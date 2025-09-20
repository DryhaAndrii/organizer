import { useState, useCallback } from "react";

export function useRegistration({ setShowMessage }) {
  const [userInfo, setUserInfo] = useState({
    login: "",
    password: "",
    confirmPassword: "",
  });

  const register = useCallback(() => {
    if (
      userInfo.login !== "" &&
      userInfo.password !== "" &&
      userInfo.confirmPassword !== ""
    ) {
      if (userInfo.password === userInfo.confirmPassword) {
        fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(userInfo),
        })
          .then((response) => response.json())
          .then((res) => setShowMessage({ text: res.text, show: true }));
      } else {
        setShowMessage({
          text: "Password and confirm password are not equal",
          show: true,
        });
      }
    } else {
      setShowMessage({ text: "Not all inputs are filled", show: true });
    }
  }, [userInfo, setShowMessage]);

  return { userInfo, setUserInfo, register };
}


