const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todos");

router.get("/", todoController.getTodos);
router.post("/", todoController.postTodos);
router.delete("/:id", todoController.deleteTodo);
router.put("/:id", todoController.putTodo);

module.exports = router;
