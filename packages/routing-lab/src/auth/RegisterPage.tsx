import React from "react";
import UsernamePasswordForm, {
  onUsernamePasswordSubmit,
} from "./UsernamePasswordForm";
import { sendPostRequest } from "./sendPostRequest";
import { useNavigate } from "react-router";

type RegisterPageProps = {
  setAuthToken: (token: string) => void;
};

export function RegisterPage({ setAuthToken }: RegisterPageProps) {
  const navigate = useNavigate();

  const onSubmit: onUsernamePasswordSubmit = async (username, password) =>
    await sendPostRequest("/auth/register", { username, password }).then(
      async (res) => {
        if (res.status === 201) {
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
      <h1>Register a New Account</h1>
      <UsernamePasswordForm
        onSubmit={onSubmit}
        onSuccess={() => navigate("/")}
      />
    </div>
  );
}
