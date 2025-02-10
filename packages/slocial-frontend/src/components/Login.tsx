import { useState } from "react";
import Navbar from "./Navbar";

export function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log(username, password);
  };

  return (
    <div className="bg-slate-100 h-screen flex flex-col justify-between items-stretch">
      <Navbar />
      <div className="flex flex-col gap-3 items-center">
        <h1 className="text-2xl">Log in to your account</h1>
        <form className="flex flex-col gap-3">
          <label className="block">
            <p>Username</p>
            <input
              type="text"
              className="border rounded-md p-1"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>

          <label className="block">
            <p>Password</p>
            <input
              type="password"
              className="border rounded-md p-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button
            className="bg-slate-700 hover:bg-slate-800 active:bg-slate-900 text-white rounded-md p-1"
            onClick={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            Log in
          </button>
        </form>
      </div>
      <div>{/* Spacer */}</div>
    </div>
  );
}
