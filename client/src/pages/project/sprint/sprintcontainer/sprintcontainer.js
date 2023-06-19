import { PencilFill, Trash } from "react-bootstrap-icons";
import Accordion from "react-bootstrap/Accordion";
import { useDrop } from "react-dnd";
import CustomToggle from "../customtoggle/customtoggle";
import SprintTask, { SPRINT_TASK_TYPE } from "../sprinttask/sprinttask";
import "./sprintcontainer.css";
import { useUpdateTaskMutation } from "../../../../services/task";
import { USER_ROLES } from "../../../../services/auth";

function SprintContainer({
  index,
  sprint,
  tasks,
  onSprintEdit,
  onSprintDelete,
  setError,
  user,
}) {
  const [updateTask] = useUpdateTaskMutation();
  const [collectedProps, drop] = useDrop(() => ({
    accept: SPRINT_TASK_TYPE,
    drop: (task) => dropTask(task),
  }));

  const dropTask = async (task) => {
    console.log(task);
    try {
      await updateTask({
        taskId: task.taskId,
        task: { name: task.name, sprint: sprint._id },
      }).unwrap();
    } catch (error) {
      setError({ isError: true, message: error?.data?.msg || error?.error });
    }

    return task;
  };

  const renderTasks = () => {
    return tasks.map((task) => (
      <SprintTask key={task._id} task={task} sprint={sprint} />
    ));
  };

  return (
    <div className="sprint-container mt-3">
      <Accordion defaultActiveKey="0">
        <div className="card">
          <div className="card-header d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <CustomToggle eventKey={index} />
              <h4 className="me-3">{sprint.name}</h4>
              <span className="badge me-3">{tasks?.length || 0} задач</span>
              {sprint?.startDate && (
                <span className="badge me-3">{sprint.startDate}</span>
              )}
              {sprint?.endDate && (
                <span className="badge">{sprint.endDate}</span>
              )}
            </div>
            {user?.role === USER_ROLES.ADMIN && (
              <div>
                <button
                  onClick={() => onSprintEdit(sprint)}
                  type="button"
                  className="btn btn-dark p-1 me-2"
                >
                  <PencilFill size={20} />
                </button>
                <button
                  onClick={() => onSprintDelete(sprint)}
                  type="button"
                  className="btn btn-danger p-1"
                >
                  <Trash size={20} />
                </button>
              </div>
            )}
          </div>
          <Accordion.Collapse eventKey={index}>
            <div ref={drop} className="card-body">
              {tasks.length > 0 ? (
                renderTasks()
              ) : (
                <p className="lead">
                  В спринте ещё нет задач. Перенесите задачу из бэклога чтобы
                  добавить.
                </p>
              )}
            </div>
          </Accordion.Collapse>
        </div>
      </Accordion>
    </div>
  );
}

export default SprintContainer;
