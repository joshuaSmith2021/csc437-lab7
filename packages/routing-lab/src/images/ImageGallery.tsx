import React from "react";
import "./ImageGallery.css";
import { Link } from "react-router";
import { ImageEntryList } from "./useImageFetching";

export function ImageGallery({
  isLoading,
  fetchedImages,
}: {
  isLoading: boolean;
  fetchedImages: ImageEntryList;
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
    </>
  );
}
