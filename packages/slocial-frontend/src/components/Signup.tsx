import { useEffect, useState } from "react";
import { ERROR_TEXT_CLASSNAME, TEXT_INPUT_CLASSNAME } from "../util/classnames";
import { isValidCalpolyEmail } from "../util/input-validation";

export default function SignupScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmissionDisabled, _setIsSubmissionDisabled] = useState(false);

  useEffect(() => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      setError("");
    }
  }, [password, confirmPassword]);

  const handleRegistration = () => {
    alert("Not yet implemented!");
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
              if (
                !target.validity.valid ||
                !isValidCalpolyEmail(e.target.value)
              ) {
                setError("Invalid email");
                return;
              }

              setError("");
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
