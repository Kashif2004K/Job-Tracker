import { useNavigate, Link } from "react-router-dom";

function Navbar({ darkMode, toggleDarkMode }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h2 className="logo">TrackJob</h2>

      <div className="navLinks">
        <Link to="/dashboard">Dashboard</Link>

        {/* DARK MODE BUTTON */}
        <button onClick={toggleDarkMode}>
          {darkMode ? "Light" : "Dark"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;