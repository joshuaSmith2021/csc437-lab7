import { useActionState, useEffect, useState } from "react";
import { ERROR_TEXT_CLASSNAME } from "../util/classnames";
import { BaseComponentProps } from "../routes";
import { useNavigate } from "react-router-dom";

type FormState = {
  success: boolean;
  message: string;
};

export default function CreatePost({ authToken }: BaseComponentProps) {
  const navigate = useNavigate();
  const [error, setError] = useState<string>();

  const [formState, submitAction, isPending] = useActionState(
    async (_: FormState, formData: FormData) => {
      try {
        const caption = formData.get("caption")! as string;
        const captionQuery = (caption && `?caption=${caption}`) || "";
        const response = await fetch("/api/posts" + captionQuery, {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          const { message: errorMessage } = (await response.json()) as {
            message: string;
          };
          return { success: false, message: errorMessage };
        }

        return { success: true, message: "" };
      } catch (e) {
        // Network error
        console.error(e);
        return { success: false, message: "Network error" };
      }
    },
    { success: false, message: "" },
  );

  useEffect(() => setError(formState.message), [formState.message]);
  useEffect(() => {
    if (formState.success) {
      navigate("/");
    }
  });

  return (
    <div className="w-screen flex justify-center items-center min-h-[20rem]">
      <form action={submitAction} className="flex flex-col gap-3">
        <label className="block">
          <p>Upload</p>
          <input
            type="file"
            name="imageUpload"
            accept="image/png image/jpeg"
            disabled={isPending}
          />
        </label>
        <label className="block">
          <p>Caption</p>
          <input
            type="text"
            name="caption"
            maxLength={300}
            placeholder="Write something..."
            disabled={isPending}
          />
        </label>
        <button className="self-start" disabled={isPending}>
          Upload
        </button>
        {(error && <div className={ERROR_TEXT_CLASSNAME}>{error}</div>) || (
          <>{/* Spacer */}</>
        )}
      </form>
    </div>
  );
}
