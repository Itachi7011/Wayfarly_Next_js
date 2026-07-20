import type { Metadata } from "next";
import { Briefcase, MapPin } from "lucide-react";
import styles from "../info.module.css";

export const metadata: Metadata = {
  title: "Careers",
  description: "Open roles at Wayfarly.",
};

const roles = [
  { title: "Senior Product Designer", type: "Full-time", location: "Remote" },
  { title: "Backend Engineer (Node.js / MongoDB)", type: "Full-time", location: "Remote" },
  { title: "Customer Support Lead", type: "Part-time", location: "Remote" },
];

export default function CareersPage() {
  return (
    <div>
      <div className={styles["wayfarly-info-hero"]}>
        <span className={styles["wayfarly-info-eyebrow"]}>
          <Briefcase size={13} /> Careers
        </span>
        <h1 className={styles["wayfarly-info-title"]}>Help people plan better trips.</h1>
        <p className={styles["wayfarly-info-subtitle"]}>
          We&apos;re a small, remote-first team. Every role has real ownership — no layers of process
          between you and the product.
        </p>
      </div>

      <div className={styles["wayfarly-info-body"]}>
        <div className={styles["wayfarly-info-section"]}>
          <h2 className={styles["wayfarly-info-section-title"]}>Open roles</h2>
          {roles.map((role) => (
            <div key={role.title} className={styles["wayfarly-info-card"]}>
              <div className={styles["wayfarly-info-card-title"]}>{role.title}</div>
              <div className={styles["wayfarly-info-card-meta"]}>
                <MapPin size={12} style={{ display: "inline", verticalAlign: -1, marginRight: 4 }} />
                {role.location} · {role.type}
              </div>
            </div>
          ))}
        </div>

        <div className={styles["wayfarly-info-section"]}>
          <h2 className={styles["wayfarly-info-section-title"]}>Don&apos;t see your role?</h2>
          <p className={styles["wayfarly-info-prose"]}>
            We&apos;re always happy to hear from people who care about travel and good software. Send us a
            note through the <a href="/contact" style={{ color: "var(--wf-teal)", fontWeight: 600 }}>contact page</a>{" "}
            with what you&apos;d want to work on.
          </p>
        </div>
      </div>
    </div>
  );
}
