const { check } = require('express-validator');
const todoValidations = {
  createTodo: [
    check('name', 'Todo name must be string').isString().trim(),
    check('name', 'Todo name is required').notEmpty().trim(),
    check(
      'name',
      'Todo name must have a minimum of 3 and a maximum of 30 characters',
    ).isLength({
      min: 3,
      max: 30,
    }),
    check('description', 'Todo description must be a string').isString().trim(),
    check('description', 'Todo description is required').notEmpty().trim(),
    check(
      'description',
      'Todo description must have a minimum of 3 and a maximum of 500 characters',
    ).isLength({
      min: 3,
      max: 500,
    }),
  ],
};

module.exports = todoValidations;
