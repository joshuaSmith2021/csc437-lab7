import React from "react";
import ImageEditForm from "./images/ImageEditForm";

export function Homepage(props: { userName: string; authToken?: string }) {
  return (
    <>
      <h2>Welcome, {props.userName}</h2>
      <p>This is the content of the home page.</p>
      <ImageEditForm authToken={props.authToken} />
    </>
  );
}
