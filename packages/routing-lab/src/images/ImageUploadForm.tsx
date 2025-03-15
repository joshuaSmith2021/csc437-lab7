import React, { useActionState, useEffect, useState } from "react";
import { FormState } from "../auth/UsernamePasswordForm";

function readAsDataURL(file: File) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result);
    fr.onerror = (err) => reject(err);
    fr.readAsDataURL(file);
  });
}

type ImageUploadFormProps = { authToken?: string };

export default function ImageUploadForm({ authToken }: ImageUploadFormProps) {
  const [files, setFiles] = useState<FileList | null>(null);
  const [dataUrl, setDataUrl] = useState<string | undefined>(undefined);

  const [formState, submitAction, isPending] = useActionState(
    async (prev: FormState, formData: FormData) => {
      try {
        console.log("token: " + authToken);
        const response = await fetch("/api/images", {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (!response.ok) {
          // Handle HTTP 400 bad upload, HTTP 401 Unauthorized, etc...
          return { success: false, message: response.statusText };
        }

        return { success: true, message: "" };
      } catch (error) {
        // Network error
        console.error(error);
        return { success: false, message: error };
      }
    },
    { success: false, message: "" },
  );

  useEffect(() => {
    if (files === null || files.length === 0) {
      return;
    }

    readAsDataURL(files[0]).then((data) => {
      setDataUrl(data as string);
    });
  }, [files]);

  return (
    <form action={submitAction}>
      {!formState.success && (
        <p style={{ color: "#ff0000" }}>{formState.message}</p>
      )}
      {isPending && <p>Loading...</p>}
      <div>
        <label htmlFor="imageUpload">Choose image to upload: </label>
        <input
          id="imageUpload"
          name="imageUpload"
          type="file"
          accept=".png,.jpg,.jpeg"
          onChange={(e) => setFiles(e.target.files)}
        />
      </div>
      <div>
        <label>
          <label htmlFor="titleInput">Image title: </label>
          <input id="titleInput" name="name" />
        </label>
      </div>

      <div>
        {/* Preview img element */}
        <img style={{ maxWidth: "20em" }} src={dataUrl} alt="" />
      </div>

      <button>Confirm upload</button>
    </form>
  );
}
