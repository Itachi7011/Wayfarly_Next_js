import type { Metadata } from "next";
import { Compass } from "lucide-react";
import styles from "../info.module.css";

export const metadata: Metadata = {
  title: "About",
  description: "Why Wayfarly exists, and what we're building toward.",
};

export default function AboutPage() {
  return (
    <div>
      <div className={styles["wayfarly-info-hero"]}>
        <span className={styles["wayfarly-info-eyebrow"]}>
          <Compass size={13} /> About Wayfarly
        </span>
        <h1 className={styles["wayfarly-info-title"]}>Trip planning shouldn&apos;t live in seven tabs.</h1>
        <p className={styles["wayfarly-info-subtitle"]}>
          Wayfarly started as a simple question: why does planning a trip require a spreadsheet, a notes app,
          three group chats, and a folder of screenshots? We wanted one calm place instead.
        </p>
      </div>

      <div className={styles["wayfarly-info-body"]}>
        <div className={styles["wayfarly-info-stat-row"]}>
          <div className={styles["wayfarly-info-stat-card"]}>
            <div className={styles["wayfarly-info-stat-value"]}>2025</div>
            <div className={styles["wayfarly-info-stat-label"]}>Founded</div>
          </div>
          <div className={styles["wayfarly-info-stat-card"]}>
            <div className={styles["wayfarly-info-stat-value"]}>40+</div>
            <div className={styles["wayfarly-info-stat-label"]}>Countries planned in</div>
          </div>
          <div className={styles["wayfarly-info-stat-card"]}>
            <div className={styles["wayfarly-info-stat-value"]}>Remote</div>
            <div className={styles["wayfarly-info-stat-label"]}>Small, distributed team</div>
          </div>
        </div>

        <div className={styles["wayfarly-info-section"]}>
          <h2 className={styles["wayfarly-info-section-title"]}>What we&apos;re building</h2>
          <p className={styles["wayfarly-info-prose"]}>
            Wayfarly keeps a trip&apos;s itinerary, budget, packing list, photos and notes in one workspace,
            so the planning is as enjoyable as the trip itself. No more losing a hotel confirmation in your
            inbox or forgetting which chat had the final itinerary.
          </p>
          <p className={styles["wayfarly-info-prose"]}>
            We&apos;re building it deliberately slowly: fewer features, done properly, rather than a bloated
            dashboard nobody opens twice.
          </p>
        </div>

        <div className={styles["wayfarly-info-section"]}>
          <h2 className={styles["wayfarly-info-section-title"]}>How we work</h2>
          <ul className={styles["wayfarly-info-list"]}>
            <li>Small, focused releases over sprawling roadmaps.</li>
            <li>Design first — if it isn&apos;t clear on a phone screen, it isn&apos;t done.</li>
            <li>We use Wayfarly to plan our own trips, every time.</li>
          </ul>
        </div>

        <div className={styles["wayfarly-info-divider"]} />

        <div className={styles["wayfarly-info-section"]}>
          <h2 className={styles["wayfarly-info-section-title"]}>Get in touch</h2>
          <p className={styles["wayfarly-info-prose"]}>
            Questions, feedback, or just want to say hi? Visit our{" "}
            <a href="/contact" style={{ color: "var(--wf-teal)", fontWeight: 600 }}>
              contact page
            </a>{" "}
            — we read everything.
          </p>
        </div>
      </div>
    </div>
  );
}
