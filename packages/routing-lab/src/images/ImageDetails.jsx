import { useParams } from "react-router";
import { useImageFetching } from "./useImageFetching.js";

export function ImageDetails({ isLoading, fetchedImages }) {
  const { imageId } = useParams();

  if (isLoading) {
    return <>Loading...</>;
  }
  const imageData = fetchedImages[imageId];
  if (!imageData) {
    return (
      <>
        <h2>Image not found</h2>
      </>
    );
  }

  return (
    <>
      <h2>{imageData.name}</h2>
      <img
        className="ImageDetails-img"
        src={imageData.src}
        alt={imageData.name}
      />
    </>
  );
}
