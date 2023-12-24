// api.js
import axios from 'axios';

const baseURL = 'http://localhost:8888'; // Set your API base URL here

const api = axios.create({
  baseURL,
});

export const fetchTodos = async () => {
  try {
    const response = await api.get('/todos');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addTodo = async (todo) => {
  try {
    const response = await api.post('/todos', todo);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTodo = async (id) => {
  try {
    await api.delete(`/todos/${id}`);
  } catch (error) {
    throw error;
  }
};

export const updateTodo = async (id, data) => {
  try {
    const response = await api.put(`/todos/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const renameTodo = async (id, data) => {
  try {
    const response = await api.put(`/todos/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
