import { jsPDF } from "jspdf";

type ExportableTrip = {
  title: string;
  destination: string;
  country?: string;
  startDate: string;
  endDate: string;
  currency: string;
  budgetTotal: number;
  budgetSpent: number;
  itinerary: { day: number; activities: { time: string; title: string }[] }[];
  checklist: { text: string; completed: boolean }[];
  notes?: string;
};

const INK: [number, number, number] = [13, 27, 42];
const BRASS: [number, number, number] = [201, 147, 44];
const CORAL: [number, number, number] = [255, 107, 74];
const MUTED: [number, number, number] = [110, 118, 128];

const MARGIN = 18;
const PAGE_WIDTH = 210; // A4 in mm
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

export function exportItineraryPdf(trip: ExportableTrip) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = 0;

  // Header band
  doc.setFillColor(...INK);
  doc.rect(0, 0, PAGE_WIDTH, 40, "F");
  doc.setFillColor(...BRASS);
  doc.rect(0, 40, PAGE_WIDTH, 1.4, "F");

  doc.setTextColor(...BRASS);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("WAYFARLY", MARGIN, 14);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.text(trip.title, MARGIN, 26);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.5);
  doc.setTextColor(230, 230, 230);
  const dateRange = `${trip.destination}${trip.country ? ", " + trip.country : ""}  •  ${trip.startDate} to ${trip.endDate}`;
  doc.text(dateRange, MARGIN, 34);

  y = 52;

  // Budget summary strip
  const remaining = trip.budgetTotal - trip.budgetSpent;
  const budgetCols: [string, string, [number, number, number]][] = [
    ["Total", `${trip.currency}${trip.budgetTotal.toLocaleString()}`, INK],
    ["Spent", `${trip.currency}${trip.budgetSpent.toLocaleString()}`, INK],
    ["Remaining", `${trip.currency}${remaining.toLocaleString()}`, remaining >= 0 ? [31, 138, 128] : CORAL],
  ];
  const colWidth = CONTENT_WIDTH / 3;
  budgetCols.forEach(([label, value, color], i) => {
    const x = MARGIN + i * colWidth;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(...MUTED);
    doc.text(label.toUpperCase(), x, y);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(...color);
    doc.text(value, x, y + 7);
  });

  y += 16;
  doc.setDrawColor(225, 220, 210);
  doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);
  y += 10;

  const ensureSpace = (needed: number) => {
    if (y + needed > 280) {
      doc.addPage();
      y = MARGIN;
    }
  };

  // Itinerary
  sectionHeading(doc, "Itinerary", y);
  y += 9;

  if (trip.itinerary.length === 0) {
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9.5);
    doc.setTextColor(...MUTED);
    doc.text("No itinerary added yet.", MARGIN, y);
    y += 8;
  }

  trip.itinerary.forEach((day) => {
    ensureSpace(14);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(...BRASS);
    doc.text(`Day ${day.day}`, MARGIN, y);
    y += 6.5;

    day.activities.forEach((a) => {
      ensureSpace(7);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(...MUTED);
      doc.text(a.time.toUpperCase(), MARGIN + 2, y);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(...INK);
      doc.text(a.title, MARGIN + 30, y);
      y += 6;
    });

    y += 3;
  });

  y += 4;
  ensureSpace(20);

  // Packing checklist
  sectionHeading(doc, "Packing Checklist", y);
  y += 9;

  if (trip.checklist.length === 0) {
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9.5);
    doc.setTextColor(...MUTED);
    doc.text("Nothing on the list yet.", MARGIN, y);
    y += 8;
  }

  trip.checklist.forEach((item) => {
    ensureSpace(7);
    doc.setDrawColor(...(item.completed ? BRASS : MUTED));
    doc.setLineWidth(0.4);
    doc.rect(MARGIN, y - 3.2, 3.2, 3.2);
    if (item.completed) {
      doc.setFillColor(...BRASS);
      doc.rect(MARGIN + 0.5, y - 2.7, 2.2, 2.2, "F");
    }

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(...INK);
    doc.text(item.text, MARGIN + 6.5, y);
    y += 6.5;
  });

  if (trip.notes) {
    y += 5;
    ensureSpace(20);
    sectionHeading(doc, "Notes", y);
    y += 9;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(...INK);
    const lines = doc.splitTextToSize(trip.notes, CONTENT_WIDTH);
    lines.forEach((line: string) => {
      ensureSpace(6);
      doc.text(line, MARGIN, y);
      y += 5.5;
    });
  }

  // Footer on every page
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...MUTED);
    doc.text(
      `Exported from Wayfarly on ${new Date().toLocaleDateString()}`,
      MARGIN,
      290
    );
    doc.text(`${i} / ${pageCount}`, PAGE_WIDTH - MARGIN - 8, 290);
  }

  const fileSafeName = trip.destination.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  doc.save(`wayfarly-${fileSafeName}-itinerary.pdf`);
}

function sectionHeading(doc: jsPDF, text: string, y: number) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(...INK);
  doc.text(text, MARGIN, y);
}
