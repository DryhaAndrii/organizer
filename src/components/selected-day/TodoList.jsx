import React from "react";
import TodoItem from "./TodoItem.jsx";

function TodoList({ items, onRemove }) {
  if (!items || items.length === 0) {
    return <p>To do list is empty</p>;
  }
  return (
    <>
      {items.map((item, index) => (
        <TodoItem key={index} index={index} text={item} onRemove={() => onRemove(index)} />
      ))}
    </>
  );
}

export default TodoList;


