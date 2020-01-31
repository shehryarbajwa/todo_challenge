const mongoose = require("mongoose");

const subTodos = new mongoose.Schema({
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
  todos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todos"
    }
  ]
});

subTodos.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Subtodos = mongoose.model("subtodos", subTodos);

module.exports = Subtodos;
