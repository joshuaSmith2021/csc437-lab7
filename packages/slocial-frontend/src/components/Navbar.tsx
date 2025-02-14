import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="p-4 flex items-baseline gap-4 justify-between bg-slate-600 text-white">
      <Link to="/">
        <h1 className="text-2xl cursor-pointer">SLOCIAL</h1>
      </Link>
      <nav className="flex gap-4 items-baseline">
        <Link to="/">Home</Link>
        <Link to="/login">Account</Link>
        <Link to="/about">About</Link>
      </nav>
    </div>
  );
}
