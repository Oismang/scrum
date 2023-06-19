import Cookies from "js-cookie";
import { useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import Error from "../../components/error/error";
import Header from "../../components/header/header";
import NoDataText from "../../components/nodatatext/nodatatext";
import {
  useCreteProjectMutation,
  useGetAllProjectsQuery,
  useUpdateProjectMutation,
} from "../../services/project";
import { USER_TOKEN_COOKIE } from "../../services/auth";
import { parseJwtToken } from "../../utils/functions";
import "./main.css";
import ProjectModal from "./projectmodal/projectmodal";
import ProjectsList from "./projectslist/projectslist";

const initialValues = {
  name: "",
};

function Main() {
  const {
    data: projects,
    isError: isProjectError,
    error: projectError,
  } = useGetAllProjectsQuery();
  const [createProject] = useCreteProjectMutation();
  const [updateProject] = useUpdateProjectMutation();
  const user = parseJwtToken(Cookies.get(USER_TOKEN_COOKIE));
  const { projectId } = useParams();
  const [error, setError] = useState({
    isError: false,
    message: "",
  });

  const [values, setValues] = useState(initialValues);
  const [showModal, setShowModal] = useState(false);
  const [isAdd, setIsAdd] = useState(false);

  const onAddNewProject = () => {
    setIsAdd(true);
    setShowModal(true);
  };

  const handleInputChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const project = {
      name: values.name,
    };

    try {
      if (isAdd) {
        await createProject(project).unwrap();
      } else {
        await updateProject({ projectId: values.projectId, project }).unwrap();
      }

      setValues(initialValues);
    } catch (error) {
      setError({ isError: true, message: error?.data?.msg || error?.error });
    } finally {
      setShowModal(false);
    }
  };

  const renderContet = () => {
    return (
      <div className="app-container">
        <h1 className="display-3 text-center">Проекты</h1>
        <NoDataText
          dataToCheck={projects}
          onAddFuction={onAddNewProject}
          text={"проектов"}
          user={user}
        />
        <ProjectModal
          isAdd={isAdd}
          showModal={showModal}
          setShowModal={setShowModal}
          values={values}
          handleInputChange={handleInputChange}
          onSubmit={onSubmit}
        />
        <ProjectsList
          projects={projects}
          setError={setError}
          setShowModal={setShowModal}
          setValues={setValues}
          setIsAdd={setIsAdd}
          user={user}
        />
      </div>
    );
  };

  if (isProjectError) {
    return <Error message={projectError?.data?.msg || projectError?.error} />;
  }

  if (error.isError) {
    return <Error message={error?.message} />;
  }

  return (
    <div className="main-container container">
      {user && <Header user={user} />}
      {projectId ? <Outlet /> : user && renderContet()}
    </div>
  );
}

export default Main;
