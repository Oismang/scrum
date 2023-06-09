import { PlusLg } from "react-bootstrap-icons";
import "./nodatatext.css";

function NoDataText({ dataToCheck, onAddFuction, text }) {
  return (
    <div className="nodatatext-container">
      {!dataToCheck 
      ? <p className="lead text-center">
        У вас ещё нет {text}. <a href="#" onClick={onAddFuction} className="text-decoration-none">Создать</a> новый.
      </p>
      : <button onClick={onAddFuction} type="button" className="ms-auto d-block btn p-2 mb-3">
        <PlusLg size={25} /> Добавить
      </button>}
    </div>
  );
}

export default NoDataText;
