import React from "react";
import "./ImageGallery.css";
import { Link } from "react-router";
import { ImageEntryList } from "./useImageFetching";
import ImageUploadForm from "./ImageUploadForm";

export function ImageGallery({
  isLoading,
  fetchedImages,
  authToken,
}: {
  isLoading: boolean;
  fetchedImages: ImageEntryList;
  authToken?: string;
}) {
  const imageElements = fetchedImages.map((image) => (
    <div key={image.id} className="ImageGallery-photo-container">
      <Link to={`/images/${image.id}`}>
        <img src={image.src} alt={image.name} />
      </Link>
    </div>
  ));
  return (
    <>
      <h2>Image Gallery</h2>
      {isLoading && "Loading..."}
      <div className="ImageGallery">{imageElements}</div>
      <h3>Upload an Image</h3>
      <ImageUploadForm authToken={authToken} />
    </>
  );
}
