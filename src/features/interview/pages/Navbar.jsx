import { Link, useNavigate } from "react-router";
import { useAuth } from "../../auth/hooks/useAuth";
import "../styles/nav.scss";

const Navbar = () => {
  const navigate = useNavigate();
  const { handleLogout, loading } = useAuth();

  const onLogout = async () => {
    await handleLogout();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar">
      <div className="brand">
        <img
          src="/logo.png"
          alt="logo"
          className="navimage"
        />
        <h1>AI Resume Analyzer</h1>
      </div>
      <div className="nav-actions">
        <Link to="/history" className="nav-btn">
          History
        </Link>
        <button
          type="button"
          className="nav-btn"
          onClick={onLogout}
          disabled={loading}
        >
          {loading ? "Logging out..." : "Logout"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
