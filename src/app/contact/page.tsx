import type { Metadata } from "next";
import { Mail, MessageSquare } from "lucide-react";
import styles from "../info.module.css";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Wayfarly team.",
};

export default function ContactPage() {
  return (
    <div>
      <div className={styles["wayfarly-info-hero"]}>
        <span className={styles["wayfarly-info-eyebrow"]}>
          <MessageSquare size={13} /> Contact
        </span>
        <h1 className={styles["wayfarly-info-title"]}>Let&apos;s talk.</h1>
        <p className={styles["wayfarly-info-subtitle"]}>
          Bug report, feature idea, or just want to say the itinerary builder saved your honeymoon — we read
          everything that comes through here.
        </p>
      </div>

      <div className={styles["wayfarly-info-body"]}>
        <div className={styles["wayfarly-info-card"]} style={{ marginBottom: "1.6rem" }}>
          <div className={styles["wayfarly-info-card-title"]}>
            <Mail size={14} style={{ display: "inline", verticalAlign: -2, marginRight: 6 }} />
            Prefer email?
          </div>
          <div className={styles["wayfarly-info-card-meta"]}>
            Write to us directly at{" "}
            <a href="mailto:hello@wayfarly.app" style={{ color: "var(--wf-teal)", fontWeight: 600 }}>
              hello@wayfarly.app
            </a>
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
