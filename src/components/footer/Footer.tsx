"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Compass, Globe, Mail, MessageCircle, Share2, ChevronUp, ArrowUp } from "lucide-react";
import styles from "./Footer.module.css";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "My Trips", href: "/trips" },
      { label: "Create a Trip", href: "/trips/create" },
      { label: "Profile", href: "/profile" },
    ],
  },
  {
    title: "Features",
    links: [
      { label: "Itinerary Builder", href: "/trips" },
      { label: "Budget Tracker", href: "/trips" },
      { label: "Packing Checklists", href: "/trips" },
      { label: "Travel Gallery", href: "/trips" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Wayfarly", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/careers" },
      { label: "Press Kit", href: "/press" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "GitHub", href: "https://github.com" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Status", href: "/status" },
    ],
  },
];

export default function Footer() {
  const [collapsed, setCollapsed] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 480);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer className={styles["wayfarly-footer-root"]}>
      <div className={styles["wayfarly-footer-toggle-row"]}>
        <button
          className={styles["wayfarly-footer-collapse-btn"]}
          onClick={() => setCollapsed((v) => !v)}
          aria-expanded={!collapsed}
        >
          {collapsed ? "Expand footer" : "Collapse footer"}
          <ChevronUp size={14} className={styles["wayfarly-footer-collapse-icon"]} data-collapsed={collapsed} />
        </button>
      </div>

      <div className={styles["wayfarly-footer-body"]} data-collapsed={collapsed}>
        <div className={styles["wayfarly-footer-grid"]}>
          <div>
            <Link href="/" className={styles["wayfarly-footer-brand-logo"]}>
              <span className={styles["wayfarly-footer-brand-mark"]}>
                <Compass size={18} strokeWidth={2.5} />
              </span>
              Wayfarly
            </Link>
            <p className={styles["wayfarly-footer-tagline"]}>
              Plan your journeys. Organize every adventure — itineraries, budgets and memories, in one place.
            </p>
            <div className={styles["wayfarly-footer-social-row"]}>
              <a className={styles["wayfarly-footer-social-btn"]} href="https://github.com" aria-label="GitHub">
                <Globe size={16} />
              </a>
              <a className={styles["wayfarly-footer-social-btn"]} href="mailto:hello@wayfarly.app" aria-label="Email">
                <Mail size={16} />
              </a>
              <a className={styles["wayfarly-footer-social-btn"]} href="https://instagram.com" aria-label="Community">
                <MessageCircle size={16} />
              </a>
              <a className={styles["wayfarly-footer-social-btn"]} href="https://linkedin.com" aria-label="Share">
                <Share2 size={16} />
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <div className={styles["wayfarly-footer-col-title"]}>{col.title}</div>
              <div className={styles["wayfarly-footer-link-list"]}>
                {col.links.map((link) => (
                  <Link key={link.label} href={link.href} className={styles["wayfarly-footer-link"]}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div>
            <div className={styles["wayfarly-footer-col-title"]}>Stay in the loop</div>
            <p className={styles["wayfarly-footer-tagline"]} style={{ marginTop: 0 }}>
              Occasional trip-planning tips. No noise.
            </p>
            <div className={styles["wayfarly-footer-newsletter-row"]}>
              <input
                className={styles["wayfarly-footer-newsletter-input"]}
                type="email"
                placeholder="you@email.com"
                aria-label="Email address"
              />
              <button className={styles["wayfarly-footer-newsletter-btn"]}>Join</button>
            </div>
          </div>
        </div>

        <div className={styles["wayfarly-footer-bottom"]}>
          <span>&copy; {new Date().getFullYear()} Wayfarly. All rights reserved.</span>
          <div className={styles["wayfarly-footer-bottom-links"]}>
            <Link href="/privacy" className={styles["wayfarly-footer-link"]}>
              Privacy
            </Link>
            <Link href="/terms" className={styles["wayfarly-footer-link"]}>
              Terms
            </Link>
            <a href="https://github.com" className={styles["wayfarly-footer-link"]}>
              Github
            </a>
          </div>
        </div>
      </div>

      <button
        className={styles["wayfarly-footer-top-btn"]}
        data-visible={showTop}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        <ArrowUp size={19} />
      </button>
    </footer>
  );
}
