import type { Metadata } from "next";
import Link from "next/link";
import { LayoutDashboard, MapPinned, UserRound, Settings, Plus } from "lucide-react";
import styles from "./dashboard.module.css";
import { trips, dashboardStats, recentActivity } from "@/data/trips";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your Wayfarly trip overview.",
};

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, active: true },
  { href: "/trips", label: "Trips", icon: MapPinned },
  { href: "/profile", label: "Profile", icon: UserRound },
  { href: "/profile", label: "Settings", icon: Settings },
];

export default function DashboardPage() {
  const upcomingTrips = trips.filter((t) => t.status === "Upcoming");

  return (
    <div className={styles["wayfarly-dash-shell"]}>
      <aside className={styles["wayfarly-dash-sidebar"]}>
        {navItems.map((item) => (
          <Link key={item.label} href={item.href} className={styles["wayfarly-dash-nav-item"]} data-active={item.active}>
            <item.icon size={17} />
            {item.label}
          </Link>
        ))}
      </aside>

      <main className={styles["wayfarly-dash-main"]}>
        <div className={styles["wayfarly-dash-mobile-tabs"]}>
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className={styles["wayfarly-dash-mobile-tab"]}>
              {item.label}
            </Link>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h1 className={styles["wayfarly-dash-heading"]}>Welcome back, Ada</h1>
            <p className={styles["wayfarly-dash-subheading"]}>Here&apos;s where your trips stand today.</p>
          </div>
          <Link href="/trips/create" className={styles["wayfarly-dash-nav-item"]} style={{ background: "var(--wf-brass)", color: "var(--wf-ink)", opacity: 1 }}>
            <Plus size={16} /> New trip
          </Link>
        </div>

        <div className={styles["wayfarly-dash-stat-grid"]}>
          <div className={styles["wayfarly-dash-stat-card"]}>
            <div className={styles["wayfarly-dash-stat-value"]}>{dashboardStats.totalTrips} Trips Planned</div>
            <div className={styles["wayfarly-dash-stat-label"]}>Across all statuses</div>
          </div>
          <div className={styles["wayfarly-dash-stat-card"]}>
            <div className={styles["wayfarly-dash-stat-value"]}>{dashboardStats.upcoming} Upcoming</div>
            <div className={styles["wayfarly-dash-stat-label"]}>Trips on the calendar</div>
          </div>
          <div className={styles["wayfarly-dash-stat-card"]}>
            <div className={styles["wayfarly-dash-stat-value"]}>₹{(dashboardStats.totalBudgetTracked / 1000).toFixed(0)}K</div>
            <div className={styles["wayfarly-dash-stat-label"]}>Total budget tracked</div>
          </div>
        </div>

        <div className={styles["wayfarly-dash-section"]}>
          <div className={styles["wayfarly-dash-section-title"]}>Upcoming Trips</div>
          <div className={styles["wayfarly-dash-trip-list"]}>
            {upcomingTrips.map((trip) => (
              <Link key={trip.id} href={`/trips/${trip.slug}`} className={styles["wayfarly-dash-trip-row"]}>
                <div className={styles["wayfarly-dash-trip-thumb"]} style={{ background: trip.coverColor }} />
                <div>
                  <div className={styles["wayfarly-dash-trip-title"]}>{trip.destination}</div>
                  <div className={styles["wayfarly-dash-trip-meta"]}>{trip.startDate} → {trip.endDate}</div>
                </div>
                <span className={styles["wayfarly-dash-status-pill"]}>{trip.status}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className={styles["wayfarly-dash-section"]}>
          <div className={styles["wayfarly-dash-section-title"]}>Recent Activity</div>
          <div className={styles["wayfarly-dash-activity-list"]}>
            {recentActivity.map((a) => (
              <div key={a.id} className={styles["wayfarly-dash-activity-row"]}>
                <span className={styles["wayfarly-dash-activity-dot"]} />
                {a.text}
                <span className={styles["wayfarly-dash-activity-time"]}>{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
