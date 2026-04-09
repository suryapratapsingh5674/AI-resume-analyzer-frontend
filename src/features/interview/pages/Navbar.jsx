import { Link } from "react-router";
import "../styles/nav.scss";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="brand">
        <img
          src="../../../../public/logo.png"
          alt="logo"
          className="navimage"
        />
        <h1>AI Resume Analyzer</h1>
      </div>
      <Link to={'/history'} className="link">History</Link>
    </nav>
  );
};

export default Navbar;
