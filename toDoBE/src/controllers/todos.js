const todosRouter = require("express").Router();
const Todo = require("../models/todo");

todosRouter.get("/", async (request, response) => {
  try {
    await Todo.find({}).then((todos) => {
      response.json(todos);
    });
  } catch (error) {
    console.log(error.message);
  }
});

todosRouter.post("/", async (request, response, next) => {
  try {
    const { body } = request;
    const todo = new Todo({
      task: body.task,
      creationTime: body.creationTime,
    });

    const savedTodo = await todo.save();
    response.json(savedTodo);
  } catch (error) {
    console.log(error.message);
  }
});

todosRouter.delete("/:id", async (request, response, next) => {
  try {
    await Todo.findByIdAndRemove(request.params.id)
      .then(() => {
        response.status(204).end();
      })
      .catch((error) => next(error));
  } catch (error) {
    console.log(error.message);
  }
});

todosRouter.put("/:id", async (request, response, next) => {
  const { id } = request.params;
  const {completed}  = request.body;
  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return response.status(404).json({ error: "Todo not found" });
    }

    todo.completed = completed;
    todo.completedTime = completed ? new Date().toLocaleString() : null;
    await todo.save();

    response.json(todo);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = todosRouter;
