import { useState } from "react";

export default function TaskCard({ task, deleteTask, toggleComplete, editTask }) {
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const isOverdue =
    task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <div className={`p-4 bg-gray-800 rounded shadow ${isOverdue ? "border-l-4 border-red-500" : ""}`}>

      {editing ? (
        <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
      ) : (
        <h2 className={task.completed ? "line-through text-gray-400" : ""}>
          {task.title}
        </h2>
      )}

      <p>Priority: {task.priority}</p>
      <p>Difficulty: {task.difficulty}</p>
      <p>Due: {task.dueDate || "None"}</p>

      <div className="flex gap-2 mt-2">
        <button onClick={() => toggleComplete(task.id)} className="btn-green">
          Done
        </button>

        <button onClick={() => deleteTask(task.id)} className="btn-red">
          Delete
        </button>

        {editing ? (
          <button onClick={() => { editTask(task.id, newTitle); setEditing(false); }} className="btn-blue">
            Save
          </button>
        ) : (
          <button onClick={() => setEditing(true)} className="btn-blue">
            Edit
          </button>
        )}
      </div>
    </div>
  );
}