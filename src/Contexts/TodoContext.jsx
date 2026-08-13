import { createContext, useState } from "react";
const TodoContext = createContext();

const initialList = [
  {
    id: 1,
    title: "المهمة الأولى",
    details: "تفاصيل المهمة الأولى",
    isCompleted: false,
  },
  {
    id: 2,
    title: "المهمة الثانية",
    details: "تفاصيل المهمة الثانية",
    isCompleted: false,
  },
];

function TodoProvider({ children }) {
  const [todosInput, setTodosInput] = useState(initialList);

  return (
    <TodoContext.Provider value={{ todosInput, setTodosInput }}>
      {children}
    </TodoContext.Provider>
  );
}

export { TodoContext, TodoProvider };
