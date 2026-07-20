import type { Metadata } from "next";
import styles from "./settings.module.css";
import SettingsForm from "./SettingsForm";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your Wayfarly appearance, notifications, and preferences.",
};

export default function SettingsPage() {
  return (
    <div className={styles["wayfarly-settings-shell"]}>
      <h1 className={styles["wayfarly-settings-heading"]}>Settings</h1>
      <p className={styles["wayfarly-settings-sub"]}>Appearance, notifications, and account preferences.</p>
      <SettingsForm />
    </div>
  );
}
