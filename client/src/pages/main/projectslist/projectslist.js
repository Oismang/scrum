import { PencilFill, Trash } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { deleteUserProjectById } from '../../../idb/project';
import "./projectslist.css";

function ProjectsList({ updateData, setShowModal, setValues, user, projects, setError }) {

  const onEdit = (project) => {
    setValues({ name: project.name, project: project });
    setShowModal(true);
  }

  const onDelete = async (projectID) => {
    try {
      await deleteUserProjectById(projectID, user);
      updateData();
    } catch (error) {
      setError({ isError: true, message: error.message });
    }
  }

  const renderProjects = () => {
    return projects.map((project) => (
      <div className="row border-bottom p-3 mb-3 align-items-center" key={project._id}>
        <div className="col-3 project-title">
          <Link to={`${project.id}`}>
            <h1 className="display-6">{project.name}</h1>
          </Link>
        </div>

        <div className="col-auto">
          <div className="p-1 rounded bg-primary text-white">
            Бэклог <span className="badge bg-secondary">{project.backlog.length}</span>
          </div>
        </div>
        <div className="col-auto">
          <div className="p-1 rounded bg-info text-white">
            Спринты <span className="badge bg-secondary">{project.sprints.length}</span>
          </div>
        </div>
        <div className="col-auto ms-auto">
          <button onClick={() => onEdit(project)} type="button" className="btn btn-outline-dark p-1">
            <PencilFill size={20} />
          </button>
        </div>
        <div className="col-auto">
          <button onClick={() => onDelete(project.id)} type="button" className="btn btn-outline-danger p-1">
            <Trash size={20} />
          </button>
        </div>
      </div>
    ));
  };

  return <div className="projectslist-container container">
    {projects && renderProjects()}
  </div>;
}

export default ProjectsList;
