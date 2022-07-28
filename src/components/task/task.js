import { PencilFill, Trash } from "react-bootstrap-icons";

function Task({ task, onEdit, onDelete }) {
  return (
    <div className="col">
      <div className="card">
        <div className="card-header d-flex justify-content-between">
          <h4>{task.name}</h4>
          <div>
            <button onClick={() => onEdit(task)} type="button" className="btn btn-dark p-1">
              <PencilFill size={20} />
            </button>
            <button onClick={() => onDelete(task)} type="button" className="btn btn-danger p-1 ms-2">
              <Trash size={20} />
            </button>
          </div>
        </div>
        <div className="card-body">
          <div className="row mb-2">
            <div className="col">
              <p className="card-text">{task.description}</p>
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <p className="card-text">Oценка сложности</p>
            </div>
            <div className="col-auto">
              <p className="card-text">
                <span className="badge bg-secondary">{task.storypoints}</span>
              </p>
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <p className="card-text">Статус</p>
            </div>
            <div className="col-auto">
              <p className="card-text">
                <span className="badge bg-secondary">{task.status}</span>
              </p>
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <p className="card-text">Дата дедлайна</p>
            </div>
            <div className="col-auto">
              <p className="card-text">
                <span className="badge bg-secondary">{new Date(task.duedate).toLocaleDateString()}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <p className="card-text">
            <small className="text-muted">Дата создания: {new Date(task.datecreation).toLocaleDateString()}</small>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Task;
