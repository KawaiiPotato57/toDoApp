const mongoose = require("mongoose");
const {
  getTodos,
  postTodos,
  deleteTodo,
  putTodo,
} = require("../src/controllers/todos");
const Todo = require("../src/models/todo");

describe("Todo Controller", () => {
  beforeAll(async () => {
    await mongoose.connect(
      "mongodb+srv://todolist:todo%40123@todolist.miyoyqv.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Todo.deleteMany({});
  });

  describe("getTodos", () => {
    it("should return all todos", async () => {
      const todos = [
        {
          task: "Finish homework",
          completed: false,
          creationTime: new Date(),
        },
        {
          task: "Do laundry",
          completed: false,
          creationTime: new Date(),
        },
      ];
      await Todo.create(todos);
      const req = {};
      const res = {
        json: jest.fn(),
      };
      await getTodos(req, res);
      expect(res.json).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(expect.arrayContaining([]));
    });
  });

  describe("postTodos", () => {
    it("should create a new todo", async () => {
      // Mock request and response objects
      const req = {
        body: {
          task: "Buy groceries",
        },
      };
      const res = {
        json: jest.fn(),
      };

      // Call the controller function
      await postTodos(req, res);

      // Verify the response
      expect(res.json).toHaveBeenCalled();
      const createdTodo = res.json.mock.calls[0][0];
      expect(createdTodo.task).toBe(req.body.task);
      expect(createdTodo.completed).toBe(false);
    });
  });

  describe("deleteTodo", () => {
    it("should delete a todo", async () => {
      // Create a test todo
      const todo = await Todo.create({
        task: "Finish homework",
        completed: false,
        creationTime: new Date(),
      });

      // Mock request and response objects
      const req = {
        params: {
          id: todo._id,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        end: jest.fn(),
      };

      // Call the controller function
      await deleteTodo(req, res);

      // Verify the response
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.end).toHaveBeenCalled();
    });
  });

  describe("putTodo", () => {
    it("should update a todo", async () => {
      // Create a test todo
      const todo = await Todo.create({
        task: "Finish homework",
        completed: false,
        creationTime: new Date(),
      });

      // Mock request and response objects
      const req = {
        params: {
          id: todo._id,
        },
        body: {
          completed: true,
        },
      };
      const res = {
        json: jest.fn(),
      };

      // Call the controller function
      await putTodo(req, res);

      // Verify the response
      expect(res.json).toHaveBeenCalled();
      const updatedTodo = res.json.mock.calls[0][0];
      expect(updatedTodo.completed).toBe(true);
      expect(updatedTodo.completedTime).toBeInstanceOf(Date);
    });

    it("should return 404 if todo ID does not exist", async () => {
      // Mock request and response objects
      const req = {
        params: {
          id: "63cfb44e6346cde1b4b1dd18", // Generate a random non-existent ID
        },
        body: {
          completed: true,
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    
      // Call the controller function
      await putTodo(req, res);
    
      // Verify the response
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Todo not found" });
    });
  });
});
