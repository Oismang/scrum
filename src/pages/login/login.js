import Cookies from "js-cookie";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Logo from "../../components/logo/logo";
import { checkUser, PASSWORD_NOT_MATCH_ERROR, USER_COOKIE, USER_NOT_EXISTS_ERROR } from "../../idb/user";
import "./login.css";

function Login() {
  const navigate = useNavigate();
  const userID = Cookies.get(USER_COOKIE);
  const [values, setValues] = useState({
    name: "",
    password: "",
  });
  const [isNameError, setIsNameError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isError, setIsError] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const userObj = {
        name: values.name,
        password: values.password,
      };
      const user = await checkUser(userObj);
      Cookies.set(USER_COOKIE, user.id, { expires: 1 / 12 });
      navigate("/app");
    } catch (error) {
      if (error.message === USER_NOT_EXISTS_ERROR) {
        setIsNameError(true);
      } else if (error.message === PASSWORD_NOT_MATCH_ERROR) {
        setIsPasswordError(true);
      } else {
        setIsError(true);
      }
    }
  }

  const handleInputChange = (event) => {
    setIsNameError(false);
    setIsPasswordError(false);
    setIsError(false);
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  if (userID) {
    return <Navigate to="/app" replace={true} />;
  }

  return (
    <div className="login-container d-flex justify-content-center">
      <form className="login-form border border-3 rounded-3 p-4 bg-light"
         onSubmit={onSubmit}>
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
            onChange={handleInputChange}
            type="text"
            className={isNameError ? "form-control is-invalid" : "form-control"}
            id="name"
            name="name"
            required
          />
          <div className="invalid-feedback">
            Пользователя с таким именем не существует! 
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Пароль
          </label>
          <input
            onChange={handleInputChange}
            type="password"
            className={isPasswordError ? "form-control is-invalid" : "form-control"}
            id="password"
            name="password"
            aria-describedby="passwordHelp"
            required
          />
          <div className="invalid-feedback">
            Неверный пароль. Попробуйте другой.
          </div>
        </div>

        <button type="submit" className="btn btn-primary d-block ms-auto">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
