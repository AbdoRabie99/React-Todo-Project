import { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "./App.css";
import TodoList from "./Components/TodoList";
import { TodoProvider } from "./Contexts/TodoContext";
import Toast from "./Components/Toast";
import { ToastContext } from "./Contexts/ToastContext";

function App() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  function showHideToast(message) {
    setOpen(true);
    setMessage(message);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }

  // Main Return
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          direction: "rtl",
        }}
      >
        <Toast open={open} message={message} />
        <TodoProvider>
          <ToastContext.Provider value={{ showHideToast }}>
            <TodoList style={{}} />
          </ToastContext.Provider>
        </TodoProvider>
      </div>
    </>
  );
}

export default App;
