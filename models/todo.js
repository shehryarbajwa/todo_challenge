const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 100,
    required: true
  },
  description: {
    required: true,
    type: String
  },
  completed: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  subTasks: [
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Subtasks'
      }
    ]
});

todoSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Todo = mongoose.model('Todos', todoSchema);

module.exports = Todo;