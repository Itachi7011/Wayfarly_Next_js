import styles from "./dashboard.module.css";

export default function DashboardLoading() {
  return (
    <div className={styles["wayfarly-dash-shell"]}>
      <div />
      <main className={styles["wayfarly-dash-main"]}>
        <div style={{ height: 32, width: 220, borderRadius: 8, background: "var(--surface-dim)", animation: "wf-pulse 1.4s ease-in-out infinite" }} />
        <div className={styles["wayfarly-dash-stat-grid"]}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ height: 84, borderRadius: 18, background: "var(--surface-dim)", animation: "wf-pulse 1.4s ease-in-out infinite" }} />
          ))}
        </div>
      </main>
      <style>{`@keyframes wf-pulse { 0%,100% { opacity: 0.6 } 50% { opacity: 1 } }`}</style>
    </div>
  );
}
