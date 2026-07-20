"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Compass,
  Search,
  Sun,
  Moon,
  Menu,
  X,
  ChevronDown,
  MapPinned,
  Wallet,
  CalendarRange,
  Images,
  ClipboardList,
  UserRound,
  ShieldCheck,
  LogIn,
  UserPlus,
  KeyRound,
} from "lucide-react";
import Swal from "sweetalert2";
import { useTheme } from "@/context/ThemeContext";
import styles from "./Navbar.module.css";

const featureLinks = [
  { href: "/trips", label: "Trip Planning", desc: "Build day-by-day itineraries", icon: MapPinned },
  { href: "/trips", label: "Budget Tracking", desc: "Know exactly what you'll spend", icon: Wallet },
  { href: "/dashboard", label: "Itineraries", desc: "Morning to evening, sorted", icon: CalendarRange },
  { href: "/trips", label: "Travel Memories", desc: "Galleries for every trip", icon: Images },
];

const productLinks = [
  { href: "/trips", label: "My Trips", icon: MapPinned },
  { href: "/dashboard", label: "Dashboard", icon: ClipboardList },
];

function warnRestricted(kind: "Login" | "Sign up") {
  Swal.fire({
    icon: "warning",
    title: "Restricted area",
    text: `Admin ${kind.toLowerCase()} is reserved for authenticated Wayfarly staff only. Unauthorized access attempts are logged.`,
    confirmButtonText: "Understood",
    confirmButtonColor: "#c9932c",
    background: "var(--surface)",
    color: "var(--foreground)",
  });
}

