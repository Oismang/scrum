import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Error from "../../components/error/error";
import Backlog from "./backlog/backlog";
import "./project.css";
import Sprint from "./sprint/sprint";
import Desk from "./desk/desk";
import { useGetAllProjectSprintsQuery } from "../../services/sprint";
import { useGetAllProjectTasksQuery } from "../../services/task";
import { useParams } from "react-router-dom";
import { useGetAllUsersQuery } from "../../services/user";

function Project() {
  const { projectId } = useParams();
  const {
    data: sprints,
    isError: isSprintError,
    error: sprintError,
  } = useGetAllProjectSprintsQuery(projectId);
  const {
    data: tasks,
    isLoading: isTasksLoading,
    isError: isTaskError,
    error: taskError,
  } = useGetAllProjectTasksQuery(projectId);
  const {
    data: users,
    isError: isUserError,
    error: userError,
  } = useGetAllUsersQuery();

  const [error, setError] = useState({
    isError: false,
    message: "",
  });

  if (isSprintError || isTaskError || isUserError) {
    const errorMessage =
      sprintError?.data?.msg ||
      taskError?.data?.msg ||
      userError?.data?.msg ||
      sprintError?.error ||
      taskError?.error ||
      userError?.error;
    return <Error message={errorMessage} />;
  }

  if (error.isError) {
    return <Error message={error?.message} />;
  }

  return (
    <div className="project-container">
      <Tabs defaultActiveKey="backlog" className="mb-3" justify>
        <Tab eventKey="backlog" title="Бэклог">
          <Backlog setError={setError} users={users} tasks={tasks} />
        </Tab>
        <Tab eventKey="sprints" title="Спринты">
          <Sprint
            setError={setError}
            sprints={sprints}
            tasks={tasks}
            isTasksLoading={isTasksLoading}
          />
        </Tab>
        <Tab eventKey="scrum-desk" title="Скрам доска">
          <Desk setError={setError} sprints={sprints} tasks={tasks} />
        </Tab>
      </Tabs>
    </div>
  );
}

export default Project;
