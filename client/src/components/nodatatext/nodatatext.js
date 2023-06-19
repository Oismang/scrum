import { PlusLg } from "react-bootstrap-icons";
import "./nodatatext.css";
import { USER_ROLES } from "../../services/auth";

function NoDataText({ dataToCheck, onAddFuction, text, user }) {
  if (dataToCheck && dataToCheck.length > 0) {
    return (
      user?.role === USER_ROLES.ADMIN && (
        <div className="nodatatext-container">
          <button
            onClick={onAddFuction}
            type="button"
            className="ms-auto d-block btn p-2 mb-3"
          >
            <PlusLg size={25} /> Добавить
          </button>
        </div>
      )
    );
  }

  if (user?.role === USER_ROLES.USER) {
    return (
      <div className="nodatatext-container">
        <p className="lead text-center text-dark">
          <b>Пока ещё нет {text}.</b> <br /> У вас недостаточно прав для создания.
          <br /> Обратитесь к администратору.
        </p>
      </div>
    );
  }

  return (
    <p className="lead text-center text-dark">
      У вас ещё нет {text}.{" "}
      <a href="#" onClick={onAddFuction} className="text-decoration-none">
        Создать
      </a>{" "}
      новый.
    </p>
  );
}

export default NoDataText;
