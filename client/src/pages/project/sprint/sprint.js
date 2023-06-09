import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NoDataText from "../../../components/nodatatext/nodatatext";
import { findProjectById } from "../../../idb/project";
import { addSprint, deleteSprint, editSprint, getAllProjectsSprints } from "../../../idb/sprint";
import "./sprint.css";
import SprintModal from "./sprintmodal/sprintmodal";
import BacklogContainer from "./backlogcontainer/backlogcontainer";
import SprintContainer from "./sprintcontainer/sprintcontainer";

const initialSprintValues = {
  name: "",
  startdate: "",
  enddate: "",
  tasks: []
}

function Sprint({ setError }) {
  const { projectID } = useParams();
  const [sprints, setSprints] = useState(null);
  const [project, setProject] = useState(null);

  const [showSprintModal, setShowSprintModal] = useState(false);
  const [isAddSprint, setIsAddSprint] = useState(false);
  const [sprintValues, setSprintValues] = useState(initialSprintValues);
  const [isSprintError, setIsSprintError] = useState(false);

  const updateData = async () => {
    try {
      const projectObj = await findProjectById(+projectID);
      const sprintsObj = await getAllProjectsSprints(projectObj);
      setProject(projectObj);
      setSprints(sprintsObj);
    } catch (error) {
      console.log("updateData ERROR SPRINT", error);
      setError({ isError: true, message: error.message });
    }
  };

  useEffect(() => {
    updateData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSprintInputChange = (event) => {
    setSprintValues({
      ...sprintValues,
      [event.target.name]: event.target.value,
    });
  }

  const addNewSprint = () => {
    setIsAddSprint(true);
    setSprintValues(initialSprintValues);
    setShowSprintModal(true);
  }

  const onSprintEdit = (sprint) => {
    setIsAddSprint(false);
    setSprintValues({ ...sprint })
    setShowSprintModal(true);
  }

  const onSprintDelete = async (id) => {
    try {
      await deleteSprint(id, project);
      updateData();
    } catch (error) {
      setError({ isError: true, message: error.message });
    }
  }

  const onSprintSubmit = async (event) => {
    event.preventDefault();
    if (new Date(sprintValues.startdate).getTime() >= new Date(sprintValues.enddate).getTime()) {
      return setIsSprintError(true);
    }

    try {
      if (isAddSprint) {
        await addSprint({ ...sprintValues }, project);
      } else {
        await editSprint(sprintValues);
      }

      updateData();
    } catch (error) {
      setError({ isError: true, message: error.message });
    } finally {
      setShowSprintModal(false);
      setIsSprintError(false);
    }
  }

  return (
    <div className="sprint-container p-3">
      <NoDataText 
        dataToCheck={sprints}
        onAddFuction={addNewSprint}
        text={"спринтов"} 
      />
      <SprintModal
        isSprintError={isSprintError}
        handleInputChange={handleSprintInputChange}
        onSubmit={onSprintSubmit}
        showModal={showSprintModal}
        setShowModal={setShowSprintModal}
        values={sprintValues}
      />

      {project && <BacklogContainer
        project={project}
      />} 

      {sprints && sprints.map((sprint, i) => {
        return <SprintContainer
          key={i}
          sprint={sprint}
          onSprintEdit={onSprintEdit}
          onSprintDelete={onSprintDelete}
        />;
      })}
    </div>
  );
}

export default Sprint;