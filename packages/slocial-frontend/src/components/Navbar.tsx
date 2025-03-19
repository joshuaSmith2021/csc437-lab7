import { Link } from "react-router-dom";
import { BaseComponentProps } from "../routes";

export default function Navbar({
  authToken,
  isDarkMode,
  setIsDarkMode,
}: BaseComponentProps & {
  isDarkMode: boolean;
  setIsDarkMode: (mode: boolean) => void;
}) {
  return (
    <div className="p-4 sticky top-0 flex items-baseline gap-4 justify-between bg-slate-600 dark:bg-slate-900 text-white">
      <Link to="/">
        <h1 className="text-2xl cursor-pointer">SLOCIAL</h1>
      </Link>
      <nav className="flex gap-4 items-baseline">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        {!authToken && <Link to="/login">Log in</Link>}
        {!authToken && <Link to="/register">Sign up</Link>}
        {authToken && <Link to="/logout">Log out</Link>}
        <div className="flex gap-2">
          <label htmlFor="darkmode">Dark Mode:</label>
          <input
            id="darkmode"
            name="darkmode"
            type="checkbox"
            checked={isDarkMode}
            onChange={(e) => setIsDarkMode(e.target.checked)}
          />
        </div>
      </nav>
    </div>
  );
}
