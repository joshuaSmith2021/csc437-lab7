import { useState } from "react";
import { ERROR_TEXT_CLASSNAME } from "../util/classnames";
import { useNavigate } from "react-router-dom";
import { login } from "../fetch/auth";
import { BaseComponentProps } from "../routes";

export default function LoginScreen({ setAuthToken }: BaseComponentProps) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmissionDisabled, setIsSubmissionDisabled] = useState(false);

  const handleLogin = () => {
    setIsSubmissionDisabled(true);
    setError("");
    login(username, password, setAuthToken, setError)
      .then((token) => token && navigate("/"))
      .finally(() => setIsSubmissionDisabled(false));
  };

  return (
    <div className="flex flex-col gap-3 justify-center items-center dark:text-white">
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
            "disabled:cursor-progress",
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
      <p className={ERROR_TEXT_CLASSNAME}>{error}</p>
    </div>
  );
}
