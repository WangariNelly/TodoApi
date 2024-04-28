const express = require('express');
const { createTodo, getAllTodos } = require('../controllers/todo.controller');

const todo = express.Router();

todo.post('/', createTodo);
todo.get('/', getAllTodos);

module.exports = todo;
