import Modal from "react-bootstrap/Modal";

function TaskModal({
  isAdd,
  showModal,
  setShowModal,
  onSubmit,
  values,
  handleInputChange,
  users,
}) {
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{isAdd ? "Создание задачи" : "Изменение задачи"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Название задачи
            </label>
            <input
              value={values.name}
              onChange={handleInputChange}
              type="text"
              className="form-control"
              id="name"
              name="name"
              minLength={3}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Описание
            </label>
            <textarea
              value={values.description}
              onChange={handleInputChange}
              type="text"
              className="form-control"
              id="description"
              name="description"
              rows="3"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="storypoints" className="form-label">
              Оценка сложности
            </label>
            <input
              value={values.storypoints}
              onChange={handleInputChange}
              type="number"
              className="form-control"
              id="storypoints"
              name="storypoints"
              aria-describedby="storypointsHelp"
              max={10}
              min={1}
              required
            />
            <div id="storypointsHelp" className="form-text">
              Минимальное значение 1, максимальное 10.
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="storypoints" className="form-label">
              Выполняющий задачу
            </label>
            <select
              defaultValue={"default"}
              className="form-select"
              onChange={handleInputChange}
              name="assigne"
              id="assigne"
            >
              <option disabled value={"default"}>
                -- Выберите пользователя --
              </option>
              {users &&
                users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
                ))}
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary d-block ms-auto"
            data-bs-dismiss="toast"
          >
            Создать
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default TaskModal;
