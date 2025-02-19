export function AccountSettings({ username, setUsername }) {
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
