import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoForm from './TodoForm';
import Todo from './Todo';
import './App.css'; // Import your CSS file here

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8888/todos');
      setTodos(response.data);
      setError('');
    } catch (error) {
      setError('Error fetching todos');
    }
  };

  const removeTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:8888/todos/${id}`);
      setTodos(todos => todos.filter(todo => todo.id !== id));
      setError('');
    } catch (error) {
      setError('Error deleting todo');
    }
  };

  const updateTodoDone = async (id) => {
    try {
      await axios.put(`http://localhost:8888/todos/${id}`, { done: !todos.find(todo => todo.id === id).done });
      setTodos(todos =>
        todos.map(todo => (todo.id === id ? { ...todo, done: !todo.done } : todo))
      );
      setError('');
    } catch (error) {
      setError('Error updating todo');
    }
  };

  const renameTodo = async (id, newName) => {
    try {
      const response = await axios.put(`http://localhost:8888/todos/${id}`, { name: newName });
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === response.data.id ? { ...todo, name: response.data.name } : todo
        )
      );
      setError('');
    } catch (error) {
      setError('Error renaming todo');
    }
  };

  const numberComplete = todos.filter(t => t?.done).length;
  const numberTotal = todos.length;

  const getMessage = () => {
    const percentage = (numberComplete / numberTotal) * 100;

    const epsilon = 0.0001;

    if (Math.abs(percentage - 0) < epsilon) {
      return 'Try to do at least one! 🙏';
    }
    if (Math.abs(percentage - 100) < epsilon) {
      return 'Nice job for today! 🏝';
    }
    return 'Keep it going 💪🏻';
  };

  return (
    <main>
      <h1>{numberComplete}/{numberTotal} Complete</h1>
      <h2>{getMessage()}</h2>
      <TodoForm
        newTodo={newTodo}
        setNewTodo={setNewTodo}
        setTodos={setTodos}
        setError={setError}
        error={error}
      />
      {todos.map(todo => (
        <Todo
          key={todo.id}
          id={todo.id}
          name={todo.name}
          done={todo.done}
          onRename={newName => renameTodo(todo.id, newName)}
          onTrash={() => removeTodo(todo.id)}
          onToggle={() => updateTodoDone(todo.id)}
        />
      ))}
    </main>
  );
}

export default TodoApp;
