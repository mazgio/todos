import React, { useState } from 'react';
import axios from 'axios';

export default function TodoForm({ newTodo, setNewTodo, setTodos, setError, error }) {
  const initialState = {
    id: '',
    message: '',
    done: false  // Add done property
  };

  const [todo, setTodo] = useState(initialState);

  const handleChange = (e) => {
    setTodo({
      id: Date.now(),
      message: e.target.value,
      done: false  // Ensure done property is set to false
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    try {
      axios.post('http://localhost:8888/todos', {
        name: todo.message,
        done: todo.done
      })
      .then(res=>{
        console.log(res)
      })
    } catch (error) {
    }
    setTodo(initialState);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="todo"
          value={todo.message}
          placeholder="Enter your Todo item"
          onChange={handleChange}
        />
        <button type="submit">Add Todo</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
