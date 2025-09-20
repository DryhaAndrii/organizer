import { useState, useCallback } from "react";

export function useLogin({ auth, setShowMessage }) {
  const [userInfo, setUserInfo] = useState({ login: "", password: "" });

  const login = useCallback(() => {
    if (userInfo.login !== "" && userInfo.password !== "") {
      fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(userInfo),
      })
        .then((response) => response.json())
        .then((res) => {
          setShowMessage({ text: res.text, show: true });
          if (res.text === "success") {
            auth(userInfo.login);
          }
        })
        .catch(() => {
          setShowMessage({
            text: "Server is not available. Try later.",
            show: true,
          });
        });
    } else {
      setShowMessage({ text: "All inputs are required", show: true });
    }
  }, [userInfo, auth, setShowMessage]);

  return { userInfo, setUserInfo, login };
}


