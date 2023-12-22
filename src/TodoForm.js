import React, { useRef } from 'react';

export default function TodoForm({ onAdd, newTodo, setNewTodo }) {
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim() !== '') {
      onAdd(newTodo);
      setNewTodo('');

      // Set focus to the input field after adding a new todo
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" aria-label="Add todo">+</button>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Your next todo..."
        aria-label="todo name"
        ref={inputRef} // Assign the ref here
      />
    </form>
  );
}
