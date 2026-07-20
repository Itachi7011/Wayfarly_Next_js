"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Compass,
  LayoutDashboard,
  Users,
  MapPinned,
  Settings,
  ChevronDown,
  ChevronsLeft,
  BarChart3,
  ShieldCheck,
  Wallet,
  FileText,
} from "lucide-react";
import { useSidebar } from "@/context/SidebarContext";
import styles from "./AdminSidebar.module.css";

const navItems = [
  { type: "link" as const, href: "/admin/dashboard", label: "Overview", icon: LayoutDashboard, active: true },
  {
    type: "group" as const,
    label: "Trips",
    icon: MapPinned,
    children: [
      { href: "/admin/dashboard", label: "All Trips" },
      { href: "/admin/dashboard", label: "Flagged Trips" },
      { href: "/admin/dashboard", label: "Archived" },
    ],
  },
  {
    type: "group" as const,
    label: "Users",
    icon: Users,
    children: [
      { href: "/admin/dashboard", label: "All Users" },
      { href: "/admin/dashboard", label: "Roles & Access" },
    ],
  },
  { type: "link" as const, href: "/admin/dashboard", label: "Analytics", icon: BarChart3 },
  { type: "link" as const, href: "/admin/dashboard", label: "Billing", icon: Wallet },
  { type: "link" as const, href: "/admin/dashboard", label: "Audit Log", icon: FileText },
  { type: "link" as const, href: "/admin/dashboard", label: "Permissions", icon: ShieldCheck },
  { type: "link" as const, href: "/admin/dashboard", label: "Settings", icon: Settings },
];

export default function AdminSidebar() {
  const { isExpanded, toggleSidebar } = useSidebar();
  const [openGroup, setOpenGroup] = useState<string | null>("Trips");

  return (
    <aside className={styles["wayfarly-adminsidebar-root"]} data-expanded={isExpanded} aria-label="Admin navigation">
      <div className={styles["wayfarly-adminsidebar-brand"]}>
        <span className={styles["wayfarly-adminsidebar-brand-mark"]}>
          <Compass size={17} strokeWidth={2.5} />
        </span>
        <span className={styles["wayfarly-adminsidebar-brand-text"]}>Wayfarly Admin</span>
      </div>

      <nav className={styles["wayfarly-adminsidebar-nav"]}>
        {navItems.map((item) => {
          if (item.type === "link") {
            return (
              <Link
                key={item.label}
                href={item.href}
                className={styles["wayfarly-adminsidebar-item"]}
                data-active={item.active}
                title={item.label}
              >
                <span className={styles["wayfarly-adminsidebar-item-icon"]}>
                  <item.icon size={18} />
                </span>
                <span className={styles["wayfarly-adminsidebar-item-label"]}>{item.label}</span>
              </Link>
            );
          }

          const isOpen = openGroup === item.label;
          return (
            <div key={item.label}>
              <button
                className={`${styles["wayfarly-adminsidebar-item"]} ${styles["wayfarly-adminsidebar-group-btn"]}`}
                onClick={() => setOpenGroup(isOpen ? null : item.label)}
                aria-expanded={isOpen}
                title={item.label}
              >
                <span className={styles["wayfarly-adminsidebar-item-icon"]}>
                  <item.icon size={18} />
                </span>
                <span className={styles["wayfarly-adminsidebar-item-label"]}>{item.label}</span>
                <ChevronDown size={14} className={styles["wayfarly-adminsidebar-chevron"]} data-open={isOpen} />
              </button>
              <div className={styles["wayfarly-adminsidebar-submenu"]} data-open={isOpen}>
                {item.children.map((child) => (
                  <Link key={child.label} href={child.href} className={styles["wayfarly-adminsidebar-subitem"]}>
                    {child.label}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </nav>

      <div className={styles["wayfarly-adminsidebar-footer"]}>
        <button
          className={styles["wayfarly-adminsidebar-collapse-btn"]}
          onClick={toggleSidebar}
          aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          <ChevronsLeft size={16} className={styles["wayfarly-adminsidebar-collapse-icon"]} />
          {isExpanded && "Collapse"}
        </button>
      </div>
    </aside>
  );
}
