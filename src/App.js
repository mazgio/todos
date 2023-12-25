import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';
import Task from './Task';
import './App.css';

export default function App() {
  const [tasks, setTasks] = useState([]);


  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8900/todos');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateTask = async (id, updatedData) => {
    try {
      await axios.put(`http://localhost:8900/todos/${id}`, updatedData);
      fetchData(); // Fetch data immediately after the successful update
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const addTask = async (name) => {
    try {
      await axios.post('http://localhost:8900/todos', { name });
      // Fetch updated tasks after adding a new task
      const response = await axios.get('http://localhost:8900/todos');
      setTasks(response.data);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const editTask = async (id, newName) => {
    try {
      const response = await axios.put(`http://localhost:8900/todos/${id}`, { name: newName });
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.map((task) =>
          task.id === response.data.id ? { ...task, name: response.data.name } : task
        );
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
      await axios.delete(`http://localhost:8900/todos/${id}`);
      // Fetch updated tasks after deleting a task
      const response = await axios.get('http://localhost:8900/todos');
      setTasks(response.data);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };


  function toggleTask(id, done) {
    // Toggle the done status of the todo
    axios.put(
      `http://localhost:8900/todos/${id}`,
      { done: !tasks.find(task => task.id === id).done },
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



  const numberComplete = tasks.filter(t => t?.done).length;
  const numberTotal = tasks.length;

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
      <TaskForm onAdd={addTask} />
      {tasks.map((task) => (
        <Task
          key={task.id}
          id={task.id}  // Make sure you pass the correct id
          task={task}   // Make sure you pass the correct task object
          onToggle={toggleTask}
          onDelete={deleteTask}
          onEdit={editTask}
          onUpdate={updateTask} // Pass the update function to Task component

        />
      ))}
    </main>
  );
}
