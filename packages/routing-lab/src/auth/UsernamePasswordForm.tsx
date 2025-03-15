import React, { useActionState, useEffect } from "react";

export type onUsernamePasswordSubmit = (
  username: string,
  password: string,
) => Promise<FormState>;

type FormState = {
  success: boolean;
  message: string;
};

type UsernamePasswordFormProps = {
  onSubmit: onUsernamePasswordSubmit;
  onSuccess?: () => void;
};

export default function UsernamePasswordForm({
  onSubmit,
  onSuccess,
}: UsernamePasswordFormProps) {
  const [result, submitAction, isPending] = useActionState(
    async (prev: FormState, formData: FormData) => {
      const username = formData.get("username") as string;
      const password = formData.get("password") as string;

      if (!username || !password) {
        return { success: false, message: "Missing username or password" };
      }

      return await onSubmit(username, password);
    },
    {
      success: false,
      message: "",
    },
  );

  useEffect(() => {
    if (result.success && onSuccess) {
      onSuccess();
    }
  }, [result]);

  return (
    <form action={submitAction}>
      {!result.success && <p style={{ color: "#ff0000" }}>{result.message}</p>}
      {isPending && <p>Loading...</p>}
      <input
        type="text"
        name="username"
        placeholder="Username"
        disabled={isPending}
      />
      <br />
      <input
        type="password"
        name="password"
        placeholder="Password"
        disabled={isPending}
      />
      <br />
      <input type="submit" disabled={isPending} />
    </form>
  );
}
