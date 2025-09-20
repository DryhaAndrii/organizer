import React from "react";
import Button from "../ui/Button.jsx";

function TodoItem({ index, text, onRemove }) {
  return (
    <div>
      <p>
        {index + 1}.{`${text}    `}
        <Button onClick={onRemove}>X</Button>
      </p>
    </div>
  );
}

export default TodoItem;


