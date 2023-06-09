import "./notfound.css";
import { Link } from "react-router-dom";

function Notfound() {
  return (
    <div className="not-found-container d-flex align-items-center justify-content-center">
      <div className="text-center">
        <h1 className="display-1 fw-bold">404</h1>
        <p className="fs-3">
          <span className="text-danger">Уупс!</span> Страница не найдена.
        </p>
        <p className="lead">Страница которую вы ищете не существует.</p>
        <Link to="/" className="btn btn-primary">
          Вернутся на главную
        </Link>
      </div>
    </div>
  );
}

export default Notfound;
