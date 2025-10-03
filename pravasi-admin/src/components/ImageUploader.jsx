import { useDropzone } from "react-dropzone";
import { useState } from "react";

export default function ImageUploader({ onImageUpload }) {
  const [preview, setPreview] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setPreview(URL.createObjectURL(file));
    onImageUpload(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded p-4 text-center cursor-pointer ${
        isDragActive ? "border-blue-400 bg-blue-50" : "border-gray-300"
      }`}
    >
      <input {...getInputProps()} />
      {preview ? (
        <img
          src={preview}
          alt="Preview"
          className="mx-auto h-32 object-cover rounded"
        />
      ) : (
        <p className="text-gray-500">Drag & drop or click to upload image</p>
      )}
    </div>
  );
}
