"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { useTheme } from "@/context/ThemeContext";
import styles from "./settings.module.css";

export default function SettingsForm() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [tripReminders, setTripReminders] = useState(true);
  const [currency, setCurrency] = useState("INR");

  const confirmDelete = async () => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Delete your account?",
      text: "This permanently removes your trips, photos, and account data. This can't be undone.",
      showCancelButton: true,
      confirmButtonText: "Delete account",
      confirmButtonColor: "#ff6b4a",
      background: "var(--surface)",
      color: "var(--foreground)",
    });

    if (result.isConfirmed) {
      Swal.fire({
        icon: "info",
        title: "Not wired up yet",
        text: "This is a portfolio scaffold — account deletion isn't connected to a real backend action.",
        confirmButtonColor: "#c9932c",
        background: "var(--surface)",
        color: "var(--foreground)",
      });
    }
  };

  return (
    <div>
      <div className={styles["wayfarly-settings-section"]}>
        <div className={styles["wayfarly-settings-section-title"]}>Appearance</div>
        <div className={styles["wayfarly-settings-row"]}>
          <div>
            <div className={styles["wayfarly-settings-row-label"]}>Dark mode</div>
            <div className={styles["wayfarly-settings-row-desc"]}>
              {isDarkMode ? "Currently dark" : "Currently light"} — applies across the whole app
            </div>
          </div>
          <button
            className={styles["wayfarly-settings-toggle"]}
            data-on={isDarkMode}
            onClick={toggleDarkMode}
            role="switch"
            aria-checked={isDarkMode}
            aria-label="Toggle dark mode"
          >
            <span className={styles["wayfarly-settings-toggle-knob"]} />
          </button>
        </div>
      </div>

      <div className={styles["wayfarly-settings-section"]}>
        <div className={styles["wayfarly-settings-section-title"]}>Notifications</div>
        <div className={styles["wayfarly-settings-row"]}>
          <div>
            <div className={styles["wayfarly-settings-row-label"]}>Email notifications</div>
            <div className={styles["wayfarly-settings-row-desc"]}>Account activity and security alerts</div>
          </div>
          <button
            className={styles["wayfarly-settings-toggle"]}
            data-on={emailNotifs}
            onClick={() => setEmailNotifs((v) => !v)}
            role="switch"
            aria-checked={emailNotifs}
            aria-label="Toggle email notifications"
          >
            <span className={styles["wayfarly-settings-toggle-knob"]} />
          </button>
        </div>
        <div className={styles["wayfarly-settings-row"]}>
          <div>
            <div className={styles["wayfarly-settings-row-label"]}>Trip reminders</div>
            <div className={styles["wayfarly-settings-row-desc"]}>A nudge a few days before a trip starts</div>
          </div>
          <button
            className={styles["wayfarly-settings-toggle"]}
            data-on={tripReminders}
            onClick={() => setTripReminders((v) => !v)}
            role="switch"
            aria-checked={tripReminders}
            aria-label="Toggle trip reminders"
          >
            <span className={styles["wayfarly-settings-toggle-knob"]} />
          </button>
        </div>
      </div>

      <div className={styles["wayfarly-settings-section"]}>
        <div className={styles["wayfarly-settings-section-title"]}>Preferences</div>
        <div className={styles["wayfarly-settings-row"]}>
          <div>
            <div className={styles["wayfarly-settings-row-label"]}>Default currency</div>
            <div className={styles["wayfarly-settings-row-desc"]}>Used when creating a new trip</div>
          </div>
          <select
            className={styles["wayfarly-settings-select"]}
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            aria-label="Default currency"
          >
            <option value="INR">INR (₹)</option>
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
          </select>
        </div>
      </div>

      <div className={styles["wayfarly-settings-section"]} data-danger="true">
        <div className={styles["wayfarly-settings-section-title"]}>Danger Zone</div>
        <div className={styles["wayfarly-settings-row"]}>
          <div>
            <div className={styles["wayfarly-settings-row-label"]}>Delete account</div>
            <div className={styles["wayfarly-settings-row-desc"]}>Permanently remove your account and all trips</div>
          </div>
          <button className={styles["wayfarly-settings-danger-btn"]} onClick={confirmDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
