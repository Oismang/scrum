import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/logo/logo";
import { addUser, USER_COOKIE, USER_EXISTS_ERROR } from "../../idb/user";
import "./auth.css";

function Auth() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isNameError, setIsNameError] = useState(false);
  const [isError, setIsError] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const user = {
        name: values.name,
        email: values.email,
        password: values.password,
        projects: []
      };
      const userID = await addUser(user);
      Cookies.set(USER_COOKIE, userID, {
        expires: 1 / 12,
      });
      navigate("/app");
    } catch (error) {
      if (error.message === USER_EXISTS_ERROR) {
        setIsNameError(true);
      } else {
        setIsError(true);
      }
    }
  };

  const handleInputChange = (event) => {
    setIsNameError(false);
    setIsError(false);
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="auth-container d-flex justify-content-center">
      <form
        className="auth-form border border-3 rounded-3 p-4 bg-light"
        onSubmit={onSubmit}
      >
        <div className="mb-3 text-center">
          <Logo width={267} height={60} />
        </div>

        <div className={isError ? "alert alert-danger" : "alert alert-danger visually-hidden"} role="alert">
          Произошла ошибка! Попробуйте ввести другие данные.
        </div>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Имя пользователя
          </label>
          <input
            value={values.name}
            onChange={handleInputChange}
            type="text"
            className={isNameError ? "form-control is-invalid" : "form-control"}
            id="name"
            name="name"
            aria-describedby="nameHelp"
            required
            minLength={4}
          />
          <div className="invalid-feedback">
            Данное имя пользователя уже занято! Введите другое.
          </div>
          <div id="nameHelp" className="form-text">
            Будет использоватся для входа в аккаунт
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            value={values.email}
            onChange={handleInputChange}
            type="email"
            className="form-control"
            id="email"
            name="email"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Пароль
          </label>
          <input
            value={values.password}
            onChange={handleInputChange}
            type="password"
            className="form-control"
            id="password"
            name="password"
            aria-describedby="passwordHelp"
            required
            minLength={6}
          />
          <div id="passwordHelp" className="form-text">
            Не менее 6 символов
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary d-block ms-auto"
          data-bs-dismiss="toast"
        >
          Далее
        </button>
      </form>
    </div>
  );
}

export default Auth;
