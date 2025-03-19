import { Link } from "react-router-dom";
import { AuthTokenComponentProps } from "../routes";

export default function Navbar({ authToken }: AuthTokenComponentProps) {
  return (
    <div className="p-4 sticky top-0 flex items-baseline gap-4 justify-between bg-slate-600 text-white">
      <Link to="/">
        <h1 className="text-2xl cursor-pointer">SLOCIAL</h1>
      </Link>
      <nav className="flex gap-4 items-baseline">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        {!authToken && <Link to="/login">Log in</Link>}
        {!authToken && <Link to="/register">Sign up</Link>}
        {authToken && <Link to="/logout">Log out</Link>}
      </nav>
    </div>
  );
}
