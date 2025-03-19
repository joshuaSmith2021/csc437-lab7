import { JSX } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
  authToken,
}: {
  children: JSX.Element;
  authToken?: string;
}) {
  if (!authToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
