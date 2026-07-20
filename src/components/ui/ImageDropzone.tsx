"use client";

import { useState } from "react";
import { UploadCloud } from "lucide-react";
import styles from "./ImageDropzone.module.css";

type Props = {
  onUploaded: (result: { url: string; publicId: string }) => void;
  previewUrl?: string | null;
  label?: string;
  hint?: string;
};

export default function ImageDropzone({
  onUploaded,
  previewUrl,
  label = "Drag a photo here, or click to browse",
  hint = "JPEG, PNG or WebP, up to 5MB",
}: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [localPreview, setLocalPreview] = useState<string | null>(previewUrl ?? null);

  const upload = async (file: File) => {
    setError(null);

    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("File is too large (max 5MB).");
      return;
    }

    setLocalPreview(URL.createObjectURL(file));
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.set("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Upload failed.");
        return;
      }

      onUploaded({ url: data.url, publicId: data.publicId });
    } catch {
      setError("Upload failed — check your connection and try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFiles = (files: FileList | null) => {
    const file = files?.[0];
    if (file) upload(file);
  };

  return (
    <div>
      <div
        className={styles["wayfarly-dropzone-root"]}
        data-dragging={isDragging}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
      >
        <input
          type="file"
          accept="image/*"
          className={styles["wayfarly-dropzone-input"]}
          onChange={(e) => handleFiles(e.target.files)}
          aria-label={label}
        />

        {localPreview && !isUploading && (
          // eslint-disable-next-line @next/next/no-img-element -- transient client-side preview, not an optimized asset
          <img src={localPreview} alt="Selected preview" className={styles["wayfarly-dropzone-preview"]} />
        )}

        {isUploading ? (
          <>
            <div className={styles["wayfarly-dropzone-spinner"]} />
            <div className={styles["wayfarly-dropzone-label"]}>Uploading...</div>
          </>
        ) : (
          <>
            {!localPreview && <UploadCloud size={22} className={styles["wayfarly-dropzone-icon"]} />}
            <div className={styles["wayfarly-dropzone-label"]}>{localPreview ? "Choose a different photo" : label}</div>
            <div className={styles["wayfarly-dropzone-hint"]}>{hint}</div>
          </>
        )}
      </div>
      {error && <p className={styles["wayfarly-dropzone-error"]}>{error}</p>}
    </div>
  );
}
