import { useState } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Error from "../../components/error/error";
import Backlog from "./backlog/backlog";
import "./project.css";

function Project() {
  const [error, setError] = useState({
    isError: false,
    message: "",
  });

  return (
    <div className="project-container">
      {error.isError && <Error message={error.message} />}
      {!error.isError &&
        <Tabs
          defaultActiveKey="backlog"
          className="mb-3"
          justify
        >
          <Tab eventKey="backlog" title="Бэклог">
            <Backlog setError={setError} />
          </Tab>
          <Tab eventKey="sprints" title="Спринты">
            вапывапывап
          </Tab>
          <Tab eventKey="scrum-desk" title="Скрам доска">
            ывапыавпывап
          </Tab>
        </Tabs>
      }
    </div>
  );
}

export default Project;
