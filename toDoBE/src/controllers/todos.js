const Todo = require("../models/todo");

async function getTodos(request, response) {
  try {
    await Todo.find({}).then((todos) => {
      response.json(todos);
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function postTodos(request, response) {
  try {
    const { body } = request;
    const todo = new Todo({
      task: body.task,
      creationTime: new Date(),
    });

    const savedTodo = await todo.save();
    response.json(savedTodo);
  } catch (error) {
    console.log(error.message);
  }
}

async function deleteTodo(request, response) {
  try {
    await Todo.findByIdAndRemove(request.params.id)
      .then(() => {
        response.status(204).end();
      })
      .catch((error) => next(error));
  } catch (error) {
    console.log(error.message);
  }
}

async function putTodo(request, response) {
  const { id } = request.params;
  const { completed } = request.body;
  try {
    const todo = await Todo.findById(id);
    console.log("Hello from TEST CASES")
    if (!todo) {
      return response.status(404).json({ error: "Todo not found" });
    }

    todo.completed = completed;
    todo.completedTime = completed ? new Date() : null;
    await todo.save();

    response.json(todo);
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = { getTodos, postTodos, deleteTodo, putTodo };
