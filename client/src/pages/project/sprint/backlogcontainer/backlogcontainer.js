import { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { getAllTasksNotInSprint } from "../../../../idb/task";
import CustomToggle from "../customtoggle/customtoggle";
import SprintTask, { SPRINT_TASK_TYPE } from "../sprinttask/sprinttask";
import { useDrop } from "react-dnd";
import { removeTaskFromSprint } from "../../../../idb/sprint";

function BacklogContainer({ project }) {
  const [tasks, setTasks] = useState([]);

  const [collectedProps, drop] = useDrop(() => ({
    accept: SPRINT_TASK_TYPE,
    drop: (item) => dropTask(item),
  }))

  const dropTask = async (item) => {
    const newTask = await removeTaskFromSprint(item.sprintId, item.taskId);
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
      const tasksNotInSprint = await getAllTasksNotInSprint(project);
      console.log({ tasksNotInSprint });
      setTasks(tasksNotInSprint);
    }

    updateData();
  }, []);

  const renderTasks = () => {
    return tasks.map((task, i) => (
      <SprintTask 
        key={i}
        task={task}
        onDragEnd={onDragEnd}
      />
    ));
  }

  return (
    <div className="sprint-element mt-3">
      <Accordion defaultActiveKey="0">
        <div className="card">
          <div className="card-header d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <CustomToggle eventKey={"0"} />
              <h4 className="me-3">Бэклог</h4>
              <span className="badge me-3">{tasks?.length || 0} задач</span>
            </div>
          </div>
          <Accordion.Collapse eventKey={"0"}>
            <div ref={drop} className="card-body">
              {tasks 
                ? renderTasks()
                : <p className="lead">В бэклоге нет задач.</p>
              }
            </div>
          </Accordion.Collapse>
        </div>
      </Accordion>
    </div>
  );
}

export default BacklogContainer;
