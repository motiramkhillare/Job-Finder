import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useSavedJobs } from "../context/SavedJobsContext";
import { useTheme } from "../context/ThemeContext";

const linkClass = ({ isActive }) =>
  `transition hover:text-indigo-600 ${
    isActive ? "text-indigo-600" : "text-gray-600 dark:text-gray-300"
  }`;

function Navbar() {
  const { user, logout } = useAuth();
  const { saved } = useSavedJobs();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/90 backdrop-blur dark:border-gray-700 dark:bg-gray-900/90">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
        <Link to="/" className="text-xl font-bold text-indigo-600">
          Job<span className="text-gray-900 dark:text-white">Finder</span>
        </Link>

        <ul className="flex flex-wrap items-center gap-5 text-sm font-medium">
          <li>
            <NavLink to="/" end className={linkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/saved" className={linkClass}>
              Saved ({saved.length})
            </NavLink>
          </li>
          {user?.role === "recruiter" && (
            <li>
              <NavLink to="/dashboard" className={linkClass}>
                Dashboard
              </NavLink>
            </li>
          )}
          {user ? (
            <>
              <li className="text-gray-500 dark:text-gray-400">
                Hi, {user.name}
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 transition hover:text-indigo-600 dark:text-gray-300"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login" className={linkClass}>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" className={linkClass}>
                  Register
                </NavLink>
              </li>
            </>
          )}
          <li>
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="rounded-lg border border-gray-300 px-2 py-1 dark:border-gray-600"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;