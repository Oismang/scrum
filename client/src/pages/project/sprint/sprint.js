import { useState } from "react";
import { useParams } from "react-router-dom";
import NoDataText from "../../../components/nodatatext/nodatatext";
import {
  useCreateProjectSprintMutation,
  useDeleteSprintMutation,
  useUpdateSprintMutation
} from "../../../services/sprint";
import BacklogContainer from "./backlogcontainer/backlogcontainer";
import "./sprint.css";
import SprintContainer from "./sprintcontainer/sprintcontainer";
import SprintModal from "./sprintmodal/sprintmodal";

const initialSprintValues = {
  name: "",
  startDate: "",
  endDate: "",
};

function Sprint({ setError, sprints, tasks, isTasksLoading }) {
  const { projectId } = useParams();
  const [createProjectSprint] = useCreateProjectSprintMutation();
  const [updateSprint] = useUpdateSprintMutation();
  const [deleteSprint] = useDeleteSprintMutation();

  const [showSprintModal, setShowSprintModal] = useState(false);
  const [isAddSprint, setIsAddSprint] = useState(false);
  const [sprintValues, setSprintValues] = useState(initialSprintValues);
  const [isSprintModalError, setIsSprintModalError] = useState(false);

  const handleSprintInputChange = (event) => {
    setSprintValues({
      ...sprintValues,
      [event.target.name]: event.target.value,
    });
  };

  const addNewSprint = () => {
    setIsAddSprint(true);
    setSprintValues(initialSprintValues);
    setShowSprintModal(true);
  };

  const onSprintEdit = (sprint) => {
    setIsAddSprint(false);
    setSprintValues({ ...sprint });
    setShowSprintModal(true);
  };

  const onSprintDelete = async (sprint) => {
    try {
      await deleteSprint(sprint._id).unwrap();
    } catch (error) {
      setError({ isError: true, message: error?.data?.msg || error?.error });
    }
  };

  const onSprintSubmit = async (event) => {
    event.preventDefault();
    if (
      new Date(sprintValues.startdate).getTime() >=
      new Date(sprintValues.enddate).getTime()
    ) {
      return setIsSprintModalError(true);
    }

    try {
      if (isAddSprint) {
        await createProjectSprint({ projectId, sprint: sprintValues }).unwrap();
      } else {
        await updateSprint({
          sprintId: sprintValues._id,
          sprint: sprintValues,
        }).unwrap();
      }
    } catch (error) {
      setError({ isError: true, message: error?.data?.msg || error?.error });
    } finally {
      setShowSprintModal(false);
      setIsSprintModalError(false);
    }
  };

  return (
    <div className="sprint-container p-3">
      <NoDataText
        dataToCheck={sprints}
        onAddFuction={addNewSprint}
        text={"спринтов"}
      />

      <SprintModal
        isAddSprint={isAddSprint}
        isSprintError={isSprintModalError}
        handleInputChange={handleSprintInputChange}
        onSubmit={onSprintSubmit}
        showModal={showSprintModal}
        setShowModal={setShowSprintModal}
        values={sprintValues}
      />

      {tasks && (
        <BacklogContainer
          tasks={tasks.filter((task) => !task.sprint)}
          setError={setError}
        />
      )}

      {sprints &&
        !isTasksLoading &&
        sprints.map((sprint) => {
          return (
            <SprintContainer
              key={sprint._id}
              sprint={sprint}
              tasks={tasks.filter((task) => task?.sprint?._id === sprint._id)}
              onSprintEdit={onSprintEdit}
              onSprintDelete={onSprintDelete}
              setError={setError}
            />
          );
        })}
    </div>
  );
}

export default Sprint;
