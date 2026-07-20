import type { Metadata } from "next";
import { Newspaper, Download, Mail } from "lucide-react";
import styles from "../info.module.css";

export const metadata: Metadata = {
  title: "Press Kit",
  description: "Wayfarly brand assets, boilerplate, and press contact.",
};

export default function PressPage() {
  return (
    <div>
      <div className={styles["wayfarly-info-hero"]}>
        <span className={styles["wayfarly-info-eyebrow"]}>
          <Newspaper size={13} /> Press Kit
        </span>
        <h1 className={styles["wayfarly-info-title"]}>Writing about Wayfarly?</h1>
        <p className={styles["wayfarly-info-subtitle"]}>
          Everything below is free to use in articles, reviews, or roundups. For anything else, reach out —
          we&apos;re quick to respond.
        </p>
      </div>

      <div className={styles["wayfarly-info-body"]}>
        <div className={styles["wayfarly-info-section"]}>
          <h2 className={styles["wayfarly-info-section-title"]}>Boilerplate</h2>
          <p className={styles["wayfarly-info-prose"]}>
            Wayfarly is a trip-planning workspace that keeps itineraries, budgets, packing lists and travel
            photos in one place. Founded in 2025, it&apos;s built by a small remote team focused on doing a
            few things well rather than everything at once.
          </p>
        </div>

        <div className={styles["wayfarly-info-section"]}>
          <h2 className={styles["wayfarly-info-section-title"]}>Brand assets</h2>
          <div className={styles["wayfarly-info-card"]} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
            <div>
              <div className={styles["wayfarly-info-card-title"]}>Logos &amp; wordmark</div>
              <div className={styles["wayfarly-info-card-meta"]}>SVG + PNG, light and dark variants</div>
            </div>
            <Download size={18} style={{ opacity: 0.6, flexShrink: 0 }} />
          </div>
          <div className={styles["wayfarly-info-card"]} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
            <div>
              <div className={styles["wayfarly-info-card-title"]}>Product screenshots</div>
              <div className={styles["wayfarly-info-card-meta"]}>Dashboard, trip detail, mobile views</div>
            </div>
            <Download size={18} style={{ opacity: 0.6, flexShrink: 0 }} />
          </div>
        </div>

        <div className={styles["wayfarly-info-section"]}>
          <h2 className={styles["wayfarly-info-section-title"]}>Press contact</h2>
          <p className={styles["wayfarly-info-prose"]}>
            <Mail size={14} style={{ display: "inline", verticalAlign: -2, marginRight: 6 }} />
            <a href="mailto:press@wayfarly.app" style={{ color: "var(--wf-teal)", fontWeight: 600 }}>
              press@wayfarly.app
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
