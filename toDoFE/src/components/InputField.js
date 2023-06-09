import React from "react";
import { TextField, Button } from "@material-ui/core"; 
import AddIcon from "@material-ui/icons/Add";
import useStyles from "../assets/styles";

export const InputField = (props) => {
    const classes = useStyles();
  return (
    <div className={classes.inputContainer}>
      <TextField
        className={classes.input}
        label="To do today"
        value={props.value}
        onChange={props.onChange}
        onKeyPress={props.onPress}
        variant="outlined"
      />
      <Button
        style={{margin:'10px'}}
        variant="contained"
        startIcon={<AddIcon />}
        onClick={props.onClick}
      >
        Add
      </Button>
    </div>
  );
};
