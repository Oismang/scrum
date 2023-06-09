import { useDrag } from 'react-dnd';
import "./sprinttask.css";

export const SPRINT_TASK_TYPE = "SPRINT_TASK_TYPE";

function SprintTask({ task, sprint, onDragEnd }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: SPRINT_TASK_TYPE,
    item: { 
      taskId: task.id,
      sprintId: sprint ? sprint.id : null 
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => onDragEnd(item, monitor)
  }))

  return (
    <div style={isDragging ? {opacity: 0} : {}} ref={drag} className="task">
      <div className="d-flex align-items-center">
        <div className="me-3">{task.name}</div>
        <span className="badge me-3">{task.status}</span>
      </div>
      <div className="d-flex align-items-center">
        <span className="badge me-3">{task.duedate}</span>
        <span className="badge">{task.storypoints}</span>
      </div>
    </div>
  );
}

export default SprintTask;
