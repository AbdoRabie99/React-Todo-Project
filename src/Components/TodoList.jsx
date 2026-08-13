import { useState } from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Todo from "./Todo";
import { useContext, useEffect } from "react";
import { TodoContext } from "../Contexts/TodoContext";

// Main Function
export default function TodoList() {
  const { todosInput, setTodosInput } = useContext(TodoContext);
  const [input, setInput] = useState("");
  const [displayedType, setDisplayedType] = useState("all");

  // Filteration
  const completedTodos = todosInput.filter((t) => {
    return t.isCompleted;
  });
  const notCompletedTodos = todosInput.filter((t) => {
    return !t.isCompleted;
  });

  let todosRendring = todosInput;

  if (displayedType == "completed") {
    todosRendring = completedTodos;
  } else if (displayedType == "non-completed") {
    todosRendring = notCompletedTodos;
  } else {
    todosRendring = todosInput;
  }
  const todos = todosRendring.map((item) => {
    return <Todo key={item.id} todo={item} handleClick={handleClick} />;
  });
  function handleAddTask() {
    const updatedTodos = [
      ...todosInput,
      {
        id: Date.now(),
        title: input,
        details: "",
        isCompleted: false,
      },
    ];
    setTodosInput(updatedTodos);
    localStorage.setItem("Todos", JSON.stringify(updatedTodos));
    setInput("");
  }
  function handleDisplayedType(e) {
    setDisplayedType(e.target.value);
  }
  function handleClick(todoId) {
    const updatedTodos = todosInput.map((t) => {
      if (t.id === todoId) {
        return {
          ...t,
          isCompleted: !t.isCompleted,
        };
      }
      return t;
    });

    setTodosInput(updatedTodos);
    localStorage.setItem("Todos", JSON.stringify(updatedTodos));
  }
  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("Todos"));
    setTodosInput(storageTodos);
  }, []);
  // Main Return
  return (
    <>
      <Container maxWidth="sm">
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h2" style={{ color: "green" }}>
              مهامي
            </Typography>
            <Divider />
            <ToggleButtonGroup
              exclusive
              value={displayedType}
              aria-label="text alignment"
              onChange={handleDisplayedType}
              sx={{ mt: "20px", direction: "ltr" }}
            >
              <ToggleButton value="non-completed" aria-label="left aligned">
                غير منجز
              </ToggleButton>
              <ToggleButton value="completed" aria-label="centered">
                منجز
              </ToggleButton>
              <ToggleButton value="all" aria-label="right aligned">
                الكل
              </ToggleButton>
            </ToggleButtonGroup>
          </CardContent>
          {todos}
          <Grid container spacing={2} sx={{ padding: "10px" }}>
            <Grid size={8}>
              <TextField
                value={input}
                onChange={(eo) => {
                  setInput(eo.target.value);
                }}
                sx={{ width: "100%" }}
                label="مهمة جديدة"
                variant="outlined"
              
              />
            </Grid>
            <Grid size={4}>
              <Button
                onClick={handleAddTask}
                variant="contained"
                sx={{ width: "100%", height: "100%" }}
                disabled={input.trim().length === 0}
              >
                إضافة
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  );
}
