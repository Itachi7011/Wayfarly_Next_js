import type { Metadata } from "next";
import { FileText } from "lucide-react";
import styles from "../info.module.css";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of Wayfarly.",
};

export default function TermsPage() {
  return (
    <div>
      <div className={styles["wayfarly-info-hero"]}>
        <span className={styles["wayfarly-info-eyebrow"]}>
          <FileText size={13} /> Terms of Service
        </span>
        <h1 className={styles["wayfarly-info-title"]}>Terms of Service</h1>
        <p className={styles["wayfarly-info-updated"]}>Last updated: January 2026</p>
      </div>

      <div className={styles["wayfarly-info-body"]}>
        <div className={styles["wayfarly-info-section"]}>
          <h2 className={styles["wayfarly-info-section-title"]}>Using Wayfarly</h2>
          <p className={styles["wayfarly-info-prose"]}>
            By creating an account, you agree to use Wayfarly to plan real trips for yourself or people you&apos;re
            traveling with. You&apos;re responsible for the accuracy of the information you enter and for
            keeping your account credentials secure.
          </p>
        </div>

        <div className={styles["wayfarly-info-section"]}>
          <h2 className={styles["wayfarly-info-section-title"]}>Your content</h2>
          <p className={styles["wayfarly-info-prose"]}>
            You own the trips, notes, and photos you create in Wayfarly. We only use them to provide the
            service back to you — displaying your dashboard, generating your PDF exports, and serving any
            trip you choose to make public via a share link.
          </p>
        </div>

        <div className={styles["wayfarly-info-section"]}>
          <h2 className={styles["wayfarly-info-section-title"]}>Public sharing</h2>
          <p className={styles["wayfarly-info-prose"]}>
            If you turn on public sharing for a trip, anyone with the link can view it. You can turn sharing
            off at any time, which immediately disables the link.
          </p>
        </div>

        <div className={styles["wayfarly-info-section"]}>
          <h2 className={styles["wayfarly-info-section-title"]}>Acceptable use</h2>
          <ul className={styles["wayfarly-info-list"]}>
            <li>No uploading content you don&apos;t have the rights to.</li>
            <li>No using Wayfarly to harass, impersonate, or defraud others.</li>
            <li>No attempting to access accounts or data that aren&apos;t yours.</li>
          </ul>
        </div>

        <div className={styles["wayfarly-info-section"]}>
          <h2 className={styles["wayfarly-info-section-title"]}>Changes</h2>
          <p className={styles["wayfarly-info-prose"]}>
            We may update these terms as Wayfarly grows. Meaningful changes will be communicated in advance
            wherever practical.
          </p>
        </div>
      </div>
    </div>
  );
}
