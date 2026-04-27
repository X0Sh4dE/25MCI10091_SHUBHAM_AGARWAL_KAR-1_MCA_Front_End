import { useState } from "react";

export default function AddTaskForm({ addTask }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Low");
  const [difficulty, setDifficulty] = useState("Easy");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTask({ title, priority, difficulty, dueDate });

    setTitle("");
    setPriority("Low");
    setDifficulty("Easy");
    setDueDate("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-4 rounded-xl mb-4 shadow-md"
    >
      {/* 🔹 ROW 1: TEXT AREA */}
      <textarea
        className="w-full p-3 mb-4 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
        placeholder="Enter your task..."
        rows="2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* 🔹 ROW 2: 3 COLUMN GRID */}
      <div className="grid grid-cols-3 gap-3">

        {/* Priority */}
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white focus:outline-none"
        >
          <option className="bg-gray-800 text-white">Low</option>
          <option className="bg-gray-800 text-white">Medium</option>
          <option className="bg-gray-800 text-white">High</option>
        </select>

        {/* Difficulty */}
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white focus:outline-none"
        >
          <option className="bg-gray-800 text-white">Easy</option>
          <option className="bg-gray-800 text-white">Medium</option>
          <option className="bg-gray-800 text-white">Hard</option>
        </select>

        {/* Due Date */}
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white focus:outline-none"
        />
      </div>

      {/* 🔹 BUTTON ROW */}
      <div className="mt-4 flex justify-end">
        <button className="btn-blue px-4 py-2">Add Task</button>
      </div>
    </form>
  );
}