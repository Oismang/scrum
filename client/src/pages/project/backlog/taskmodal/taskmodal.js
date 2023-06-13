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
        <Modal.Title>Создание таска</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Название таска
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
              max={20}
              min={1}
              required
            />
            <div id="storypointsHelp" className="form-text">
              Минимальное значение 1, максимальное 20.
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="storypoints" className="form-label">
              Выполняющий задачу
            </label>
            <select
              className="form-select"
              aria-label="Default select example"
              defaultValue={""}
              onChange={handleInputChange}
              name="assigne"
              id="assigne"
            >
              <option value="1">Жанна Дарк</option>
              <option value="2">Ваня Лодырин</option>
              <option value="3">Иван Второй</option>
              <option value="4">Илья Первый</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="duedate" className="form-label">
              Дата дедлайна
            </label>
            <input
              value={values.duedate}
              onChange={handleInputChange}
              type="date"
              className="form-control"
              id="duedate"
              name="duedate"
              min={new Date().toISOString().split("T")[0]}
              required
            />
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
