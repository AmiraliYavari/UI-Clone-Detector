import { useRef, useState } from 'react';

export default function Dropzone({ imgData, onFile }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      const base64 = result.split(',')[1];
      onFile({ base64, mediaType: file.type, previewUrl: result });
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <div
        className={`dropzone ${dragging ? 'drag' : ''}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFile(e.dataTransfer.files[0]);
        }}
      >
        {imgData ? (
          <img src={imgData.previewUrl} alt="preview" />
        ) : (
          <>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8b949e" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            <div className="t1">عکس رو بکش اینجا یا کلیک کن</div>
            <div className="t2">PNG / JPG</div>
          </>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleFile(e.target.files[0])}
      />
    </>
  );
}
