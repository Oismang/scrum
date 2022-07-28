import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { PlusLg } from 'react-bootstrap-icons';
import { Navigate, Outlet, useParams } from "react-router-dom";
import Error from "../../components/error/error";
import Header from "../../components/header/header";
import { addProject, editProjectById, getAllUserProjects } from "../../idb/project";
import { findUserById, USER_COOKIE } from "../../idb/user";
import "./main.css";
import ProjectModal from "./projectmodal/projectmodal";
import ProjectsList from "./projectslist/projectslist";

const initialValues = {
  name: ""
}

function Main() {
  const userID = Cookies.get(USER_COOKIE);
  const [error, setError] = useState({
    isError: false,
    message: ""
  });
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState(null);

  const [values, setValues] = useState(initialValues);
  const [showModal, setShowModal] = useState(false);
  const [isAdd, setIsAdd] = useState(false);

  const { projectID } = useParams();

  const updateData = async () => {
    try {
      const userObj = await findUserById(+userID);
      const projectObj = await getAllUserProjects(userObj);
      setUser(userObj);
      setProjects(projectObj);
    } catch (error) {
      setError({ isError: true, message: error.message });
    }
  }

  useEffect(() => {
    updateData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onAddNewProject = () => {
    setValues(initialValues);
    setIsAdd(true);
    setShowModal(true);
  }

  const handleInputChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  }

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      if (isAdd) {
        const project = {
          name: values.name,
          backlog: [],
          sprints: []
        }
        await addProject(user, project);
        setIsAdd(false);
      } else {
        await editProjectById(values.project, values.name);
      }

      setValues(initialValues);
      updateData();
    } catch (error) {
      setError({ isError: true, message: error.message });
    } finally {
      setShowModal(false);
    }
  };

  const renderHeader = () => {
    return !projects 
      ? <p className="lead text-center">
        У вас ещё нет проектов. <a href="#" onClick={onAddNewProject} className="text-decoration-none">Создать</a> новый.
      </p>
      : <button onClick={onAddNewProject} type="button" className="ms-auto d-block btn btn-primary p-2">
        <PlusLg size={25} /> Добавить
      </button>
  }

  const renderContet = () => {
    return <div className="app-container">
      <h1 className="display-3 text-center">Мои проекты</h1>
      {renderHeader()}
      <ProjectModal
        isAdd={isAdd}
        showModal={showModal}
        setShowModal={setShowModal}
        values={values}
        handleInputChange={handleInputChange}
        onSubmit={onSubmit}
      />
      <ProjectsList
        updateData={updateData}
        user={user}
        projects={projects}
        setError={setError}
        setShowModal={setShowModal}
        setValues={setValues}
      />
    </div>
  }

  if (!userID) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className="main-container container">
      {error.isError && <Error message={error.message} />}
      {!error.isError && user && <Header user={user} />}
      {projectID ? !error.isError && <Outlet /> : !error.isError && user && renderContet()}
    </div>
  );
}

export default Main;
