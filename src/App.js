import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';
import Task from './Task';
import './App.css';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const inputRef = useRef(null);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:7777/todos');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchData();
  }, []);


  const addTask = async (name) => {
    try {
      await axios.post('http://localhost:7777/todos', { name });
      // Fetch updated tasks after adding a new task
      const response = await axios.get('http://localhost:7777/todos');
      setTasks(response.data);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const editTask = async (id, newName) => {
    try {
      const response = await axios.put(`http://localhost:7777/todos/${id}`, { name: newName });
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.map((task) =>
          task.id === response.data.id ? { ...task, name: response.data.name } : task
        );
        // Set focus after updating state
        if (inputRef.current && inputRef.current.id === id) {
          inputRef.current.focus();
        }
        // Add any additional logic you need
        return updatedTasks;
      });
    } catch (error) {
      console.error('Error editing task:', error);
      // Handle the error (e.g., show a message to the user)
    }
  };


  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:7777/todos/${id}`);
      // Fetch updated tasks after deleting a task
      const response = await axios.get('http://localhost:7777/todos');
      setTasks(response.data);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };


  function toggleTask(id, done) {
    // Toggle the done status of the todo
    axios.put(
      `http://localhost:7777/todos/${id}`,
      { done: !done },
      { headers: { 'Skip-Name-Validation': 'true' } }
    )
      .then(res => {
        setTasks(tasks =>
          tasks.map(task => (task.id === id ? { ...task, done: !task.done } : task))
        );
      })
      .catch(err => {
        console.log(err);
      });
  }


  const numberComplete = tasks.filter(t => t.done).length;
  const numberTotal = tasks.length;

  function getMessage() {
    const percentage = numberComplete / numberTotal * 100;
    if (percentage === 0) {
      return 'Try to do at least one! 🙏';
    }
    if (percentage === 100) {
      return 'Nice job for today! 🏝';
    }
    return 'Keep it going 💪🏻';
  }

  return (
    <main>
      <h1>{numberComplete}/{numberTotal} Complete</h1>
      <h2>{getMessage()}</h2>
      <TaskForm onAdd={addTask} />
      {tasks.map((task) => (
        <Task
          key={task.id}
          id={task.id}  // Make sure you pass the correct id
          task={task}   // Make sure you pass the correct task object
          onToggle={toggleTask}
          onDelete={deleteTask}
          onEdit={editTask}
        />
      ))}
    </main>
  );
}
