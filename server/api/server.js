const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const db = require('./dbConfig');

const server = express();


server.use(cors());
server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
  res.send('Welcome to the Todo app server!');
});

server.get('/todos', async (req, res) => {
  try {
    const todos = await db('todos');
    res.json(todos);
  } catch (err) {
    console.log(err);
  }
});

server.get('/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const currentTodo = await db('todos').where({ id });
    currentTodo.length === 0 ? res.status(404).json({ message: 'Todo not found' }) : res.status(200).json(currentTodo);
  } catch (err) {
    console.log(err);
  }
});

server.post('/todos', async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ message: 'You must include a message in your request.' });
  }
  try {
    await db('todos').insert({ message });
    res.status(201).json({ message: 'Todo successfully stored!' });
  } catch (err) {
    console.log(err);
  }
});

server.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ message: 'You must include a message in your request.' });
  }
  try {
    const currentTodo = await db('todos').where({ id }).update({ message });
    res.status(200).json({ message: 'Update Successful!' });
  } catch (err) {
    console.log(err);
  }


});

server.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const currentTodo = await db('todos').where({ id }).del();
    res.status(200).json({ message: 'Delete Successful!' });
  } catch (err) {
    console.log(err);
  }


});



module.exports = server;