export default function Navbar() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className={styles["wayfarly-navbar-root"]}>
      <div className={styles["wayfarly-navbar-inner"]}>
        <Link href="/" className={styles["wayfarly-navbar-logo"]}>
          <span className={styles["wayfarly-navbar-logo-mark"]}>
            <Compass strokeWidth={2.5} />
          </span>
          Wayfarly
        </Link>

        <nav className={styles["wayfarly-navbar-links"]} aria-label="Primary">
          <div className={styles["wayfarly-navbar-dropdown-group"]}>
            <button className={styles["wayfarly-navbar-link"]} aria-haspopup="true">
              Features
              <ChevronDown size={15} className={styles["wayfarly-navbar-link-chevron"]} />
            </button>
            <div className={styles["wayfarly-navbar-dropdown-panel"]} role="menu">
              {featureLinks.map((item) => (
                <Link key={item.label} href={item.href} className={styles["wayfarly-navbar-dropdown-item"]}>
                  <span className={styles["wayfarly-navbar-dropdown-icon"]}>
                    <item.icon size={17} />
                  </span>
                  <span>
                    <span className={styles["wayfarly-navbar-dropdown-title"]}>{item.label}</span>
                    <span className={styles["wayfarly-navbar-dropdown-desc"]}>{item.desc}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className={styles["wayfarly-navbar-dropdown-group"]}>
            <button className={styles["wayfarly-navbar-link"]} aria-haspopup="true">
              Product
              <ChevronDown size={15} className={styles["wayfarly-navbar-link-chevron"]} />
            </button>
            <div className={styles["wayfarly-navbar-dropdown-panel"]} role="menu" style={{ minWidth: 220 }}>
              {productLinks.map((item) => (
                <Link key={item.label} href={item.href} className={styles["wayfarly-navbar-dropdown-item"]}>
                  <span className={styles["wayfarly-navbar-dropdown-icon"]}>
                    <item.icon size={17} />
                  </span>
                  <span className={styles["wayfarly-navbar-dropdown-title"]}>{item.label}</span>
                </Link>
              ))}

              {/* nested dropdown-within-dropdown, as requested */}
              <div className={styles["wayfarly-navbar-submenu-group"]}>
                <div className={styles["wayfarly-navbar-dropdown-item"]}>
                  <span className={styles["wayfarly-navbar-dropdown-icon"]}>
                    <UserRound size={17} />
                  </span>
                  <span className={styles["wayfarly-navbar-dropdown-title"]}>Account</span>
                  <ChevronDown size={14} style={{ marginLeft: "auto", opacity: 0.6 }} />
                </div>
                <div className={styles["wayfarly-navbar-submenu-panel"]} role="menu">
                  <Link href="/profile" className={styles["wayfarly-navbar-dropdown-item"]}>
                    <span className={styles["wayfarly-navbar-dropdown-title"]}>Profile</span>
                  </Link>
                  <Link href="/settings" className={styles["wayfarly-navbar-dropdown-item"]}>
                    <span className={styles["wayfarly-navbar-dropdown-title"]}>Settings</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Link href="/trips" className={styles["wayfarly-navbar-link"]}>
            Explore Trips
          </Link>
        </nav>

        <div className={styles["wayfarly-navbar-actions"]}>
          <div className={styles["wayfarly-navbar-search-wrap"]}>
            <Search size={15} className={styles["wayfarly-navbar-search-icon"]} />
            <input
              className={styles["wayfarly-navbar-search-input"]}
              type="search"
              placeholder="Search trips..."
              aria-label="Search trips"
            />
          </div>

          <button
            className={styles["wayfarly-navbar-icon-btn"]}
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Auth dropdown */}
          <div className={styles["wayfarly-navbar-dropdown-group"]}>
            <button className={styles["wayfarly-navbar-cta"]} aria-haspopup="true">
              Account
              <ChevronDown size={14} />
            </button>
            <div className={styles["wayfarly-navbar-dropdown-panel"]} style={{ right: 0, left: "auto" }} role="menu">
              <Link href="/login" className={styles["wayfarly-navbar-dropdown-item"]}>
                <span className={styles["wayfarly-navbar-dropdown-icon"]}>
                  <LogIn size={17} />
                </span>
                <span className={styles["wayfarly-navbar-dropdown-title"]}>Log in</span>
              </Link>
              <Link href="/register" className={styles["wayfarly-navbar-dropdown-item"]}>
                <span className={styles["wayfarly-navbar-dropdown-icon"]}>
                  <UserPlus size={17} />
                </span>
                <span className={styles["wayfarly-navbar-dropdown-title"]}>Sign up</span>
              </Link>
              <div style={{ height: 1, background: "var(--border-color)", margin: "0.4rem 0.2rem" }} />
              <button className={styles["wayfarly-navbar-dropdown-item"]} onClick={() => warnRestricted("Login")}>
                <span className={styles["wayfarly-navbar-dropdown-icon"]}>
                  <ShieldCheck size={17} />
                </span>
                <span>
                  <span className={styles["wayfarly-navbar-dropdown-title"]}>Admin login</span>
                  <span className={styles["wayfarly-navbar-dropdown-desc"]}>Staff only</span>
                </span>
              </button>
              <button className={styles["wayfarly-navbar-dropdown-item"]} onClick={() => warnRestricted("Sign up")}>
                <span className={styles["wayfarly-navbar-dropdown-icon"]}>
                  <KeyRound size={17} />
                </span>
                <span>
                  <span className={styles["wayfarly-navbar-dropdown-title"]}>Admin sign up</span>
                  <span className={styles["wayfarly-navbar-dropdown-desc"]}>Invite only</span>
                </span>
              </button>
            </div>
          </div>

          <button
            className={styles["wayfarly-navbar-burger"]}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      <div className={styles["wayfarly-navbar-mobile-panel"]} data-open={mobileOpen}>
        <div className={styles["wayfarly-navbar-mobile-inner"]}>
          <div className={styles["wayfarly-navbar-search-wrap"]} style={{ display: "flex", width: "100%" }}>
            <Search size={15} className={styles["wayfarly-navbar-search-icon"]} />
            <input
              className={styles["wayfarly-navbar-search-input"]}
              style={{ width: "100%" }}
              type="search"
              placeholder="Search trips..."
            />
          </div>
          <span className={styles["wayfarly-navbar-mobile-group-title"]}>Explore</span>
          <Link href="/trips" className={styles["wayfarly-navbar-mobile-link"]} onClick={() => setMobileOpen(false)}>
            My Trips
          </Link>
          <Link href="/dashboard" className={styles["wayfarly-navbar-mobile-link"]} onClick={() => setMobileOpen(false)}>
            Dashboard
          </Link>
          <Link href="/profile" className={styles["wayfarly-navbar-mobile-link"]} onClick={() => setMobileOpen(false)}>
            Profile
          </Link>
          <span className={styles["wayfarly-navbar-mobile-group-title"]}>Account</span>
          <Link href="/login" className={styles["wayfarly-navbar-mobile-link"]} onClick={() => setMobileOpen(false)}>
            Log in
          </Link>
          <Link href="/register" className={styles["wayfarly-navbar-mobile-link"]} onClick={() => setMobileOpen(false)}>
            Sign up
          </Link>
          <button
            className={styles["wayfarly-navbar-mobile-link"]}
            style={{ textAlign: "left" }}
            onClick={() => warnRestricted("Login")}
          >
            Admin login
          </button>
          <button
            className={styles["wayfarly-navbar-mobile-link"]}
            style={{ textAlign: "left" }}
            onClick={() => warnRestricted("Sign up")}
          >
            Admin sign up
          </button>
        </div>
      </div>
    </header>
  );
}
