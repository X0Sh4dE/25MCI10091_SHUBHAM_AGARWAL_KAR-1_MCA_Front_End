import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks"));
    if (saved) setTasks(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now(), completed: false }]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const editTask = (id, newTitle) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, title: newTitle } : t
    ));
  };

  // FILTER
  const filteredTasks = tasks.filter(t => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase());

    if (filter === "completed") return t.completed && matchSearch;
    if (filter === "pending") return !t.completed && matchSearch;

    return matchSearch;
  });

  // DEADLINE HELPER
  const getTimeLeft = (dueDate) => {
    if (!dueDate) return Infinity;
    return new Date(dueDate) - new Date();
  };

  // SORTING 🔥
  const priorityOrder = { High: 3, Medium: 2, Low: 1 };
  const difficultyOrder = { Hard: 3, Medium: 2, Easy: 1 };

  const sortedTasks = [...filteredTasks].sort((a, b) => {

    if (priorityOrder[b.priority] !== priorityOrder[a.priority]) {
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }

    if (difficultyOrder[b.difficulty] !== difficultyOrder[a.difficulty]) {
      return difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty];
    }

    return getTimeLeft(a.dueDate) - getTimeLeft(b.dueDate);
  });

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="min-h-screen p-4 relative">

      {/* bubbles */}
      {[...Array(10)].map((_, i) => (
        <div key={i} className="bubble" style={{ left: `${i * 10}%` }}></div>
      ))}

      <Navbar search={search} setSearch={setSearch} />
      <AddTaskForm addTask={addTask} />

      <div className="flex justify-center gap-2 my-3">
        <button onClick={() => setFilter("all")} className="btn">All</button>
        <button onClick={() => setFilter("completed")} className="btn">Done</button>
        <button onClick={() => setFilter("pending")} className="btn">Pending</button>
      </div>

      <p className="text-center text-gray-400 mb-3">
        {completedCount} / {tasks.length} completed
      </p>

      <TaskList
        tasks={sortedTasks}
        deleteTask={deleteTask}
        toggleComplete={toggleComplete}
        editTask={editTask}
      />
    </div>
  );
}

export default App;