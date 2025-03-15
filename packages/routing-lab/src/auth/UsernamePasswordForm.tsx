import React, { useActionState } from "react";

type FormState = {
  success: boolean;
  message: string;
};

type UsernamePasswordFormProps = {
  onSubmit: (username: string, password: string) => Promise<void>;
};

export default function UsernamePasswordForm({
  onSubmit,
}: UsernamePasswordFormProps) {
  const [result, submitAction, isPending] = useActionState(
    async (prev: FormState, formData: FormData) => {
      const username = formData.get("username") as string;
      const password = formData.get("password") as string;

      if (!username || !password) {
        return { success: false, message: "Missing username or password" };
      }

      await onSubmit(username, password);

      return { success: true, message: "" };
    },
    {
      success: false,
      message: "",
    },
  );

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
