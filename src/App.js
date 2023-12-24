import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';
import Task from './Task';
import './App.css';

export default function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from the server
    axios.get('http://localhost:7777/todos')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
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
      await axios.put(`http://localhost:7777/todos/${id}`, { name: newName });
      // Fetch updated tasks after editing a task
      const response = await axios.get('http://localhost:7777/todos');
      setTasks(response.data);
    } catch (error) {
      console.error('Error editing task:', error);
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

  const toggleTask = async (id, done) => {
    try {
      await axios.put(`http://localhost:7777/todos/${id}`, { done: !done });
      // Fetch updated tasks after toggling a task
      const response = await axios.get('http://localhost:7777/todos');
      setTasks(response.data);
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

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
          task={task}
          onEdit={editTask}
          onDelete={deleteTask}
          onToggle={toggleTask}
        />
      ))}
    </main>
  );
}
