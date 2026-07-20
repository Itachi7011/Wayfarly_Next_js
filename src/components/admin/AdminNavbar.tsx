"use client";

import { Bell, Search, Menu } from "lucide-react";
import { useSidebar } from "@/context/SidebarContext";
import styles from "./AdminNavbar.module.css";

export default function AdminNavbar({
  onMobileToggle,
}: {
  onMobileToggle?: () => void;
}) {
  const { toggleSidebar } = useSidebar();

  return (
    <header className={styles["wayfarly-adminnav-root"]}>
      <button
        className={styles["wayfarly-adminnav-mobile-toggle"]}
        onClick={onMobileToggle ?? toggleSidebar}
        aria-label="Toggle admin menu"
      >
        <Menu size={18} />
      </button>

      <div className={styles["wayfarly-adminnav-search-wrap"]}>
        <Search size={15} className={styles["wayfarly-adminnav-search-icon"]} />
        <input
          className={styles["wayfarly-adminnav-search-input"]}
          type="search"
          placeholder="Search users, trips, logs..."
          aria-label="Admin search"
        />
      </div>

      <div className={styles["wayfarly-adminnav-actions"]}>
        <button className={styles["wayfarly-adminnav-icon-btn"]} aria-label="Notifications, 3 unread">
          <Bell size={18} />
          <span className={styles["wayfarly-adminnav-badge"]}>3</span>
        </button>

        <button className={styles["wayfarly-adminnav-avatar-group"]} aria-label="Admin account menu">
          <span className={styles["wayfarly-adminnav-avatar"]}>A</span>
          <span style={{ textAlign: "left" }}>
            <span className={styles["wayfarly-adminnav-avatar-name"]} style={{ display: "block" }}>
              Admin
            </span>
            <span className={styles["wayfarly-adminnav-avatar-role"]}>Super Admin</span>
          </span>
        </button>
      </div>
    </header>
  );
}
