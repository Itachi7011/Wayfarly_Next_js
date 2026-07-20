import type { Metadata } from "next";
import { dashboardStats } from "@/data/trips";
import styles from "./profile.module.css";

export const metadata: Metadata = {
  title: "Profile",
  description: "Manage your Wayfarly account.",
};

export default function ProfilePage() {
  const name = "Ada Lovelace";
  const email = "ada@wayfarly.app";

  return (
    <div className={styles["wayfarly-profile-shell"]}>
      <div className={styles["wayfarly-profile-card"]}>
        <div className={styles["wayfarly-profile-avatar"]}>{name.charAt(0)}</div>
        <div className={styles["wayfarly-profile-name"]}>{name}</div>
        <div className={styles["wayfarly-profile-email"]}>{email}</div>

        <div className={styles["wayfarly-profile-stat-row"]}>
          <div>
            <div className={styles["wayfarly-profile-stat-value"]}>{dashboardStats.totalTrips}</div>
            <div className={styles["wayfarly-profile-stat-label"]}>Trips</div>
          </div>
          <div>
            <div className={styles["wayfarly-profile-stat-value"]}>{dashboardStats.upcoming}</div>
            <div className={styles["wayfarly-profile-stat-label"]}>Upcoming</div>
          </div>
          <div>
            <div className={styles["wayfarly-profile-stat-value"]}>{dashboardStats.completed}</div>
            <div className={styles["wayfarly-profile-stat-label"]}>Completed</div>
          </div>
        </div>

        <div className={styles["wayfarly-profile-settings-list"]}>
          <div className={styles["wayfarly-profile-settings-row"]}>
            <span>Email notifications</span>
            <span style={{ opacity: 0.6 }}>On</span>
          </div>
          <div className={styles["wayfarly-profile-settings-row"]}>
            <span>Default currency</span>
            <span style={{ opacity: 0.6 }}>INR (₹)</span>
          </div>
          <div className={styles["wayfarly-profile-settings-row"]}>
            <span>Theme</span>
            <span style={{ opacity: 0.6 }}>Follows system</span>
          </div>
        </div>
      </div>
    </div>
  );
}
