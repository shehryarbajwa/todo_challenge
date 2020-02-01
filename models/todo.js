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
  subtodos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subtodos"
    }
  ],
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
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

const Todo = mongoose.model("Todos", todoSchema);

module.exports = Todo;
