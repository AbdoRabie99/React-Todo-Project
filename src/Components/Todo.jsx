import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import "../App.css";
import { useState } from "react";

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
import { useContext } from "react";
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
    const updatedTodos = todosInput.filter((t) => {
      return t.id != todo.id;
    });
    setTodosInput(updatedTodos);
    localStorage.setItem("Todos", JSON.stringify(updatedTodos));
    setOpen(false);
  }
  function handleSubmit(e) {
    e.preventDefault();
    const updatedTodos = todosInput.map((t) => {
      if (todo.id == t.id) {
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
    <Card sx={{ minWidth: 275, bgcolor: "#303f9f", margin: "10px" }}>
      {/* Dialog for Deleting */}
      <Dialog
        sx={{ direction: "rtl" }}
        open={open}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
      >
        <DialogTitle id="alert-dialog-title" sx={{ color: "red" }}>
          غلق المهمة
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ color: "black" }}
          >
            هل تريد حقا إلغاء هذه المهمة بالتحديد
          </DialogContentText>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ color: "black" }}
          >
            تذكر أنك إذا قمت بإلغائها لن تستطيع استعادتها مرة أخرى
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} autoFocus>
            إغلاق
          </Button>
          <Button onClick={handleDelete}>نعم قم بالحذف</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for Updating */}
      <Dialog open={inputOpen} onClose={handleUpdateClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <form onSubmit={handleSubmit} id="subscription-form">
            <TextField
              sx={{ direction: "rtl", marginBottom: "10px" }}
              autoFocus
              required
              margin="dense"
              fullWidth
              label="العنوان"
              variant="standard"
              value={inputUpdate}
              onChange={(e) => {
                setInputUpdate(e.target.value);
              }}
            />
            <TextField
              sx={{ direction: "rtl" }}
              autoFocus
              required
              margin="dense"
              fullWidth
              label="التفاصيل"
              variant="standard"
              value={inputDetails}
              onChange={(e) => {
                setInputDetails(e.target.value);
              }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>إلغاء</Button>
          <Button type="submit" form="subscription-form">
            تعديل
          </Button>
        </DialogActions>
      </Dialog>
      <CardContent>
        <Grid container spacing={2}>
          <Grid size={8}>
            <Typography
              gutterBottom
              sx={{
                color: "white",
                fontSize: 24,
                textAlign: "right",
                textDecoration: todo.isCompleted ? "line-through" : "none",
              }}
            >
              {todo.title}
            </Typography>
            <Typography
              gutterBottom
              sx={{
                color: "white",
                fontSize: 16,
                textAlign: "right",
              }}
            >
              {todo.details}
            </Typography>
          </Grid>
          <Grid size={4}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                textAlign: "right",
              }}
            >
              <IconButton
                className="iconButton"
                aria-label="check"
                sx={{
                  bgcolor: todo.isCompleted ? "green" : "white",
                  color: todo.isCompleted ? "white" : "green",
                  borderRadius: "50%",
                  border: "1px solid green",

                  "&:hover": {
                    bgcolor: todo.isCompleted
                      ? "green !important"
                      : "white !important",
                  },
                }}
                onClick={handleClickCheck}
              >
                <CheckRoundedIcon />
              </IconButton>
              <IconButton
                sx={{
                  bgcolor: "white",
                  color: "#039be5",
                  border: "1px solid #039be5",
                  borderRadius: "50%",
                  "&:hover": {
                    bgcolor: "#039be5 !important",
                    color: "white",
                  },
                }}
                className="iconButton"
                aria-label="edit"
                onClick={() => {
                  setInputUpdate(todo.title);
                  setInputDetails(todo.details);
                  setInputOpen(true);
                }}
              >
                <EditOutlinedIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  setOpen(true);
                }}
                sx={{
                  bgcolor: "white",
                  color: "#d32f2f",
                  border: "1px solid #d32f2f",
                  borderRadius: "50%",
                  "&:hover": {
                    bgcolor: "#d32f2f !important",
                    color: "white",
                  },
                }}
                className="iconButton"
                aria-label="delete"
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
