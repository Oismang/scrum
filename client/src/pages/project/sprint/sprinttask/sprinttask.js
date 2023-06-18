import { useDrag } from "react-dnd";
import "./sprinttask.css";
import Avatar from "react-avatar";

export const SPRINT_TASK_TYPE = "SPRINT_TASK_TYPE";

function SprintTask({ task }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: SPRINT_TASK_TYPE,
    item: {
      taskId: task._id,
      name: task.name,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div style={isDragging ? { opacity: 0 } : {}} ref={drag} className="task">
      <div className="d-flex align-items-center">
        <div className="me-3">{task.name}</div>
        <span className="badge me-3">{task.status}</span>
      </div>
      <div className="d-flex align-items-center">
        <span className="badge">{task.storypoints}</span>
        {task?.assigne && (
          <Avatar
            className="ms-1"
            name={task.assigne.name}
            round
            size="25"
            textSizeRatio={2.5}
          />
        )}
      </div>
    </div>
  );
}

export default SprintTask;
