import { useParams } from "react-router";
import { useImageFetching } from "./useImageFetching.js";

export function ImageDetails() {
  const { imageId } = useParams();

  const { isLoading, fetchedImages } = useImageFetching(imageId, 0);
  if (isLoading) {
    return <MainLayout>Loading...</MainLayout>;
  }
  const imageData = fetchedImages[0];
  if (!imageData) {
    return (
      <MainLayout>
        <h2>Image not found</h2>
      </MainLayout>
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
