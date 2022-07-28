import Cookies from "js-cookie";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/logo/logo";
import { USER_COOKIE } from "../../idb/user";

function Header({ user }) {
  const navigate = useNavigate();

  const onLogout = () => {
    Cookies.remove(USER_COOKIE);
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
