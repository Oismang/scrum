import { PencilFill, Trash } from "react-bootstrap-icons";
import { Link, useParams } from "react-router-dom";
import "./projectslist.css";
import { useDeleteProjectMutation } from "../../../services/project";
import { useGetAllProjectTasksQuery } from "../../../services/task";
import { useGetAllProjectSprintsQuery } from "../../../services/sprint";
import { useEffect } from "react";

function ProjectsList({ setShowModal, setValues, projects, setError, setIsAdd }) {
  const [deleteProject] = useDeleteProjectMutation();

  const onEdit = (project) => {
    setIsAdd(false);
    setValues({ name: project.name, projectId: project._id });
    setShowModal(true);
  };

  const onDelete = async (projectId) => {
    try {
      await deleteProject(projectId).unwrap();
    } catch (error) {
      setError({ isError: true, message: error.message });
    }
  };

  return (
    <div className="projectslist-container container">
      {projects &&
        projects.map((project) => (
          <ProjectItem
            key={project._id}
            project={project}
            onEdit={onEdit}
            onDelete={onDelete}
            setError={setError}
          />
        ))}
    </div>
  );
}

function ProjectItem({ project, onEdit, onDelete, setError }) {
  const {
    data: tasks,
    isError: isTaskError,
    error: taskError,
  } = useGetAllProjectTasksQuery(project._id);
  const {
    data: sprints,
    isError: isSprintError,
    error: sprintError,
  } = useGetAllProjectSprintsQuery(project._id);

  useEffect(() => {
    isTaskError && setError({
      isError: isTaskError,
      message: taskError?.data?.msg || taskError?.error
    });
  }, [isTaskError]);
  
  useEffect(() => {
    isSprintError && setError({
      isError: isSprintError,
      message: sprintError?.data?.msg || sprintError?.error
    });
  }, [isSprintError]);

  return (
    <div
      className="row border-bottom p-3 mb-3 align-items-center"
      key={project._id}
    >
      <div className="col-3 project-title">
        <Link to={`${project._id}`}>
          <h1 className="display-6">{project.name}</h1>
        </Link>
      </div>

      <div className="col-auto">
        <div className="p-1 rounded bg-primary text-white">
          Бэклог{" "}
          {tasks && (
            <span className="badge bg-secondary">{tasks.length || 0}</span>
          )}
        </div>
      </div>
      <div className="col-auto">
        <div className="p-1 rounded bg-info text-white">
          Спринты{" "}
          {sprints && (
            <span className="badge bg-secondary">{sprints.length || 0}</span>
          )}
        </div>
      </div>
      <div className="col-auto ms-auto">
        <button
          onClick={() => onEdit(project)}
          type="button"
          className="btn btn-outline-dark p-1"
        >
          <PencilFill size={20} />
        </button>
      </div>
      <div className="col-auto">
        <button
          onClick={() => onDelete(project._id)}
          type="button"
          className="btn btn-outline-danger p-1"
        >
          <Trash size={20} />
        </button>
      </div>
    </div>
  );
}

export default ProjectsList;
