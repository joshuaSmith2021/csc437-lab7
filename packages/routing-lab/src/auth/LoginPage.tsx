import React from "react";
import UsernamePasswordForm, {
  onUsernamePasswordSubmit,
} from "./UsernamePasswordForm";
import { Link, useNavigate } from "react-router";
import { sendPostRequest } from "./sendPostRequest";

type LoginPageProps = {
  setAuthToken: (token: string) => void;
};

export default function LoginPage({ setAuthToken }: LoginPageProps) {
  const navigate = useNavigate();

  const onSubmit: onUsernamePasswordSubmit = async (username, password) =>
    await sendPostRequest("/auth/login", { username, password }).then(
      async (res) => {
        if (res.status === 200) {
          setAuthToken(await res.text());
          return { success: true, message: "" };
        } else {
          const { message, error } = await res.json();
          return { success: false, message: `${error}: ${message}` };
        }
      },
    );

  return (
    <div>
      <h1>Login</h1>
      <UsernamePasswordForm
        onSubmit={onSubmit}
        onSuccess={() => navigate("/")}
      />
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}
