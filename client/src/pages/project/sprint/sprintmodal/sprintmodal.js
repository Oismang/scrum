import Modal from "react-bootstrap/Modal";

function SprintModal({ isAddSprint, showModal, setShowModal, onSubmit, values, handleInputChange, isSprintError }) {

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{isAddSprint ? "Создание" : "Изменение"} спринта</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={onSubmit}>
          <div className={isSprintError ? "alert alert-danger" : "alert alert-danger visually-hidden"} role="alert">
            Дата начала спринта не может быть позднее даты окончания!
          </div>

          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Название спринта
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

          <div className="row">
            <div className="mb-3 col-6">
              <label htmlFor="startDate" className="form-label">
                Дата начала
              </label>
              <input
                value={values.startDate}
                onChange={handleInputChange}
                type="date"
                className="form-control"
                id="startDate"
                name="startDate"
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </div>

            <div className="mb-3 col-6">
              <label htmlFor="endDate" className="form-label">
                Дата окончания
              </label>
              <input
                value={values.endDate}
                onChange={handleInputChange}
                type="date"
                className="form-control"
                id="endDate"
                name="endDate"
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary d-block ms-auto"
            data-bs-dismiss="toast"
          >
            {isAddSprint ? "Создать" : "Изменить"}
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default SprintModal;
