import React from "react";

export function AccountSettings({
  username,
  setUsername,
}: {
  username: string;
  setUsername: (newUsername: string) => void;
}) {
  return (
    <>
      <h2>Account settings</h2>
      <label>
        Username{" "}
        <input
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
      </label>
      <p>
        <i>Changes are auto-saved.</i>
      </p>
    </>
  );
}
