import React from "react";

export default function TodoForm({ onAdd, newTodo, setNewTodo }) {

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim() !== '') {
      onAdd(newTodo);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" aria-label="Add todo">+</button>
      <input
        type="text"
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
        placeholder="Your next todo..."
        aria-label="todo name"
      />
    </form>
  );
}
