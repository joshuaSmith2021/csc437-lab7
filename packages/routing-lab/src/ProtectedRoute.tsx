import React, { JSX } from "react";
import { Navigate } from "react-router";

export function ProtectedRoute(props: {
  children: JSX.Element;
  authToken?: string;
}) {
  if (!props.authToken) {
    return <Navigate to="/login" replace />;
  }

  return props.children;
}
