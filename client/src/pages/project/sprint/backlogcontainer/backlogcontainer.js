import Accordion from "react-bootstrap/Accordion";
import { useDrop } from "react-dnd";
import { useUpdateTaskMutation } from "../../../../services/task";
import CustomToggle from "../customtoggle/customtoggle";
import SprintTask, { SPRINT_TASK_TYPE } from "../sprinttask/sprinttask";

function BacklogContainer({ tasks, setError }) {
  const [updateTask] = useUpdateTaskMutation();
  const [collectedProps, drop] = useDrop(() => ({
    accept: SPRINT_TASK_TYPE,
    drop: (task) => dropTask(task),
  }));

  const dropTask = async (task) => {
    try {
      await updateTask({
        taskId: task.taskId,
        task: { name: task.name, sprint: null },
      }).unwrap();
    } catch (error) {
      setError({ isError: true, message: error?.data?.msg || error?.error });
    }
    return task;
  };

  const renderTasks = () => {
    return tasks.map((task) => <SprintTask key={task._id} task={task} />);
  };

  return (
    <div className="sprint-container mt-3">
      <Accordion defaultActiveKey="0">
        <div className="card">
          <div className="card-header d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <CustomToggle isOpened eventKey={"0"} />
              <h4 className="me-3">Бэклог</h4>
              <span className="badge me-3">{tasks.length || 0} задач</span>
            </div>
          </div>
          <Accordion.Collapse eventKey={"0"}>
            <div ref={drop} className="card-body">
              {tasks.length > 0 ? (
                renderTasks()
              ) : (
                <p className="lead">В бэклоге нет задач.</p>
              )}
            </div>
          </Accordion.Collapse>
        </div>
      </Accordion>
    </div>
  );
}

export default BacklogContainer;
