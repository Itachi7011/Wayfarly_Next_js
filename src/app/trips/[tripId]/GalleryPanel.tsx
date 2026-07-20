"use client";

import { useState, useTransition } from "react";
import { Images } from "lucide-react";
import { addGalleryImage } from "@/actions/trips";
import ImageDropzone from "@/components/ui/ImageDropzone";
import type { GalleryImage } from "@/data/trips";
import styles from "./detail.module.css";

export default function GalleryPanel({ tripId, images }: { tripId: string; images: GalleryImage[] }) {
  const [localImages, setLocalImages] = useState(images);
  const [, startTransition] = useTransition();

  const handleUploaded = ({ url, publicId }: { url: string; publicId: string }) => {
    setLocalImages((prev) => [...prev, { url, caption: "" }]);
    startTransition(async () => {
      await addGalleryImage(tripId, { url, publicId });
    });
  };

  return (
    <div className={styles["wayfarly-tripdetail-panel"]}>
      <div className={styles["wayfarly-tripdetail-panel-title"]}>
        <Images size={17} /> Gallery
      </div>

      {localImages.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))",
            gap: "0.6rem",
            marginBottom: "1rem",
          }}
        >
          {localImages.map((img, i) => (
            // eslint-disable-next-line @next/next/no-img-element -- user-uploaded remote asset from Cloudinary
            <img
              key={i}
              src={img.url}
              alt={img.caption || "Trip photo"}
              style={{ width: "100%", height: 90, objectFit: "cover", borderRadius: 10 }}
            />
          ))}
        </div>
      )}

      <ImageDropzone onUploaded={handleUploaded} label="Add a photo to this trip" />
    </div>
  );
}
