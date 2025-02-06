import { useState } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

type TodoItemProps = {
  label: string;
  onDelete?: () => void;
};

function TodoItem({ label, onDelete }: TodoItemProps) {
  return (
    <li className="flex flex-row justify-between max-w-3xs">
      <label className="text-stone-950">
        <input type="checkbox" /> {label}
      </label>
      <button onClick={onDelete}>
        <FontAwesomeIcon
          className="text-stone-600"
          icon={faTrashCan}
          title="Delete"
        />
      </button>
    </li>
  );
}

type AddTaskFormProps = {
  taskText: string;
  setTaskText: (newTaskText: string) => void;
  onSubmit: () => void;
};

function AddTaskForm({ taskText, setTaskText, onSubmit }: AddTaskFormProps) {
  return (
    <div className="flex gap-3">
      {" "}
      {/* Unfortunately comments in JSX have to be done like this */}
      <input
        placeholder="New task name"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        className="border border-slate-900 rounded-sm p-3"
      />
      <button
        className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 p-3 text-white rounded-sm"
        onClick={onSubmit}
      >
        Add task
      </button>
    </div>
  );
}

function App() {
  const [tasks, setTasks] = useState(["Eat", "Sleep", "Repeat"]);
  const [newTaskText, setNewTaskText] = useState("");

  const addTask = () => {
    if (newTaskText === "") {
      return;
    }

    setNewTaskText("");
    setTasks([...tasks, newTaskText]);
  };

  return (
    <main className="m-4">
      {" "}
      {/* Tailwind: margin level 4 on all sides */}
      <AddTaskForm
        taskText={newTaskText}
        setTaskText={setNewTaskText}
        onSubmit={addTask}
      />
      <section>
        <h1 className="text-xl font-bold">To do</h1>
        <ul className="flex flex-col">
          {tasks.map((task) => (
            <TodoItem
              label={task}
              onDelete={() =>
                setTasks(tasks.splice(0).filter((query) => query !== task))
              }
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default App;
