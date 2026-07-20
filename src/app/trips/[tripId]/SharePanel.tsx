"use client";

import { useState, useTransition } from "react";
import { Share2, Copy, Check } from "lucide-react";
import Swal from "sweetalert2";
import { toggleTripSharing } from "@/actions/trips";
import styles from "./detail.module.css";

export default function SharePanel({
  tripId,
  slug,
  initialPublic,
}: {
  tripId: string;
  slug: string;
  initialPublic: boolean;
}) {
  const [isPublic, setIsPublic] = useState(initialPublic);
  const [copied, setCopied] = useState(false);
  const [, startTransition] = useTransition();

  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/share/${slug}` : `/share/${slug}`;

  const toggle = () => {
    setIsPublic((prev) => !prev);
    startTransition(async () => {
      await toggleTripSharing(tripId);
    });
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      Swal.fire({
        icon: "info",
        title: "Couldn't copy automatically",
        text: shareUrl,
        confirmButtonColor: "#c9932c",
        background: "var(--surface)",
        color: "var(--foreground)",
      });
    }
  };

  return (
    <div className={styles["wayfarly-tripdetail-panel"]}>
      <div className={styles["wayfarly-tripdetail-panel-title"]}>
        <Share2 size={17} /> Public Sharing
      </div>

      <div className={styles["wayfarly-tripdetail-share-row"]}>
        <span className={styles["wayfarly-tripdetail-notes-text"]} style={{ margin: 0 }}>
          {isPublic ? "Anyone with the link can view this trip." : "Only you can see this trip."}
        </span>
        <button
          className={styles["wayfarly-tripdetail-toggle"]}
          data-on={isPublic}
          onClick={toggle}
          role="switch"
          aria-checked={isPublic}
          aria-label="Toggle public sharing"
        >
          <span className={styles["wayfarly-tripdetail-toggle-knob"]} />
        </button>
      </div>

      {isPublic && (
        <div className={styles["wayfarly-tripdetail-share-link-row"]}>
          <input className={styles["wayfarly-tripdetail-inline-input"]} value={shareUrl} readOnly />
          <button className={styles["wayfarly-tripdetail-inline-add-btn"]} onClick={copyLink} aria-label="Copy share link">
            {copied ? <Check size={15} /> : <Copy size={15} />}
          </button>
        </div>
      )}
    </div>
  );
}
