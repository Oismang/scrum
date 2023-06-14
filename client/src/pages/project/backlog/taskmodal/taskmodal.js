import Modal from "react-bootstrap/Modal";

function TaskModal({
  showModal,
  setShowModal,
  onSubmit,
  values,
  handleInputChange,
}) {
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Создание задачи</Modal.Title>
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
              className="form-select"
              aria-label="Default select example"
              onChange={handleInputChange}
              name="assigne"
              id="assigne"
            >
              <option disabled selected value> -- Выберите пользователя -- </option>
              <option value="Жанна Дарк">Жанна Дарк</option>
              <option value="Ваня Лодырин">Ваня Лодырин</option>
              <option value="Иван Второй">Иван Второй</option>
              <option value="Илья Первый">Илья Первый</option>
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
