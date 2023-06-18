import { useState } from "react";
import "./desk.css";
import { TASK_STATUSES, useUpdateTaskMutation } from "../../../services/task";
import Task from "../../../components/task/task";
import { useDrag, useDrop } from "react-dnd";

const DESK_TASK_TYPE = "DESK_TASK_TYPE";

function DraggableTask({ task }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DESK_TASK_TYPE,
    item: {
      taskId: task._id,
      name: task.name,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={isDragging ? { opacity: 0.5 } : { opacity: 1 }}
      className="w-100 mt-3"
    >
      <Task task={task} isDesk />
    </div>
  );
}

function Desk({ setError, sprints, tasks }) {
  const [sprint, setSprint] = useState("");
  const [updateTask] = useUpdateTaskMutation();
  const [todoProps, todoDrop] = useDrop(() => ({
    accept: DESK_TASK_TYPE,
    drop: (task) => dropTask(task, TASK_STATUSES.TODO),
  }));
  const [doingProps, doingDrop] = useDrop(() => ({
    accept: DESK_TASK_TYPE,
    drop: (task) => dropTask(task, TASK_STATUSES.DOING),
  }));
  const [doneProps, doneDrop] = useDrop(() => ({
    accept: DESK_TASK_TYPE,
    drop: (task) => dropTask(task, TASK_STATUSES.DONE),
  }));

  const dropTask = async (task, status) => {
    try {
      await updateTask({
        taskId: task.taskId,
        task: { name: task.name, status: status },
      }).unwrap();
    } catch (error) {
      setError({ isError: true, message: error?.data?.msg || error?.error });
    }
    return task;
  };

  const onSprintChange = (event) => {
    setSprint(event.target.value);
  };

  const renderSelect = () => {
    return (
      <div className="mb-3 col-5">
        <label htmlFor="storypoints" className="form-label lead mb-3">
          Для отображения скрам доски выберите спринт
        </label>
        <select
          defaultValue={"default"}
          className="form-select"
          aria-label="Default select example"
          onChange={onSprintChange}
          name="sprint"
          id="sprint"
        >
          <option disabled value={"default"}>
            -- Выберите спринт --
          </option>
          {sprints &&
            sprints.map((sprint) => (
              <option key={sprint._id} value={sprint._id}>
                {sprint.name}
              </option>
            ))}
        </select>
      </div>
    );
  };

  const renderTasks = (tasks) => {
    return (
      tasks.length > 0 &&
      tasks.map((task) => <DraggableTask key={task._id} task={task} />)
    );
  };

  const renderDesk = (sprintId) => {
    const sprintTasks = tasks.filter((task) => task?.sprint?._id === sprintId);

    if (sprintTasks.length === 0) {
      return <p className="h5 text-center">В этом спринте ещё нет задач.</p>;
    }

    const todoTasks = sprintTasks.filter(
      (task) => task.status === TASK_STATUSES.TODO
    );
    const doingTasks = sprintTasks.filter(
      (task) => task.status === TASK_STATUSES.DOING
    );
    const doneTasks = sprintTasks.filter(
      (task) => task.status === TASK_STATUSES.DONE
    );

    return (
      <div className="container">
        <div className="row p-2">
          <div className="col lead">TODO</div>
          <div className="col lead">DOING</div>
          <div className="col lead">DONE</div>
        </div>
        <div className="row p-2">
          <div className="col" ref={todoDrop}>
            {renderTasks(todoTasks)}
          </div>
          <div className="col" ref={doingDrop}>
            {renderTasks(doingTasks)}
          </div>
          <div className="col" ref={doneDrop}>
            {renderTasks(doneTasks)}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="desk-container p-3">
      {renderSelect()}
      {sprint && renderDesk(sprint)}
    </div>
  );
}

export default Desk;
