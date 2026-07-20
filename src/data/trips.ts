export type ItineraryActivity = {
  id: string;
  time: "Morning" | "Afternoon" | "Evening";
  title: string;
};

export type ItineraryDay = {
  day: number;
  activities: ItineraryActivity[];
};

export type ChecklistItem = {
  id: string;
  text: string;
  completed: boolean;
};

export type GalleryImage = {
  url: string;
  caption: string;
};

export type Trip = {
  id: string;
  slug: string;
  title: string;
  destination: string;
  country: string;
  description: string;
  startDate: string;
  endDate: string;
  budgetTotal: number;
  budgetSpent: number;
  currency: string;
  status: "Upcoming" | "Completed" | "Cancelled";
  coverColor: string; // used for the illustrated cover gradient
  itinerary: ItineraryDay[];
  checklist: ChecklistItem[];
  gallery: GalleryImage[];
  notes: string;
  isPublic: boolean;
};

export const trips: Trip[] = [
  {
    id: "t1",
    slug: "kyoto-autumn-wander",
    title: "Kyoto Autumn Wander",
    destination: "Kyoto",
    country: "Japan",
    description:
      "Ten days chasing red maple leaves through temples, tea houses and quiet backstreets.",
    startDate: "2026-11-02",
    endDate: "2026-11-12",
    budgetTotal: 185000,
    budgetSpent: 64200,
    currency: "₹",
    status: "Upcoming",
    coverColor: "linear-gradient(135deg,#c9932c,#ff6b4a)",
    itinerary: [
      {
        day: 1,
        activities: [
          { id: "kt-d1-1", time: "Morning", title: "Arrive at Kansai Airport, train to Kyoto" },
          { id: "kt-d1-2", time: "Afternoon", title: "Check in, walk Gion district" },
          { id: "kt-d1-3", time: "Evening", title: "Kaiseki dinner near Pontocho" },
        ],
      },
      {
        day: 2,
        activities: [
          { id: "kt-d2-1", time: "Morning", title: "Fushimi Inari torii gate hike" },
          { id: "kt-d2-2", time: "Afternoon", title: "Tofuku-ji maple gardens" },
          { id: "kt-d2-3", time: "Evening", title: "Nishiki Market food crawl" },
        ],
      },
    ],
    checklist: [
      { id: "c1", text: "Passport", completed: true },
      { id: "c2", text: "JR Pass", completed: true },
      { id: "c3", text: "Camera + spare batteries", completed: false },
      { id: "c4", text: "Layered jacket", completed: false },
    ],
    gallery: [],
    notes: "Book the Arashiyama bamboo grove for sunrise — much quieter.",
    isPublic: true,
  },
  {
    id: "t2",
    slug: "lisbon-coastline-loop",
    title: "Lisbon Coastline Loop",
    destination: "Lisbon",
    country: "Portugal",
    description: "Pastel streets, custard tarts, and a coastal drive out to Sintra and Cascais.",
    startDate: "2026-05-14",
    endDate: "2026-05-21",
    budgetTotal: 92000,
    budgetSpent: 92000,
    currency: "₹",
    status: "Completed",
    coverColor: "linear-gradient(135deg,#1f8a80,#c9932c)",
    itinerary: [
      {
        day: 1,
        activities: [
          { id: "ls-d1-1", time: "Morning", title: "Alfama tram ride" },
          { id: "ls-d1-2", time: "Afternoon", title: "Miradouro viewpoints" },
          { id: "ls-d1-3", time: "Evening", title: "Fado dinner show" },
        ],
      },
    ],
    checklist: [
      { id: "c1", text: "Passport", completed: true },
      { id: "c2", text: "Rental car voucher", completed: true },
    ],
    gallery: [],
    notes: "Drive to Cabo da Roca before noon for empty cliffs.",
    isPublic: true,
  },
  {
    id: "t3",
    slug: "patagonia-trail-crossing",
    title: "Patagonia Trail Crossing",
    destination: "El Chaltén",
    country: "Argentina",
    description: "Multi-day trekking through granite spires and glacial lakes.",
    startDate: "2027-01-10",
    endDate: "2027-01-24",
    budgetTotal: 240000,
    budgetSpent: 18000,
    currency: "₹",
    status: "Upcoming",
    coverColor: "linear-gradient(135deg,#0d1b2a,#1f8a80)",
    itinerary: [],
    checklist: [
      { id: "c1", text: "Hiking boots (worn in)", completed: false },
      { id: "c2", text: "Travel insurance", completed: true },
    ],
    gallery: [],
    notes: "",
    isPublic: false,
  },
  {
    id: "t4",
    slug: "marrakech-souks-and-sands",
    title: "Marrakech: Souks & Sands",
    destination: "Marrakech",
    country: "Morocco",
    description: "Souk markets, riads and a night under the stars in the Agafay desert.",
    startDate: "2025-09-03",
    endDate: "2025-09-09",
    budgetTotal: 68000,
    budgetSpent: 71000,
    currency: "₹",
    status: "Cancelled",
    coverColor: "linear-gradient(135deg,#ff6b4a,#0d1b2a)",
    itinerary: [],
    checklist: [],
    gallery: [],
    notes: "Postponed — rebooking for spring.",
    isPublic: false,
  },
];

export const dashboardStats = {
  totalTrips: trips.length,
  upcoming: trips.filter((t) => t.status === "Upcoming").length,
  completed: trips.filter((t) => t.status === "Completed").length,
  totalBudgetTracked: trips.reduce((sum, t) => sum + t.budgetTotal, 0),
};

export const recentActivity = [
  { id: "a1", text: "Added Fushimi Inari to Kyoto itinerary", time: "2h ago" },
  { id: "a2", text: "Marked 'JR Pass' as packed for Kyoto Autumn Wander", time: "5h ago" },
  { id: "a3", text: "Updated budget for Patagonia Trail Crossing", time: "1d ago" },
  { id: "a4", text: "Uploaded 6 photos from Lisbon Coastline Loop", time: "3d ago" },
];
