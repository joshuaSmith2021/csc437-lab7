import { useEffect, useState } from "react";
import { ERROR_TEXT_CLASSNAME, TEXT_INPUT_CLASSNAME } from "../util/classnames";
import { isValidCalpolyEmail } from "../util/input-validation";
import { register } from "../fetch/auth";
import { AuthTokenComponentProps } from "../routes";
import { useNavigate } from "react-router-dom";

export default function SignupScreen({
  setAuthToken,
}: AuthTokenComponentProps) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, _setError] = useState("");
  const [isSubmissionDisabled, _setIsSubmissionDisabled] = useState(true);

  const setError = (error: string) => {
    _setIsSubmissionDisabled(error !== "");
    _setError(error);
  };

  useEffect(() => {
    if (!isEmailValid || !isValidCalpolyEmail(email)) {
      setError("Invalid calpoly.edu email");
      return;
    }

    if (!username || !password) {
      setError("Please provide a username and password");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
  }, [email, username, password, confirmPassword]);

  const handleRegistration = () => {
    register(username, password, setAuthToken, setError).then(
      (token) => token && navigate("/"),
    );
  };

  return (
    <div className="flex flex-col gap-3 justify-center items-center">
      <h1 className="text-2xl">Create an account</h1>
      <form className="flex flex-col gap-3">
        <label className="block">
          <p>Email (@calpoly.edu)</p>
          <input
            type="email"
            className={`${TEXT_INPUT_CLASSNAME} invald:border-red-500`}
            onChange={(e) => {
              const target = e.target;
              setIsEmailValid(target.validity.valid);
              setEmail(e.target.value);
            }}
          />
        </label>
        <label className="block">
          <p>Username</p>
          <input
            type="text"
            className={TEXT_INPUT_CLASSNAME}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        <label className="block">
          <p>Password</p>
          <input
            type="password"
            className={TEXT_INPUT_CLASSNAME}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <label className="block">
          <p>Confirm Password</p>
          <input
            type="password"
            className={TEXT_INPUT_CLASSNAME}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            handleRegistration();
          }}
        >
          Log in
        </button>
      </form>
      <p className={ERROR_TEXT_CLASSNAME}>{error}</p>
    </div>
  );
}
