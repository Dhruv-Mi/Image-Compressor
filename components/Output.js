import React, { useState } from "react";
import "../Design/center.css";
import imageCompression from "browser-image-compression";

export default function Output() {
  const [selectedFile, setSelectedFile] = useState();
  const fileArray = ["jpg", "png", "svg", "gif"];

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmission = () => {
    console.log(selectedFile);
    var ext = selectedFile.name.split(".").pop();
    if (!fileArray.includes(ext)) {
      alert("Cannot Compress ", ext, " type of file!!!");
    } else {
      compress();
    }
  };

  const compress = async () => {
    const imageFile = selectedFile;

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 500,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);

      show(compressedFile);
    } catch (error) {
      console.log(error);
    }
  };

  const show = (file) => {
    console.log(file);
    const downloadLink = URL.createObjectURL(file);
    console.log(downloadLink);
  };

  return (
    <>
      <div className="container-lg text-center">
        <p className="h2 mt-1.5">Image Compressor</p>
        <div className="m-5">
          <p className="h5">Please Select an Image to Compress</p>
        </div>
        <div className="m-3 text-center flex flex-row justify-center">
          <input type="file" name="file" onChange={changeHandler} />
          <div>
            <button
              className="btn btn-primary btn-sm"
              onClick={handleSubmission}
            >
              Compress
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
