import React, { useCallback, useEffect } from "react";
import { SelectWrapper } from "./MultiPhotoSelect.components";
import PhotoSelect from "./PhotoSelect";

const MultiPhotoSelect = ({ count, photos, setPhotos }) => {
  useEffect(() => {
    setPhotos(photos => [
      ...photos.slice(0, count),
      ...new Array(Math.max(0, count - photos.length)).fill(null),
    ]);
  }, [count, setPhotos]);

  const setNthPhoto = useCallback(
    n => photo => {
      setPhotos(prev => {
        const newPhotos = prev.slice();
        newPhotos.splice(n, 1, photo);
        return newPhotos;
      });
    },
    [setPhotos],
  );

  return (
    <SelectWrapper>
      {photos.map((photo, i) => (
        <PhotoSelect key={i} file={photo} setFile={setNthPhoto(i)} />
      ))}
    </SelectWrapper>
  );
};

export default MultiPhotoSelect;
