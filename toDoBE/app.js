const express = require("express");
const cors = require("cors");
const middleware = require("./utils/middleware");
const todosRouter = require("./src/routes/todo");
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://spring-iris-389314.el.r.appspot.com",
    ],
  })
);
app.use(middleware.morganLog);
app.use("/api/todos", todosRouter);

//should always be at the end
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
