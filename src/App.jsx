import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "./App.css";
import TodoList from "./Components/TodoList";
import { TodoProvider } from "./Contexts/TodoContext";

function App() {
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
        <TodoProvider>
          <TodoList style={{}} />
        </TodoProvider>
      </div>
    </>
  );
}

export default App;
