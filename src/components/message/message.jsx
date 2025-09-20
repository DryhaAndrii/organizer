import React, { useEffect, useState } from "react";
import "./message.sass";
import Button from "../ui/Button.jsx";
function Message(props) {
  const [className, setClassName] = useState("message hide");
  useEffect(() => {
    setTimeout(() => {
      setClassName("message show");
    }, 10);
    return () => {
      setClassName("message hide");
    };
  }, []);
  return (
    <>
      {props.showMessage.show && (
        <div className={className}>
          <p>{props.showMessage.text}</p>
          <Button
            onClick={() => {
              props.setShowMessage({ text: "", show: false });
            }}
          >
            OK
          </Button>
        </div>
      )}
    </>
  );
}

export default Message;
