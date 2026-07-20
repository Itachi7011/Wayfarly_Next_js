import type { Metadata } from "next";
import styles from "./admin-dashboard.module.css";
import { trips } from "@/data/trips";

export const metadata: Metadata = {
  title: "Overview",
};

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className={styles["wayfarly-admindash-heading"]}>Admin Overview</h1>

      <div className={styles["wayfarly-admindash-stat-grid"]}>
        <div className={styles["wayfarly-admindash-stat-card"]}>
          <div className={styles["wayfarly-admindash-stat-value"]}>1,204</div>
          <div className={styles["wayfarly-admindash-stat-label"]}>Registered users</div>
        </div>
        <div className={styles["wayfarly-admindash-stat-card"]}>
          <div className={styles["wayfarly-admindash-stat-value"]}>{trips.length}</div>
          <div className={styles["wayfarly-admindash-stat-label"]}>Trips this month</div>
        </div>
        <div className={styles["wayfarly-admindash-stat-card"]}>
          <div className={styles["wayfarly-admindash-stat-value"]}>99.98%</div>
          <div className={styles["wayfarly-admindash-stat-label"]}>Uptime</div>
        </div>
        <div className={styles["wayfarly-admindash-stat-card"]}>
          <div className={styles["wayfarly-admindash-stat-value"]}>4</div>
          <div className={styles["wayfarly-admindash-stat-label"]}>Open reports</div>
        </div>
      </div>

      <div className={styles["wayfarly-admindash-table-wrap"]}>
        <table className={styles["wayfarly-admindash-table"]}>
          <thead>
            <tr>
              <th>Trip</th>
              <th>Destination</th>
              <th>Status</th>
              <th>Budget</th>
            </tr>
          </thead>
          <tbody>
            {trips.map((t) => (
              <tr key={t.id}>
                <td>{t.title}</td>
                <td>{t.destination}, {t.country}</td>
                <td>
                  <span className={styles["wayfarly-admindash-pill"]}>{t.status}</span>
                </td>
                <td>{t.currency}{t.budgetTotal.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
