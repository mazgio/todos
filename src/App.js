// TodoApp.js
import './App.css';
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import { useEffect, useState } from "react";
import axios from 'axios';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');



  useEffect(() => {
    // Fetch todos from the server when the component mounts
    axios.get('http://localhost:8888/todos')
      .then(res => {
        // Map the "done" values to true or false
        const todosWithBooleanDone = res.data.map(todo => ({
          id: todo.id,
          name: todo.name,
          done: todo.done === 1,
        }));
        setTodos(todosWithBooleanDone);
      })
      .catch(err => {
        console.log(err);
      });
  }, [todos, newTodo]);

  function addTodo(name) {
    // Create a new todo on the server and update state
    axios.post('http://localhost:8888/todos', { name, done: false })
      .then(res => {
        setTodos([...todos, res.data]);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function removeTodo(id) {
    // Delete a todo on the server and update state
    axios.delete(`http://localhost:8888/todos/${id}`)
      .then(() => {
        setTodos(todos => todos.filter(todo => todo.id !== id));
      })
      .catch(err => {
        console.log(err);
      });
  }

  function updateTodoDone(id, newDone) {
    // Toggle the done status of the todo

    axios.put(
      `http://localhost:8888/todos/${id}`,
      { done: !todos.find(todo => todo.id === id).done },
      { headers: { 'Skip-Name-Validation': 'true' } }
    )
      .then(res => {
        setTodos(todos =>
          todos.map(todo => (todo.id === id ? { ...todo, done: !todo.done } : todo))
        );
      })
      .catch(err => {
        console.log(err);
      });
  }



  function renameTodo(id, newName) {
    // Update the name of a todo on the server and update state
    axios.put(`http://localhost:8888/todos/${id}`, { name: newName })
      .then(res => {
        setTodos(prevTodos => {
          return prevTodos.map(todo =>
            todo.id === res.data.id ? { ...todo, name: res.data.name } : todo
          );
        });
      })
      .catch(err => {
        console.log(err);
      });
  }



  const numberComplete = todos.filter(t => t?.done).length;
  const numberTotal = todos.length;

  function getMessage() {
    const percentage = (numberComplete / numberTotal) * 100;

    // Use a small epsilon value to account for floating-point precision issues
    const epsilon = 0.0001;

    if (Math.abs(percentage - 0) < epsilon) {
      return 'Try to do at least one! 🙏';
    }
    if (Math.abs(percentage - 100) < epsilon) {
      return 'Nice job for today! 🏝';
    }
    return 'Keep it going 💪🏻';
  }

  return (
    <main>
      <h1>{numberComplete}/{numberTotal} Complete</h1>
      <h2>{getMessage()}</h2>
      <TodoForm
        onAdd={(name) => {
          addTodo(name);
          setNewTodo(''); // Clear the input after adding a new todo
        }}
        newTodo={newTodo}
        setNewTodo={setNewTodo}
      />
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          {...todo}
          onRename={(newName) => renameTodo(todo.id, newName)}
          onTrash={() => removeTodo(todo.id)}
          onToggle={(done) => updateTodoDone(todo.id, done)}
        />
      ))}
    </main>
  );
}

export default TodoApp;
