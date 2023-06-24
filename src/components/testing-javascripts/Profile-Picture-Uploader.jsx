import React, { useState } from "react";
import ReactCrop from "react-image-crop";

export function ImageCropper() {
  const allowedFileTypes = `image/gif image/png, image/jpeg, image/x-png`;
  const [viewImage, setViewImage] = useState(undefined);
  const [crop, setCrop] = useState({
    aspect: 1 / 1,
    height: 468,
    unit: "px",
    width: 468,
    x: 0,
    y: 107,
  });
  const [image, setImage] = useState(undefined);
  const [imageUrl, setImageUrl] = useState(undefined);

  const handleFileChange = (e) => {
    let image = e.target.files[0];
    if (image) {
      const imageReader = new FileReader();
      imageReader.readAsDataURL(image);
      imageReader.onloadend = () => {
        setViewImage(imageReader.result);
      };
    }
  };
  const imageLoaded = (image) => {
    setImage(image);
  };
  function imageCrop(crop) {
    setCrop(crop);
  }
  function imageCropComplete(crop) {
    userCrop(crop);
  }
  async function userCrop(crop) {
    if (image && crop.width && crop.height) {
      await getCroppedImage(image, crop, "newFile.jpeg");
    }
  }
  function getCroppedImage(image, crop, fileName) {
    const imageCanvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    imageCanvas.width = crop.width;
    imageCanvas.height = crop.height;
    const imgCx = imageCanvas.getContext("2d");
    imgCx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    return new Promise((reject, resolve) => {
      imageCanvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("the image canvas is empty"));
          return;
        }
        blob.name = fileName;
        let imageURL;
        window.URL.revokeObjectURL(imageURL);
        imageURL = window.URL.createObjectURL(blob);
        resolve(imageURL);
        setImageUrl(blob);
      }, "image1/jpeg");
    });
  }

  return (
    <>
      <label htmlFor="upload-image">
        <input
          id="upload-image"
          name="upload photo"
          type="file"
          multiple={false}
          onChange={handleFileChange}
        />
        <button
          className="upload-btn"
          variant="contained"
          component="span"
        >Upload your img</button>
      </label>
      <ReactCrop
        src={viewImage}
        crop={crop}
        onImageLoaded={imageLoaded}
        onChange={imageCrop}
        onComplete={imageCropComplete}
      />

{imageUrl && <img src={imageUrl} alt="Cropped Image" />}
    </>
  );
}
export default ImageCropper;