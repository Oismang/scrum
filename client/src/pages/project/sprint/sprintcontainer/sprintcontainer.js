import { useEffect, useState } from "react";
import { PencilFill, Trash } from "react-bootstrap-icons";
import Accordion from "react-bootstrap/Accordion";
import { useDrop } from "react-dnd";
import { addTaskToSprint } from "../../../../idb/sprint";
import { getAllSprintTasks } from "../../../../idb/task";
import CustomToggle from "../customtoggle/customtoggle";
import SprintTask, { SPRINT_TASK_TYPE } from "../sprinttask/sprinttask";
import "./sprintcontainer.css";

function SprintContainer({ index, sprint, onSprintEdit, onSprintDelete }) {
  const [collectedProps, drop] = useDrop(() => ({
    accept: SPRINT_TASK_TYPE,
    drop: (item) => dropTask(item),
  }))

  const [tasks, setTasks] = useState([]);

  const dropTask = async (item) => {
    const newTask = await addTaskToSprint(sprint, item.taskId);
    console.log(newTask);
    setTasks((prevTasks) => {
      return prevTasks === null ? [ newTask ] : [ ...prevTasks, newTask ];
    });

    return item;
  }

  const onDragEnd = (item, monitor) => {
    if (monitor.didDrop()) {
      setTasks((prevTasks) => {
        const index = prevTasks.findIndex((prevTask) => prevTask.id === item.taskId);
        return [
          ...prevTasks.slice(0, index),
          ...prevTasks.slice(index + 1)
        ]
      });
    }
  }

  useEffect(() => {
    const updateData = async () => {
      const sprintTasks = await getAllSprintTasks(sprint.id);
      console.log({ sprintTasks });
      setTasks(sprintTasks);
    }

    updateData();
  }, []);

  const renderTasks = () => {
    return tasks.map((task, i) => (
      <SprintTask 
        key={i}
        task={task}
        sprint={sprint}
        onDragEnd={onDragEnd}
      />
    ));
  }

  return (
    <div className="sprint-container mt-3">
      <Accordion defaultActiveKey="0">
        <div className="card">
          <div className="card-header d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <CustomToggle eventKey={index} />
              <h4 className="me-3">{sprint.name}</h4>
              <span className="badge me-3">{tasks?.length || 0} задач</span>
              <span className="badge me-3">{sprint?.startdate}</span>
              <span className="badge">{sprint?.enddate}</span>
            </div>
            <div>
              <button onClick={() => onSprintEdit(sprint)} type="button" className="btn btn-dark p-1 me-2">
                <PencilFill size={20} />
              </button>
              <button onClick={() => onSprintDelete(sprint.id)} type="button" className="btn btn-danger p-1">
                <Trash size={20} />
              </button>
            </div>
          </div>
          <Accordion.Collapse eventKey={index}>
            <div ref={drop} className="card-body">
              {tasks 
                ? renderTasks()
                : <p className="lead">В спринте ещё нет задач. Перенесите задачу из бэклога чтобы добавить</p>
              }
            </div>
          </Accordion.Collapse>
        </div>
      </Accordion>
    </div>
  );
}

export default SprintContainer;