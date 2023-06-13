import Cookies from "js-cookie";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/logo/logo";
import { USER_TOKEN_COOKIE } from "../../services/user";

function Header({ user }) {
  const navigate = useNavigate();

  const onLogout = () => {
    Cookies.remove(USER_TOKEN_COOKIE);
    navigate("/");
  };

  return (
    <Navbar expand="lg">
      <Container>
        <Nav.Item>
          <Logo width={267} height={60} />
        </Nav.Item>
        <NavDropdown title={user.name} id="basic-nav-dropdown">
          <NavDropdown.Item onClick={onLogout}>Выход</NavDropdown.Item>
        </NavDropdown>
      </Container>
    </Navbar>
  );
}

export default Header;
