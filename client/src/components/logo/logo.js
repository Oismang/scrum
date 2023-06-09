import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

function Logo({ width = 312, height = 70 }) {
  return (
    <Link to="/">
      <img src={logo} width={width} height={height} alt="Logo" />
    </Link>
  );
}

export default Logo;
