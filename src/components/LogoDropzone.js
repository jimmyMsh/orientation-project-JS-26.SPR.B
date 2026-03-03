import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function LogoDropzone({ logo, onLogoChange }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        onLogoChange(reader.result);
      };
      reader.readAsDataURL(file);
    },
    [onLogoChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".svg", ".webp"] },
    maxFiles: 1,
    multiple: false,
  });

  const handleRemove = (e) => {
    e.stopPropagation();
    onLogoChange(null);
  };

  return (
    <div className="logoDropzoneWrapper">
      <div
        {...getRootProps()}
        className={`logoDropzone ${isDragActive ? "logoDropzoneActive" : ""} ${
          logo ? "logoDropzoneHasImage" : ""
        }`}
      >
        <input {...getInputProps()} />
        {logo ? (
          <div className="logoPreview">
            <img src={logo} alt="Uploaded logo" className="logoImage" />
            <button
              type="button"
              className="logoRemoveBtn"
              onClick={handleRemove}
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="logoPlaceholder">
            {isDragActive ? (
              <p>Drop the image here</p>
            ) : (
              <>
                <p>Drag &amp; drop a logo here</p>
                <p className="logoPlaceholderHint">or click to browse</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default LogoDropzone;
