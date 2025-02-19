import { MainLayout } from "./MainLayout.jsx";

export function AccountSettings({ username, setUsername }) {
  return (
    <MainLayout>
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
    </MainLayout>
  );
}
