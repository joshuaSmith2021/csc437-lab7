import { useState } from "react";
import PageLayout from "./Layout";
import { ERROR_TEXT_CLASSNAME } from "../util/classnames";

export default function CreatePost() {
  const [caption, setCaption] = useState("");
  const [files, setFiles] = useState<FileList | null>();
  const [error, setError] = useState<string>();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError(undefined);

    if (caption === "" && !files?.length) {
      setError("Please write a caption or upload a picture");
      return;
    }
  };

  return (
    <PageLayout hideFooter>
      <div className="w-screen flex justify-center items-center min-h-[20rem]">
        <form className="flex flex-col gap-3">
          <label className="block">
            <p>Upload</p>
            <input
              type="file"
              accept="image/png image/jpeg"
              onChange={(e) => setFiles(e.currentTarget.files)}
            />
          </label>
          <label className="block">
            <p>Caption</p>
            <input
              type="text"
              maxLength={300}
              placeholder="Write something..."
              value={caption}
              onChange={(e) => setCaption(e.currentTarget.value)}
            />
          </label>
          <button className="self-start" onClick={handleSubmit}>
            Upload
          </button>
          {(error && <div className={ERROR_TEXT_CLASSNAME}>{error}</div>) || (
            <>{/* Spacer */}</>
          )}
        </form>
      </div>
    </PageLayout>
  );
}
