import React from "react";

export function Homepage(props: { userName: string }) {
  return (
    <>
      <h2>Welcome, {props.userName}</h2>
      <p>This is the content of the home page.</p>
    </>
  );
}
