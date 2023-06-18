import Cookies from "js-cookie";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Logo from "../../components/logo/logo";
import "./login.css";
import { USER_TOKEN_COOKIE, useLoginMutation } from "../../services/auth";

function Login() {
  const navigate = useNavigate();
  const [loginUser, { error, isError, reset }] = useLoginMutation();
  const userToken = Cookies.get(USER_TOKEN_COOKIE);
  const [values, setValues] = useState({
    login: "",
    password: "",
  });

  const onSubmit = (event) => {
    event.preventDefault();

    const user = {
      email: values.email,
      password: values.password,
    };

    loginUser(user)
      .unwrap()
      .then(() => {
        navigate("/app");
      })
      .catch(() => {});
  };

  const handleInputChange = (event) => {
    reset();
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  if (userToken) {
    return <Navigate to="/app" replace={true} />;
  }

  return (
    <div className="login-container d-flex justify-content-center">
      <form
        className="login-form border border-3 rounded-3 p-4 bg-light"
        onSubmit={onSubmit}
      >
        <div className="mb-3 text-center">
          <Logo width={267} height={60} />
        </div>

        <div
          className={
            isError
              ? "alert alert-danger"
              : "alert alert-danger visually-hidden"
          }
          role="alert"
        >
          {error?.data?.msg}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            onChange={handleInputChange}
            className="form-control"
            type="email"
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
            onChange={handleInputChange}
            type="password"
            className="form-control"
            id="password"
            name="password"
            aria-describedby="passwordHelp"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary d-block ms-auto">
          Вход
        </button>
      </form>
    </div>
  );
}

export default Login;
