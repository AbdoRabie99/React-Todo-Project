import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import "../App.css";
import { useState, useContext } from "react";

// ICONS
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

// Dialog Imports
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

// Context
import { TodoContext } from "../Contexts/TodoContext";

export default function Todo({ todo, handleClick }) {
  const { todosInput, setTodosInput } = useContext(TodoContext);
  const [open, setOpen] = useState(false);
  const [inputOpen, setInputOpen] = useState(false);
  const [inputUpdate, setInputUpdate] = useState("");
  const [inputDetails, setInputDetails] = useState("");

  function handleDeleteClose() {
    setOpen(false);
  }

  function handleClickCheck() {
    handleClick(todo.id);
  }

  function handleDelete() {
    const updatedTodos = todosInput.filter((t) => t.id !== todo.id);
    setTodosInput(updatedTodos);
    localStorage.setItem("Todos", JSON.stringify(updatedTodos));
    setOpen(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const updatedTodos = todosInput.map((t) => {
      if (todo.id === t.id) {
        return {
          ...t,
          title: inputUpdate,
          details: inputDetails,
        };
      }
      return t;
    });

    setTodosInput(updatedTodos);
    localStorage.setItem("Todos", JSON.stringify(updatedTodos));
    setInputOpen(false);
  }

  function handleUpdateClose() {
    setInputOpen(false);
  }

  return (
    <Card
      sx={{
        width: "calc(100% - 20px)",
        minWidth: 0,
        maxWidth: "100%",
        boxSizing: "border-box",
        bgcolor: "#303f9f",
        m: "10px",
        overflow: "hidden",
      }}
    >
      {/* Dialog for Deleting */}
      <Dialog
        sx={{ direction: "rtl" }}
        open={open}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="alert-dialog-title" sx={{ color: "red" }}>
          غلق المهمة
        </DialogTitle>

        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ color: "black" }}
          >
            هل تريد حقا إلغاء هذه المهمة بالتحديد؟
          </DialogContentText>

          <DialogContentText sx={{ color: "black", mt: 1 }}>
            تذكر أنك إذا قمت بإلغائها لن تستطيع استعادتها مرة أخرى.
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ flexWrap: "wrap" }}>
          <Button onClick={handleDeleteClose} autoFocus>
            إغلاق
          </Button>
          <Button onClick={handleDelete}>نعم قم بالحذف</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for Updating */}
      <Dialog
        open={inputOpen}
        onClose={handleUpdateClose}
        fullWidth
        maxWidth="sm"
        sx={{ direction: "rtl" }}
      >
        <DialogTitle>تعديل المهمة</DialogTitle>

        <DialogContent>
          <DialogContentText>
            عدّل عنوان المهمة والتفاصيل الخاصة بها.
          </DialogContentText>

          <form onSubmit={handleSubmit} id="subscription-form">
            <TextField
              sx={{ mb: 1 }}
              autoFocus
              required
              margin="dense"
              fullWidth
              label="العنوان"
              variant="standard"
              value={inputUpdate}
              onChange={(e) => setInputUpdate(e.target.value)}
            />

            <TextField
              required
              margin="dense"
              fullWidth
              label="التفاصيل"
              variant="standard"
              value={inputDetails}
              onChange={(e) => setInputDetails(e.target.value)}
            />
          </form>
        </DialogContent>

        <DialogActions sx={{ flexWrap: "wrap" }}>
          <Button onClick={handleUpdateClose}>إلغاء</Button>
          <Button type="submit" form="subscription-form">
            تعديل
          </Button>
        </DialogActions>
      </Dialog>

      <CardContent
        sx={{
          p: { xs: 1.5, sm: 2 },
          "&:last-child": { pb: { xs: 1.5, sm: 2 } },
        }}
      >
        <Grid container spacing={{ xs: 1, sm: 2 }} alignItems="center">
          <Grid size={{ xs: 12, sm: 8 }} sx={{ minWidth: 0 }}>
            <Typography
              gutterBottom
              sx={{
                color: "white",
                fontSize: { xs: 18, sm: 24 },
                textAlign: "right",
                textDecoration: todo.isCompleted ? "line-through" : "none",
                overflowWrap: "anywhere",
                wordBreak: "break-word",
              }}
            >
              {todo.title}
            </Typography>

            {todo.details && (
              <Typography
                gutterBottom
                sx={{
                  color: "white",
                  fontSize: { xs: 14, sm: 16 },
                  textAlign: "right",
                  overflowWrap: "anywhere",
                  wordBreak: "break-word",
                }}
              >
                {todo.details}
              </Typography>
            )}
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }} sx={{ minWidth: 0 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "flex-start", sm: "space-around" },
                gap: { xs: 1.5, sm: 0.5 },
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <IconButton
                aria-label="check"
                className="iconButton"
                onClick={handleClickCheck}
                sx={{
                  bgcolor: todo.isCompleted ? "green" : "white",
                  color: todo.isCompleted ? "white" : "green",
                  borderRadius: "50%",
                  border: "1px solid green",
                  "&:hover": {
                    bgcolor: todo.isCompleted ? "green" : "white",
                  },
                }}
              >
                <CheckRoundedIcon />
              </IconButton>

              <IconButton
                aria-label="edit"
                className="iconButton"
                onClick={() => {
                  setInputUpdate(todo.title);
                  setInputDetails(todo.details);
                  setInputOpen(true);
                }}
                sx={{
                  bgcolor: "white",
                  color: "#039be5",
                  border: "1px solid #039be5",
                  borderRadius: "50%",
                  "&:hover": {
                    bgcolor: "#039be5",
                    color: "white",
                  },
                }}
              >
                <EditOutlinedIcon />
              </IconButton>

              <IconButton
                aria-label="delete"
                className="iconButton"
                onClick={() => setOpen(true)}
                sx={{
                  bgcolor: "white",
                  color: "#d32f2f",
                  border: "1px solid #d32f2f",
                  borderRadius: "50%",
                  "&:hover": {
                    bgcolor: "#d32f2f",
                    color: "white",
                  },
                }}
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
