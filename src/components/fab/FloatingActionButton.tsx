"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, MapPinPlus, Wallet, ListChecks, Camera } from "lucide-react";
import styles from "./FloatingActionButton.module.css";

const quickActions = [
  { label: "New trip", icon: MapPinPlus, href: "/trips/create" },
  { label: "Add budget item", icon: Wallet, href: "/trips" },
  { label: "Packing list", icon: ListChecks, href: "/trips" },
  { label: "Add photo", icon: Camera, href: "/trips" },
];

export default function FloatingActionButton() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <div className={styles["wayfarly-fab-root"]}>
      <div className={styles["wayfarly-fab-route-line"]} data-open={open} style={{ height: open ? quickActions.length * 62 : 0 }} />

      {quickActions
        .slice()
        .reverse()
        .map((action) => (
          <div key={action.label} className={styles["wayfarly-fab-item"]} data-open={open}>
            <span className={styles["wayfarly-fab-item-label"]}>{action.label}</span>
            <button
              className={styles["wayfarly-fab-item-btn"]}
              onClick={() => {
                setOpen(false);
                router.push(action.href);
              }}
              aria-label={action.label}
            >
              <action.icon size={18} />
            </button>
          </div>
        ))}

      <button
        className={styles["wayfarly-fab-main-btn"]}
        data-open={open}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close quick actions" : "Open quick actions"}
        aria-expanded={open}
      >
        <Plus size={24} strokeWidth={2.5} />
      </button>
    </div>
  );
}
