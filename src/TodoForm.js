import { useState } from "react";

export default function TodoForm({ onAdd }) {
  const [todoName, setTodoName] = useState('');

  function handleSubmit(ev) {
    ev.preventDefault();
    onAdd(todoName);
    setTodoName('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" aria-label="Add todo">+</button>
      <input
        type="text"
        value={todoName}
        onChange={ev => setTodoName(ev.target.value)}
        placeholder="Your next todo..."
        aria-label="todo name"
      />
    </form>
  );
}
