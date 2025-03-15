import React from "react";
import { Outlet } from "react-router";
import { Header } from "./Header";

export function MainLayout() {
  return (
    <div>
      <Header />
      <div style={{ padding: "0 2em" }}>
        <Outlet />
      </div>
    </div>
  );
}
