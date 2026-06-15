import { useNavigate, Link } from "react-router-dom";

function Navbar({ darkMode, toggleDarkMode }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h2 className="logo">Job Tracker</h2>

      <div className="navLinks">
        <Link to="/dashboard">Dashboard</Link>

        {/* DARK MODE BUTTON */}
        <button onClick={toggleDarkMode}>
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;