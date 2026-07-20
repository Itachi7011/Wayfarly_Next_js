import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import styles from "../info.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Wayfarly collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  return (
    <div>
      <div className={styles["wayfarly-info-hero"]}>
        <span className={styles["wayfarly-info-eyebrow"]}>
          <ShieldCheck size={13} /> Privacy Policy
        </span>
        <h1 className={styles["wayfarly-info-title"]}>Privacy Policy</h1>
        <p className={styles["wayfarly-info-updated"]}>Last updated: January 2026</p>
      </div>

      <div className={styles["wayfarly-info-body"]}>
        <div className={styles["wayfarly-info-section"]}>
          <h2 className={styles["wayfarly-info-section-title"]}>What we collect</h2>
          <p className={styles["wayfarly-info-prose"]}>
            When you create an account, we store your name, email address, and a securely hashed version of
            your password — never the password itself. When you plan a trip, we store the trip details you
            enter: destinations, dates, budgets, itineraries, checklists, notes, and any photos you upload.
          </p>
        </div>

        <div className={styles["wayfarly-info-section"]}>
          <h2 className={styles["wayfarly-info-section-title"]}>How we use it</h2>
          <ul className={styles["wayfarly-info-list"]}>
            <li>To operate your account and keep your trips saved between sessions.</li>
            <li>To send account-related emails (password resets, security notices) — never marketing you didn&apos;t ask for.</li>
            <li>To improve Wayfarly, using aggregated, anonymized usage patterns only.</li>
          </ul>
        </div>

        <div className={styles["wayfarly-info-section"]}>
          <h2 className={styles["wayfarly-info-section-title"]}>What we don&apos;t do</h2>
          <p className={styles["wayfarly-info-prose"]}>
            We don&apos;t sell your data. We don&apos;t share your trip details with advertisers. Photos you
            upload are stored with our image provider (Cloudinary) and are only accessible via the private
            links Wayfarly generates for your account, unless you explicitly enable public sharing for a trip.
          </p>
        </div>

        <div className={styles["wayfarly-info-section"]}>
          <h2 className={styles["wayfarly-info-section-title"]}>Your controls</h2>
          <p className={styles["wayfarly-info-prose"]}>
            You can edit or delete any trip at any time from your dashboard. Deleting your account removes
            your personal data from our active systems; some records may persist briefly in backups before
            they age out.
          </p>
        </div>

        <div className={styles["wayfarly-info-section"]}>
          <h2 className={styles["wayfarly-info-section-title"]}>Questions</h2>
          <p className={styles["wayfarly-info-prose"]}>
            Reach out any time via the <a href="/contact" style={{ color: "var(--wf-teal)", fontWeight: 600 }}>contact page</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
