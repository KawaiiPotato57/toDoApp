import React, { useState, useEffect, useRef } from "react";
import { Container, Typography } from "@material-ui/core";
import useStyles from "../assets/styles";
import { InputField } from "./InputField";
import ToDoList from "./ToDoList";
import TodoService from "../services/todo";

const TodoApp = () => {
  const classes = useStyles();
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const selectedTodo = useRef();

  function deleteTodo() {
    let toDelete = JSON.stringify(todos[selectedTodo.current]);
    let id = JSON.parse(toDelete).id;
    TodoService.deleteTask(id).then((task) => {
      console.log("Deleted Task");
    });
  }

  function changeTodo(obj) {
    TodoService.putTask(obj).then((data) => {
      console.log("after :", data)
      const updatedTodos = todos.map((todo) => {
        if (todo.id === obj.id) {
          return {
            ...todo,
            completed: data.completed,
            completedTime: data.completedTime,
          };
        }
        return todo;
      });
      setTodos(updatedTodos);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  useEffect(() => {
    TodoService.getTasks().then((tasks) => {
      setTodos(tasks);
    });
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddTodo();
    }
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      const newTodo = {
        task: inputValue,
        completed: false,
        completedTime: null,
        creationTime: new Date().toLocaleString(),
      };
    
      setInputValue("");
      TodoService.postTask(newTodo).then((task) => {
        setTodos([...todos, task]);
        console.log("Added Task");
      });
    }
  };

  const handleToggleComplete = (id, completed) => {
    let obj = { id: id, completed: !completed };
    changeTodo(obj);
    };

  const handleDeleteTodo = () => {
    if (selectedTodo.current !== null) {
      deleteTodo();
      const updatedTodos = todos.filter(
        (_, index) => index !== selectedTodo.current
      );
      setTodos(updatedTodos);
      selectedTodo.current = null;
      setAnchorEl(null);
    }
  };

  const handleMenuOpen = (event, index) => {
    setAnchorEl(event.currentTarget);
    selectedTodo.current = index;
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container className={classes.root} maxWidth="sm">
      <Typography variant="h5">My Todo App</Typography>

      <InputField
        value={inputValue}
        onChange={handleInputChange}
        onPress={handleKeyPress}
        onClick={handleAddTodo}
      />

      <ToDoList
        todos={todos}
        handleToggleComplete={handleToggleComplete}
        handleMenuOpen={handleMenuOpen}
        handleMenuClose={handleMenuClose}
        anchorEl={anchorEl}
        selectedTodo={selectedTodo.current}
        handleDeleteTodo={handleDeleteTodo}
      />
    </Container>
  );
};

export default TodoApp;
