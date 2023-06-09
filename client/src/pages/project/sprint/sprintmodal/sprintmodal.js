import Modal from "react-bootstrap/Modal";

function SprintModal({ showModal, setShowModal, onSubmit, values, handleInputChange, isSprintError }) {

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Создание спринта</Modal.Title>
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
              <label htmlFor="startdate" className="form-label">
                Дата начала
              </label>
              <input
                value={values.startdate}
                onChange={handleInputChange}
                type="date"
                className="form-control"
                id="startdate"
                name="startdate"
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </div>

            <div className="mb-3 col-6">
              <label htmlFor="enddate" className="form-label">
                Дата окончания
              </label>
              <input
                value={values.enddate}
                onChange={handleInputChange}
                type="date"
                className="form-control"
                id="enddate"
                name="enddate"
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
            Создать
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default SprintModal;
