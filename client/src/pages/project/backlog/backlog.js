import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NoDataText from "../../../components/nodatatext/nodatatext";
import Task from "../../../components/task/task";
import { findProjectById } from "../../../idb/project";
import {
  addTask,
  deleteTaskById,
  editTaskById,
  getAllProjectsTasks,
  TASK_STATUSES,
} from "../../../idb/task";
import "./backlog.css";
import TaskModal from "./taskmodal/taskmodal";

const initialValues = {
  name: "",
  description: "",
  storypoints: "",
  assigne: "",
  sprint: null,
};

function Backlog({ setError }) {
  const { projectID } = useParams();
  const [values, setValues] = useState(initialValues);
  const [showModal, setShowModal] = useState(false);
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [isAdd, setIsAdd] = useState(false);

  const updateData = async () => {
    try {
      const projectObj = await findProjectById(+projectID);
      const tasksObj = await getAllProjectsTasks(projectObj);
      setProject(projectObj);
      setTasks(tasksObj);
    } catch (error) {
      console.log("updateData ERROR BACKLOG", error);
      setError({ isError: true, message: error.message });
    }
  };

  useEffect(() => {
    updateData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      if (isAdd) {
        const task = {
          ...values,
          status: TASK_STATUSES.TODO,
          datecreation: new Date(),
        };

        await addTask(task, project);
      } else {
        await editTaskById(values);
      }
      setValues(initialValues);
      updateData();
    } catch (error) {
      setError({ isError: true, message: error.message });
    } finally {
      setShowModal(false);
    }
  };

  const addNewTask = () => {
    setIsAdd(true);
    setValues(initialValues);
    setShowModal(true);
  };

  const handleInputChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const onEditTask = (task) => {
    setIsAdd(false);
    setValues({ ...task });
    setShowModal(true);
  };

  const onDeleteTask = async (task) => {
    try {
      await deleteTaskById(task, project);
      updateData();
    } catch (error) {
      setError({ isError: true, message: error.message });
    }
  };

  const renderTasks = () => {
    return (
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {tasks &&
          tasks.map((task) => (
            <div className="col">
              <Task
                key={task.id}
                task={task}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
              />
            </div>
          ))}
      </div>
    );
  };

  return (
    <div className="backlog-container p-3">
      <NoDataText
        dataToCheck={tasks}
        onAddFuction={addNewTask}
        text={"задач"}
      />
      {renderTasks()}
      <TaskModal
        showModal={showModal}
        setShowModal={setShowModal}
        onSubmit={onSubmit}
        values={values}
        handleInputChange={handleInputChange}
      />
    </div>
  );
}

export default Backlog;
