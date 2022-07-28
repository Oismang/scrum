import { useEffect, useState } from "react";
import { PlusLg } from "react-bootstrap-icons";
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";
import Task from "../../../components/task/task";
import { findProjectById } from "../../../idb/project";
import { addTask, deleteTaskById, editTaskById, getAllProjectsTasks, TASK_STATUSES } from "../../../idb/task";
import "./backlog.css";

const initialValues = {
  name: "",
  description: "",
  storypoints: "",
  duedate: ""
}

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
      setError({ isError: true, message: error.message });
    }
  }

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
          datecreation: new Date()
        }
  
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
  }

  const addNewTask = () => {
    setIsAdd(true);
    setValues(initialValues);
    setShowModal(true);
  }

  const renderHeader = () => {
    return !tasks 
      ? <p className="lead text-center">
        У вас ещё нет тасков. <a href="#" onClick={addNewTask} className="text-decoration-none">Создать</a> новый.
      </p>
      : <button onClick={addNewTask} type="button" className="ms-auto d-block btn btn-primary p-2 mb-3">
        <PlusLg size={25} /> Добавить
      </button>
  }

  const handleInputChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  }

  const renderModal = () => {
    return <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Создание таска</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Название таска
            </label>
            <input
              value={values.name}
              onChange={handleInputChange}
              type="text"
              className="form-control"
              id="name"
              name="name"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Описание
            </label>
            <textarea
              value={values.description}
              onChange={handleInputChange}
              type="text"
              className="form-control"
              id="description"
              name="description"
              rows="3"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="storypoints" className="form-label">
              Оценка сложности
            </label>
            <input
              value={values.storypoints}
              onChange={handleInputChange}
              type="number"
              className="form-control"
              id="storypoints"
              name="storypoints"
              aria-describedby="storypointsHelp"
              max={20}
              min={1}
              required
            />
            <div id="storypointsHelp" className="form-text">
              Минимальное значение 1, максимальное 20.
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="duedate" className="form-label">
              Дата дедлайна
            </label>
            <input
              value={values.duedate}
              onChange={handleInputChange}
              type="date"
              className="form-control"
              id="duedate"
              name="duedate"
              min={new Date().toISOString().split("T")[0]}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary d-block ms-auto"
            data-bs-dismiss="toast"
          >
            Создать
          </button>
        </form>
      </Modal.Body>
    </Modal>
  }

  const onEditTask = (task) => {
    setValues({ ...task });
    setShowModal(true);
  }

  const onDeleteTask = async (task) => {
    try {
      await deleteTaskById(task, project);
      updateData();
    } catch (error) {
      setError({ isError: true, message: error.message });
    }
  }

  const renderTasks = () => {
    return <div className="row row-cols-1 row-cols-md-3 g-4">
      {tasks && tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onEdit={onEditTask}
          onDelete={onDeleteTask}
         />
      ))}
    </div>
  }

  return (
    <div className="backlog-container p-3">
      {renderHeader()}
      {renderTasks()}
      {renderModal()}
    </div>
  );
}

export default Backlog;
