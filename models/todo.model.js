const mongoose = require('mongoose');
const todo = require('../routes/todo.route');

const todoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: 30,
      minlength: 3,
      required: [true, 'Todo name is required'],
    },
    description: {
      type: String,
      maxLength: 500,
      minlength: 3,
      required: [true, 'Todo description is required'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transfom(doc, ret) {
        delete ret.__v;
        delete ret.updatedAt;
      },
    },
  },
);

const ToDo = mongoose.model('ToDo', todoSchema);

module.exports = ToDo;
