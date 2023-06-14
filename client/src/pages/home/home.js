import { Link } from "react-router-dom";
import Logo from "../../components/logo/logo";
import "./home.css";

function Home() {
  return (
    <div className="home-container text-center">
      <div className="row">
        <div className="col">
          <Logo />
        </div>
      </div>

      <div className="row">
        <div className="col p-2">
          <h1 className="display-1">Scrum Helper</h1>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-8 col-sm-10 p-2">
          <p className="lead bg-light rounded-3 text-wrap fs-3 p-2">
            Scrum — это методика гибкого управления проектами, помогающая
            командам структурировать работу и управлять ею на основе набора
            ценностей, принципов и практик.
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col p-2">
          <Link to="/login" className="btn btn-outline-primary btn-lg m-2">
            Вход
          </Link>
          <Link to="/auth" className="btn btn-outline-primary btn-lg m-2">
            Регистрация
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
