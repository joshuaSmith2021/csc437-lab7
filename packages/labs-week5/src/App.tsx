import { useRef, useState } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faTrashCan } from "@fortawesome/free-solid-svg-icons";

type ModalProps = {
  headerLabel?: React.ReactNode;
  children: React.ReactNode;
  visible: boolean;
  onClose: () => void;
};

function Modal({ headerLabel, children, visible, onClose }: ModalProps) {
  const containerDiv = useRef<HTMLDivElement>(null);
  const childDiv = useRef<HTMLDivElement>(null);

  return (
    <div
      className={[
        "w-screen",
        "h-screen",
        "bg-gray-800/75",
        "fixed",
        "top-0",
        "left-0",
        "grid",
        "place-content-center",
        ...(visible ? [] : ["hidden"]),
      ].join(" ")}
      onClick={(e) => {
        if (!childDiv.current?.contains(e.target as Node)) {
          onClose();
        }
      }}
      ref={containerDiv}
    >
      <div
        className="bg-white p-5 flex flex-col gap-3 rounded-sm"
        ref={childDiv}
      >
        <div className="flex justify-between">
          {(headerLabel && <h1>{headerLabel}</h1>) || <div></div>}
          <button onClick={onClose}>
            <FontAwesomeIcon className="text-stone-600" icon={faTimes} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

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
  const [isModalVisible, setIsModalVisible] = useState(false);

  const addTask = () => {
    if (newTaskText === "") {
      return;
    }

    setNewTaskText("");
    setTasks([...tasks, newTaskText]);
  };

  return (
    <main className="m-4">
      <Modal
        headerLabel="New Task"
        visible={isModalVisible}
        onClose={() => {
          console.log("hit");
          setIsModalVisible(false);
        }}
      >
        <AddTaskForm
          taskText={newTaskText}
          setTaskText={setNewTaskText}
          onSubmit={addTask}
        />
      </Modal>
      <button
        className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 p-3 text-white rounded-sm my-2"
        onClick={() => setIsModalVisible(true)}
      >
        New Task
      </button>
      <section>
        <h1 className="text-xl font-bold">To do</h1>
        <ul className="flex flex-col">
          {tasks.map((task, i) => (
            <TodoItem
              key={i}
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
