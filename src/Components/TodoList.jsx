import { useState, useContext, useEffect } from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Todo from "./Todo";
import { TodoContext } from "../Contexts/TodoContext";
import { ToastContext } from "../Contexts/ToastContext";

export default function TodoList() {
  const { todosInput, setTodosInput } = useContext(TodoContext);
  const { showHideToast } = useContext(ToastContext);

  const [input, setInput] = useState("");
  const [displayedType, setDisplayedType] = useState("all");

  const completedTodos = todosInput.filter((t) => t.isCompleted);
  const notCompletedTodos = todosInput.filter((t) => !t.isCompleted);

  let todosRendring = todosInput;

  if (displayedType === "completed") {
    todosRendring = completedTodos;
  } else if (displayedType === "non-completed") {
    todosRendring = notCompletedTodos;
  }

  const todos = todosRendring.map((item) => (
    <Todo key={item.id} todo={item} handleClick={handleClick} />
  ));

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
    showHideToast("تمت إضافة المهمة بنجاح");
  }

  function handleDisplayedType(e, newType) {
    if (newType !== null) {
      setDisplayedType(newType);
    }
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
    const storageTodos = JSON.parse(localStorage.getItem("Todos")) || [];
    setTodosInput(storageTodos);
  }, []);

  return (
    <Container
      maxWidth="sm"
      sx={{
        py: { xs: 2, sm: 4 },
        px: { xs: 1.5, sm: 2 },
      }}
    >
      <Card
        sx={{
          width: "100%",
          minWidth: 0,
          borderRadius: { xs: 2, sm: 3 },
          overflow: "hidden",
        }}
      >
        <CardContent
          sx={{
            p: { xs: 2, sm: 3 },
            "&:last-child": { pb: { xs: 2, sm: 3 } },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: "green",
              fontSize: { xs: "2rem", sm: "2.75rem" },
              fontWeight: "bold",
              textAlign: { xs: "center", sm: "right" },
              mb: 2,
            }}
          >
            مهامي
          </Typography>

          <Divider />

          <ToggleButtonGroup
            exclusive
            fullWidth
            value={displayedType}
            aria-label="فلترة المهام"
            onChange={handleDisplayedType}
            sx={{
              mt: 2.5,
              direction: "ltr",
              "& .MuiToggleButton-root": {
                flex: 1,
                minWidth: 0,
                px: { xs: 0.5, sm: 2 },
                py: 1,
                fontSize: { xs: "0.8rem", sm: "0.875rem" },
                whiteSpace: "nowrap",
              },
            }}
          >
            <ToggleButton value="non-completed">غير منجز</ToggleButton>
            <ToggleButton value="completed">منجز</ToggleButton>
            <ToggleButton value="all">الكل</ToggleButton>
          </ToggleButtonGroup>
        </CardContent>

        {todos}

        <Grid
          container
          spacing={1.5}
          sx={{
            p: { xs: 2, sm: 2.5 },
            pt: 1,
            alignItems: "stretch",
          }}
        >
          <Grid size={{ xs: 12, sm: 8 }}>
            <TextField
              value={input}
              onChange={(e) => setInput(e.target.value)}
              fullWidth
              label="مهمة جديدة"
              variant="outlined"
              size="medium"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <Button
              onClick={handleAddTask}
              variant="contained"
              fullWidth
              sx={{
                minHeight: 48,
                height: "100%",
                whiteSpace: "nowrap",
              }}
              disabled={input.trim().length === 0}
            >
              إضافة
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}
