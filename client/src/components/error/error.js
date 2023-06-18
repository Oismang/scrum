import { Link } from "react-router-dom";

function Error({ message }) {
  return (
    <div className="container mt-5">
      <div className="alert alert-danger text-center" role="alert">
        Произошла ошибка! <Link to={"/"}>Вернуться</Link> на главную страницу.
        <p className="m-0">{message}</p>
      </div>
    </div>
  );
}

export default Error;
