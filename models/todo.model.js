const mongoose = require('mongoose');

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
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
    timestamps: true,
  },
);

const ToDo = mongoose.model('ToDo', todoSchema);

module.exports = ToDo;
