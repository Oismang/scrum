import Modal from "react-bootstrap/Modal";

function ProjectModal({
  isAdd,
  showModal,
  setShowModal,
  values,
  handleInputChange,
  onSubmit,
}) {
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{isAdd ? "Создание проекта" : "Изменение проекта"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Название проекта
            </label>
            <input
              value={values.name}
              onChange={handleInputChange}
              type="text"
              className="form-control"
              id="name"
              name="name"
              required
              minLength={4}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary d-block ms-auto"
            data-bs-dismiss="toast"
          >
            {isAdd ? "Создать" : "Изменить"}
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default ProjectModal;
