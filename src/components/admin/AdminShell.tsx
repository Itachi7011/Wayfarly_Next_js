"use client";

import { useSidebar } from "@/context/SidebarContext";
import styles from "./AdminShell.module.css";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const { isExpanded } = useSidebar();

  return (
    <div className={styles["wayfarly-adminshell-main"]} style={{ marginLeft: isExpanded ? 260 : 76 }}>
      {children}
    </div>
  );
}
