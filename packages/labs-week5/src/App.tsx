import { useEffect, useRef, useState } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { Spinner } from "./Spinner";

type ModalProps = {
  headerLabel?: React.ReactNode;
  children: React.ReactNode;
  visible: boolean;
  onClose: () => void;
};

function Modal({ headerLabel, children, visible, onClose }: ModalProps) {
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
    >
      <div
        className="bg-white p-5 flex flex-col gap-3 rounded-sm"
        ref={childDiv}
      >
        <div className="flex justify-between">
          {(headerLabel && <h1 className="text-xl">{headerLabel}</h1>) || (
            <div></div>
          )}
          <button onClick={onClose}>
            <FontAwesomeIcon
              className="text-stone-600 text-xl"
              icon={faTimes}
            />
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

const floatToMoneyString = (n: number) =>
  `$${(Math.round(n * 100) / 100).toFixed(2)}`;

type GroceriesWidgetProps = {
  addItemToList: (item: string) => void;
};

function GroceriesWidget({ addItemToList }: GroceriesWidgetProps) {
  const [datasourceUrl, setDatasourceUrl] = useState<string | undefined>(
    undefined,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(undefined);
  const [groceries, setGroceries] = useState<
    { name: string; price: number; image: string; type: string }[] | undefined
  >(undefined);

  useEffect(() => {
    if (datasourceUrl) {
      setIsLoading(true);
      setGroceries(undefined);
      setError(undefined);
      const timeout = setTimeout(
        () =>
          datasourceUrl &&
          fetch(datasourceUrl)
            .then((response) => response.json())
            .then((data) => {
              setIsLoading(false);
              setGroceries(data);
            })
            .catch((e) => {
              setIsLoading(false);
              setError(e);
            }),
        2000,
      );

      return () => clearTimeout(timeout);
    } else {
      setGroceries(undefined);
      setIsLoading(false);
      setError(undefined);
    }
  }, [datasourceUrl]);

  return (
    <>
      <div className="flex gap-3">
        <h1 className="text-xl font-bold">Grocery Prices Today</h1>
        <select
          onChange={(e) => setDatasourceUrl(e.currentTarget.value)}
          disabled={isLoading}
          className="disabled:text-gray-400"
        >
          <option value="">Select a data source</option>
          <option value="https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json">
            MDN
          </option>
          <option value="https://joshthings.com/badurl.json">Who knows?</option>
        </select>
      </div>
      {(isLoading && !error && <Spinner />) ||
        (groceries && (
          <div className="grid grid-cols-[2fr_1fr_1fr] w-lg gap-1 items-center">
            <b>Name</b>
            <b>Price</b>
            <div></div>
            {groceries?.flatMap(({ name, price }, i) => [
              <div key={3 * i}>{name}</div>,
              <div key={3 * i + 1}>{floatToMoneyString(price)}</div>,
              <button
                key={3 * i + 2}
                className="text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xs p-3"
                onClick={() =>
                  addItemToList(`Buy ${name} (${floatToMoneyString(price)})`)
                }
              >
                Add to todos
              </button>,
            ])}
          </div>
        )) ||
        (error && <span className="text-red-700">{String(error)}</span>) ||
        "Please select a data source to view grocery prices."}
    </>
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

  const addTaskByName = (taskName: string) => {
    if (taskName === "") {
      return;
    }

    setTasks([...tasks, taskName]);
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
      <section className="mb-4">
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
      <section>
        <GroceriesWidget addItemToList={addTaskByName} />
      </section>
    </main>
  );
}

export default App;
