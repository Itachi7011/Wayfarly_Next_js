"use client";

import { useState, useTransition } from "react";
import { ListChecks, Plus } from "lucide-react";
import { toggleChecklistItem, addChecklistItem } from "@/actions/trips";
import type { ChecklistItem } from "@/data/trips";
import styles from "./detail.module.css";

export default function ChecklistPanel({ tripId, items }: { tripId: string; items: ChecklistItem[] }) {
  const [localItems, setLocalItems] = useState(items);
  const [newItemText, setNewItemText] = useState("");
  const [, startTransition] = useTransition();

  const toggle = (itemId: string) => {
    // Optimistic toggle so this feels responsive even without a live database.
    setLocalItems((prev) => prev.map((i) => (i.id === itemId ? { ...i, completed: !i.completed } : i)));

    startTransition(async () => {
      await toggleChecklistItem(tripId, itemId);
    });
  };

  const addItem = () => {
    const text = newItemText.trim();
    if (!text) return;

    const tempId = `temp-${Date.now()}`;
    setLocalItems((prev) => [...prev, { id: tempId, text, completed: false }]);
    setNewItemText("");

    startTransition(async () => {
      await addChecklistItem(tripId, text);
    });
  };

  return (
    <div className={styles["wayfarly-tripdetail-panel"]}>
      <div className={styles["wayfarly-tripdetail-panel-title"]}>
        <ListChecks size={17} /> Packing Checklist
      </div>
      {localItems.length === 0 && <p className={styles["wayfarly-tripdetail-notes-text"]}>Nothing on the list yet.</p>}
      {localItems.map((item) => (
        <label key={item.id} className={styles["wayfarly-tripdetail-checklist-item"]} data-done={item.completed}>
          <input type="checkbox" checked={item.completed} onChange={() => toggle(item.id)} />
          {item.text}
        </label>
      ))}

      <div className={styles["wayfarly-tripdetail-inline-add-row"]}>
        <input
          className={styles["wayfarly-tripdetail-inline-input"]}
          placeholder="Add an item..."
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addItem())}
        />
        <button className={styles["wayfarly-tripdetail-inline-add-btn"]} onClick={addItem} aria-label="Add checklist item">
          <Plus size={15} />
        </button>
      </div>
    </div>
  );
}
