import { PencilFill, Trash } from "react-bootstrap-icons";
import "./task.css";
import Avatar from "react-avatar";

function Task({ task, onEdit, onDelete, isDesk }) {
  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between">
        <h4>{task.name}</h4>
        {!isDesk && (
          <div>
            <button
              onClick={() => onEdit(task)}
              type="button"
              className="btn btn-dark p-1"
            >
              <PencilFill size={20} />
            </button>
            <button
              onClick={() => onDelete(task)}
              type="button"
              className="btn btn-danger p-1 ms-2"
            >
              <Trash size={20} />
            </button>
          </div>
        )}
      </div>
      <div className="card-body">
        <div className="row mb-2">
          <div className="col">
            <p className="card-text">{task.description}</p>
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-6">
            <p className="card-text">Oценка сложности</p>
          </div>
          <div className="col-6">
            <p className="card-text">
              <span className="badge bg-secondary">{task.storypoints}</span>
            </p>
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-6">
            <p className="card-text">Статус</p>
          </div>
          <div className="col-6">
            <p className="card-text">
              <span className="badge bg-secondary">{task.status}</span>
            </p>
          </div>
        </div>

        {task?.assigne?.name && (
          <div className="row mb-2">
            <div className="col-6">
              <p className="card-text">Назначенный пользователь</p>
            </div>
            <div className="col-6">
              <div className="card-text d-flex">
                <span className="badge bg-secondary d-block text-truncate">
                  <Avatar
                    className="me-2"
                    name={task?.assigne?.name}
                    round
                    size="25"
                    textSizeRatio={2.5}
                  />
                  <span>{task?.assigne?.name}</span>
                </span>
              </div>
            </div>
          </div>
        )}

        {task?.reporter?.name && (
          <div className="row mb-2">
            <div className="col-6">
              <p className="card-text">Создатель задачи</p>
            </div>
            <div className="col-6">
              <div className="card-text d-flex">
                <span className="badge bg-secondary d-block text-truncate">
                  <Avatar
                    className="me-2"
                    name={task?.reporter?.name}
                    round
                    size="25"
                    textSizeRatio={2.5}
                  />
                  <span>{task?.reporter?.name}</span>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="card-footer">
        <p className="card-text">
          <small className="text-muted">
            Дата создания: {new Date(task.createdAt).toLocaleDateString()}
          </small>
        </p>
      </div>
    </div>
  );
}

export default Task;
