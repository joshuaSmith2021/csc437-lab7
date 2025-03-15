import { useEffect, useState } from "react";

export interface ImageEntry {
  _id: string;
  id: string;
  src: string;
  name: string;
}

export type ImageEntryList = Readonly<ImageEntry[]>;

/**
 * Fetches images on component mount.  Returns an object with two properties: isLoading and fetchedImages, which will be
 * an array of ImageData.
 */
export function useImageFetching(imageId: string, delay = 1000) {
  const [isLoading, setIsLoading] = useState(true);
  const [fetchedImages, setFetchedImages] = useState<ImageEntryList>([]);

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/images")
      .then((response) => response.json())
      .then(
        (data) =>
          data.map(
            (image: ImageEntry) => ({ ...image, id: image._id }) as ImageEntry,
          ) as ImageEntryList,
      )
      .then((data) =>
        imageId === "" ? data : data.filter((image) => image.id === imageId),
      )
      .then((data) => {
        setFetchedImages(data);
        setIsLoading(false);
      });
  }, [imageId]);

  return { isLoading, fetchedImages };
}
