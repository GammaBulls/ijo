import React, { useCallback, useEffect, useRef, useState } from "react";
import { AddImage, PreviewImage, Wrapper } from "./PhotoSelect.components";

const PhotoSelect = ({ file, setFile }) => {
  const [preview, setPreview] = useState();
  const inputRef = useRef();

  const onFileChange = useCallback(
    e => {
      const newFile = e.target.files[0];
      setFile(newFile);
    },
    [setFile],
  );

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = readerEvent => {
      setPreview(`${readerEvent.target.result}`);
    };
    reader.onerror = () => setPreview(null);
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  }, [file]);

  const shouldShowPreview = !!file;

  const onWrapperClick = useCallback(() => {
    if (shouldShowPreview) {
      setFile(null);
    } else {
      inputRef.current.click();
    }
  }, [setFile, shouldShowPreview]);

  return (
    <Wrapper onClick={onWrapperClick}>
      <input
        type="file"
        hidden={true}
        accept="image/*, .png, .jpg, .jpeg"
        onChange={onFileChange}
        ref={inputRef}
      />
      <AddImage hasImage={shouldShowPreview} />
      {shouldShowPreview && <PreviewImage src={preview} />}
    </Wrapper>
  );
};

export default PhotoSelect;
