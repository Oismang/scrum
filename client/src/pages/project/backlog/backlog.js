import { useState } from "react";
import { useParams } from "react-router-dom";
import NoDataText from "../../../components/nodatatext/nodatatext";
import Task from "../../../components/task/task";
import {
  TASK_STATUSES,
  useCreateProjectTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "../../../services/task";
import "./backlog.css";
import TaskModal from "./taskmodal/taskmodal";

const initialValues = {
  name: "",
  description: "",
  storypoints: "",
  assigne: undefined,
};

function Backlog({ setError, tasks, users }) {
  const { projectId } = useParams();
  const [createProjectTask] = useCreateProjectTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const [values, setValues] = useState(initialValues);
  const [showModal, setShowModal] = useState(false);
  const [isAdd, setIsAdd] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      if (isAdd) {
        const task = {
          ...values,
          status: TASK_STATUSES.TODO,
        };

        await createProjectTask({ projectId, task }).unwrap();
      } else {
        await updateTask({ taskId: values._id, task: values }).unwrap();
      }
      setValues(initialValues);
    } catch (error) {
      setError({ isError: true, message: error?.data?.msg || error?.error });
    } finally {
      setShowModal(false);
    }
  };

  const addNewTask = () => {
    setIsAdd(true);
    setValues(initialValues);
    setShowModal(true);
  };

  const onEditTask = (task) => {
    setIsAdd(false);
    setValues({ ...task });
    setShowModal(true);
  };

  const onDeleteTask = async (task) => {
    try {
      await deleteTask(task._id).unwrap();
    } catch (error) {
      setError({ isError: true, message: error?.data?.msg || error?.error });
    }
  };

  const handleInputChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const renderTasks = () => {
    return (
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {tasks &&
          tasks.map((task) => (
            <div key={task._id} className="col">
              <Task task={task} onEdit={onEditTask} onDelete={onDeleteTask} />
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
        isAdd={isAdd}
        showModal={showModal}
        setShowModal={setShowModal}
        onSubmit={onSubmit}
        values={values}
        users={users}
        handleInputChange={handleInputChange}
      />
    </div>
  );
}

export default Backlog;
