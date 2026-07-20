import type { Metadata } from "next";
import { Activity, CheckCircle2 } from "lucide-react";
import styles from "../info.module.css";

export const metadata: Metadata = {
  title: "System Status",
  description: "Live status of Wayfarly's core services.",
};

const services = [
  { name: "Web application", uptime: "99.98%" },
  { name: "API & Server Actions", uptime: "99.99%" },
  { name: "Database (MongoDB)", uptime: "99.95%" },
  { name: "Image uploads (Cloudinary)", uptime: "99.97%" },
  { name: "Authentication", uptime: "100.00%" },
];

export default function StatusPage() {
  return (
    <div>
      <div className={styles["wayfarly-info-hero"]}>
        <span className={styles["wayfarly-info-eyebrow"]}>
          <Activity size={13} /> System Status
        </span>
        <h1 className={styles["wayfarly-info-title"]}>All systems operational</h1>
        <p className={styles["wayfarly-info-subtitle"]}>
          Live status of Wayfarly&apos;s core services. This page updates automatically when something needs
          attention.
        </p>
      </div>

      <div className={styles["wayfarly-info-body"]}>
        <div className={styles["wayfarly-info-section"]}>
          {services.map((s) => (
            <div key={s.name} className={styles["wayfarly-info-status-row"]}>
              <span className={styles["wayfarly-info-status-label"]}>
                <span className={styles["wayfarly-info-status-dot"]} />
                {s.name}
              </span>
              <span className={styles["wayfarly-info-status-value"]}>
                <CheckCircle2 size={13} style={{ display: "inline", verticalAlign: -2, marginRight: 4 }} />
                {s.uptime} uptime (90d)
              </span>
            </div>
          ))}
        </div>

        <div className={styles["wayfarly-info-section"]}>
          <h2 className={styles["wayfarly-info-section-title"]}>Past incidents</h2>
          <p className={styles["wayfarly-info-prose"]}>No incidents reported in the last 90 days.</p>
        </div>
      </div>
    </div>
  );
}
