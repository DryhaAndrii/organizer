import React from "react";
import Button from "../ui/Button.jsx";
import Input from "../ui/Input.jsx";

function AddTodo({ value, onChange, onAdd }) {
  return (
    <div>
      <Input value={value} onChange={onChange} />
      <Button onClick={onAdd}>+</Button>
    </div>
  );
}

export default AddTodo;


