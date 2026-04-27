import TaskCard from "./TaskCard";

export default function TaskList({ tasks, deleteTask, toggleComplete, editTask }) {
  return (
    <div className="grid gap-3">
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleComplete={toggleComplete}
          editTask={editTask}
        />
      ))}
    </div>
  );
}