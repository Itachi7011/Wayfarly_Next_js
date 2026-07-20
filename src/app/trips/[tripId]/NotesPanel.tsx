"use client";

import { useState, useTransition } from "react";
import { StickyNote, Check } from "lucide-react";
import { saveTripNotes } from "@/actions/trips";
import styles from "./detail.module.css";

export default function NotesPanel({ tripId, initialNotes }: { tripId: string; initialNotes: string }) {
  const [notes, setNotes] = useState(initialNotes);
  const [savedNotes, setSavedNotes] = useState(initialNotes);
  const [justSaved, setJustSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  const dirty = notes !== savedNotes;

  const save = () => {
    startTransition(async () => {
      await saveTripNotes(tripId, notes);
      setSavedNotes(notes);
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 1800);
    });
  };

  return (
    <div className={styles["wayfarly-tripdetail-panel"]}>
      <div className={styles["wayfarly-tripdetail-panel-title"]}>
        <StickyNote size={17} /> Notes
      </div>
      <textarea
        className={styles["wayfarly-tripdetail-notes-textarea"]}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Anything worth remembering for this trip..."
        rows={4}
      />
      <div className={styles["wayfarly-tripdetail-notes-footer"]}>
        <span className={styles["wayfarly-tripdetail-notes-status"]}>
          {isPending ? "Saving..." : justSaved ? (
            <>
              <Check size={13} /> Saved
            </>
          ) : dirty ? (
            "Unsaved changes"
          ) : (
            ""
          )}
        </span>
        <button
          className={styles["wayfarly-tripdetail-notes-save-btn"]}
          onClick={save}
          disabled={!dirty || isPending}
        >
          Save notes
        </button>
      </div>
    </div>
  );
}
