import React, { useState, useEffect, useRef } from "react";
import { Container, Typography } from "@material-ui/core";
import CircularProgress from "@mui/material/CircularProgress";
import useStyles from "../assets/styles";
import { InputField } from "./InputField";
import ToDoList from "./ToDoList";
import TodoService from "../services/todo";
import Alerts from "../error-handlers/Alerts";

const TodoApp = () => {
  const classes = useStyles();
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(true);
  const selectedTodo = useRef();

  // states for Alerts
  const [open, setOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const handleAlert = (alertSeverity, alertMessage, open) => {
    setAlertSeverity(alertSeverity);
    setAlertMessage(alertMessage);
    setOpen(open);
  };

  const handleAlertClose = () => {
    setOpen(false);
  };

  const showAlert = Alerts(open, handleAlertClose, alertSeverity, alertMessage);

  function deleteTodo() {
    let toDelete = JSON.stringify(todos[selectedTodo.current]);
    let id = JSON.parse(toDelete).id;
    TodoService.deleteTask(id).then((task) => {
      handleAlert("success", "Task Deleted successfully!", true);
    });
  }

  function changeTodo(obj) {
    TodoService.putTask(obj)
      .then((data) => {
        console.log("after :", data);
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
    setLoading(true);
    const timer = setTimeout(() => {
      TodoService.getTasks()
        .then((tasks) => {
          setTodos(tasks);
        })
        .catch((error) => {
          console.log(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 2190);

    return () => clearTimeout(timer);
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
        handleAlert("success", "Task added successfully!", true);
      });
    }
  };

  const handleToggleComplete = (id, completed) => {
    let obj = { id: id, completed: !completed };
    completed
      ? handleAlert("success", "Task Marked In-complete!", true)
      : handleAlert("success", "Task Marked Completed!", true);
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
      <div>
        {loading ? (
          <CircularProgress /> // Display the loader while loading
        ) : (
          <ToDoList
            todos={todos}
            handleToggleComplete={handleToggleComplete}
            handleMenuOpen={handleMenuOpen}
            handleMenuClose={handleMenuClose}
            anchorEl={anchorEl}
            selectedTodo={selectedTodo.current}
            handleDeleteTodo={handleDeleteTodo}
          />
        )}
      </div>
      {open ? showAlert() : ""}
    </Container>
  );
};

export default TodoApp;
