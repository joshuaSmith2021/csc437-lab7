import { useState } from "react";
import Navbar from "./Navbar";
import { sendLoginRequest } from "../fetch/auth";

export function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmissionDisabled, setIsSubmissionDisabled] = useState(false);

  const handleLogin = () => {
    setIsSubmissionDisabled(true);
    setError("");
    sendLoginRequest(username, password)
      .then(({ username, token, expiresOn }) => {
        localStorage.setItem("username", username);
        localStorage.setItem("token", token);
        localStorage.setItem("expiresOn", expiresOn.toString(10));
      })
      .catch((e) => setError(String(e)))
      .finally(() => setIsSubmissionDisabled(false));
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
            className={[
              "bg-slate-700",
              "hover:bg-slate-800",
              "active:bg-slate-900",
              "disabled:bg-slate-400",
              "disabled:cursor-not-allowed",
              "text-white",
              "rounded-md",
              "p-1",
            ].join(" ")}
            disabled={isSubmissionDisabled}
            onClick={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            Log in
          </button>
        </form>
        <p className="text-red-700">{error}</p>
      </div>
      <div>{/* Spacer */}</div>
    </div>
  );
}
