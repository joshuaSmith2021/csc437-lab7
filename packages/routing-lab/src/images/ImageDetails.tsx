import React from "react";
import { useParams } from "react-router";
import { ImageEntryList } from "./useImageFetching";

export function ImageDetails({
  isLoading,
  fetchedImages,
}: {
  isLoading: boolean;
  fetchedImages: ImageEntryList;
}) {
  const params = useParams();
  const imageId = parseInt(params.imageId!);

  if (isLoading) {
    return <>Loading...</>;
  }

  const imageData = fetchedImages[imageId!];
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
