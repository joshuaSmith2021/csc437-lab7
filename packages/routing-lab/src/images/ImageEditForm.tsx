import React, { useState } from "react";

export default function ImageEditForm({ authToken }: { authToken?: string }) {
  const [imageId, setImageId] = useState("");
  const [imageName, setImageName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit() {
    setIsLoading(true);
    // Add your fetch code here...

    if (imageId) {
      fetch(`/api/images/${imageId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: imageName }),
      })
        .then((res) => console.log(res.status, res.statusText))
        .catch((e) => console.error(e));
    }

    setImageId("");
    setImageName("");
    setIsLoading(false);
  }

  return (
    <div>
      <label style={{ display: "block" }}>
        Image ID
        <input
          value={imageId}
          disabled={isLoading}
          onChange={(e) => setImageId(e.target.value)}
        />
      </label>
      <label style={{ display: "block" }}>
        New image name
        <input
          value={imageName}
          disabled={isLoading}
          onChange={(e) => setImageName(e.target.value)}
        />
      </label>
      <button disabled={isLoading} onClick={handleSubmit}>
        Send request
      </button>
    </div>
  );
}
