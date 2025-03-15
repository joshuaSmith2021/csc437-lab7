import React from "react";
import UsernamePasswordForm from "./UsernamePasswordForm";
import { Link } from "react-router";

export default function LoginPage() {
  return (
    <div>
      <h1>Login</h1>
      <UsernamePasswordForm onSubmit={async () => {}} />
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}
