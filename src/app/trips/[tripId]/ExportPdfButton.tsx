"use client";

import { useState } from "react";
import { FileDown } from "lucide-react";
import { exportItineraryPdf } from "@/lib/exportItineraryPdf";
import styles from "./detail.module.css";

type Props = {
  title: string;
  destination: string;
  country: string;
  startDate: string;
  endDate: string;
  currency: string;
  budgetTotal: number;
  budgetSpent: number;
  itinerary: { day: number; activities: { time: string; title: string }[] }[];
  checklist: { text: string; completed: boolean }[];
  notes: string;
};

export default function ExportPdfButton(props: Props) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      // Give the button state a beat to render before the (synchronous, sometimes
      // heavy) PDF generation blocks the main thread.
      await new Promise((r) => setTimeout(r, 30));
      exportItineraryPdf(props);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button className={styles["wayfarly-tripdetail-export-btn"]} onClick={handleExport} disabled={isExporting}>
      <FileDown size={14} /> {isExporting ? "Preparing PDF..." : "Export as PDF"}
    </button>
  );
}
