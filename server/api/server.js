const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const db = require('./dbConfig');

const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());

// Middleware for handling server errors
function handleServerError(res, err) {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
}

// Middleware for validating request data
function validateRequestData(req, res, next) {
  // Allow routes to skip the name validation if needed
  if (req.headers['skip-name-validation'] === 'true') {
    return next();
  }

  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'You must include a name in your request.' });
  }

  next();
}


// Middleware for handling server errors
function handleServerError(res, err) {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
}

// Middleware for validating request data
function validateRequestData(req, res, next) {
  // Allow routes to skip the name validation if needed
  if (req.headers['skip-name-validation'] === 'true') {
    return next();
  }

  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'You must include a name in your request.' });
  }

  next();
}


server.get('/', (req, res) => {
  res.send('Welcome to the Todo app server!');
});

server.get('/todos', async (req, res) => {
  try {
    const todos = await db('todos');
    res.json(todos);
  } catch (err) {
    handleServerError(res, err);
  }
});

server.get('/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await db('todos').where({ id }).first();

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.status(200).json(todo);
  } catch (err) {
    handleServerError(res, err);
  }
});

server.post('/todos', validateRequestData, async (req, res) => {
  const { name, done } = req.body;

server.post('/todos', validateRequestData, async (req, res) => {
  const { name, done } = req.body;

  try {
    await db('todos').insert({ name, done: done || false });
    await db('todos').insert({ name, done: done || false });
    res.status(201).json({ message: 'Todo successfully stored!' });
  } catch (err) {
    handleServerError(res, err);
    handleServerError(res, err);
  }
});

server.put('/todos/:id', validateRequestData, async (req, res) => {
server.put('/todos/:id', validateRequestData, async (req, res) => {
  const { id } = req.params;
  const { name, done } = req.body;

  try {
    // Only update the name if it's provided
    const updateData = {};
    if (name !== undefined) {
      updateData.name = name;
    }

    if (done !== undefined) {
      updateData.done = Boolean(done);
    }

    const updatedCount = await db('todos').where({ id }).update(updateData);

    if (updatedCount === 0) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    const updatedTodo = await db('todos').where({ id }).first();
    res.status(200).json({ message: 'Update Successful', updatedTodo });
  const { name, done } = req.body;

  try {
    // Only update the name if it's provided
    const updateData = {};
    if (name !== undefined) {
      updateData.name = name;
    }

    if (done !== undefined) {
      updateData.done = Boolean(done);
    }

    const updatedCount = await db('todos').where({ id }).update(updateData);

    if (updatedCount === 0) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    const updatedTodo = await db('todos').where({ id }).first();
    res.status(200).json({ message: 'Update Successful', updatedTodo });
  } catch (err) {
    handleServerError(res, err);
    handleServerError(res, err);
  }
});

server.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;


  try {
    const deletedCount = await db('todos').where({ id }).del();

    if (deletedCount === 0) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.status(204).end(); // 204 No Content for successful deletion
    const deletedCount = await db('todos').where({ id }).del();

    if (deletedCount === 0) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.status(204).end(); // 204 No Content for successful deletion
  } catch (err) {
    handleServerError(res, err);
    handleServerError(res, err);
  }
});

module.exports = server;
