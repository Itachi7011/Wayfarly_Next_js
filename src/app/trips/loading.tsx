import styles from "./trips.module.css";

export default function TripsLoading() {
  return (
    <div className={styles["wayfarly-trips-grid"]} style={{ marginTop: "2.5rem" }}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          style={{
            height: 260,
            borderRadius: 20,
            background: "var(--surface-dim)",
            animation: "wf-pulse 1.4s ease-in-out infinite",
          }}
        />
      ))}
      <style>{`@keyframes wf-pulse { 0%,100% { opacity: 0.6 } 50% { opacity: 1 } }`}</style>
    </div>
  );
}
