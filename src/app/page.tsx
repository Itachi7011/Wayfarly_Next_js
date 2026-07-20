import Link from "next/link";
import { ArrowRight, Compass, MapPinned, Wallet, CalendarRange, Images } from "lucide-react";
import styles from "./page.module.css";
import { trips } from "@/data/trips";

import Image from "next/image";

import kyotoImage from "./Kyoto.jpg";
import lisbonImage from "./lisbon.jpg";
import elChaltenImage from "./El Chalten.jpg";
import marrakechImage from "./Marrakech.jpg";

const tripImages: Record<string, StaticImageData> = {
  Kyoto: kyotoImage,
  Lisbon: lisbonImage,
  "El Chaltén": elChaltenImage,
  Marrakech: marrakechImage,
};

export default function LandingPage() {
  return (
    <>
      <section className={styles["wayfarly-landing-hero"]}>
        <div>
          <span className={styles["wayfarly-landing-eyebrow"]}>
            <Compass size={13} /> Built for people who plan properly
          </span>
          <h1 className={styles["wayfarly-landing-headline"]}>
            Plan your journeys.
            <br />
            Organize every <em>adventure</em>.
          </h1>
          <p className={styles["wayfarly-landing-subtext"]}>
            Wayfarly keeps every trip&apos;s itinerary, budget, packing list and photos in one calm
            workspace — so you spend less time in spreadsheets and more time actually going places.
          </p>
          <div className={styles["wayfarly-landing-cta-row"]}>
            <Link href="/trips/create" className={styles["wayfarly-landing-cta-primary"]}>
              Create a Trip <ArrowRight size={16} />
            </Link>
            <Link href="/trips" className={styles["wayfarly-landing-cta-secondary"]}>
              Explore Features
            </Link>
          </div>
          <div className={styles["wayfarly-landing-stat-row"]}>
            <div>
              <div className={styles["wayfarly-landing-stat-num"]}>4</div>
              <div className={styles["wayfarly-landing-stat-label"]}>Trips tracked</div>
            </div>
            <div>
              <div className={styles["wayfarly-landing-stat-num"]}>₹5.8L</div>
              <div className={styles["wayfarly-landing-stat-label"]}>Budget managed</div>
            </div>
            <div>
              <div className={styles["wayfarly-landing-stat-num"]}>12</div>
              <div className={styles["wayfarly-landing-stat-label"]}>Countries planned</div>
            </div>
          </div>
        </div>

        <div className={styles["wayfarly-landing-hero-visual"]}>
          <svg className={styles["wayfarly-landing-route-svg"]} viewBox="0 0 400 400" fill="none">
            <path
              className={styles["wayfarly-landing-route-path"]}
              d="M40 320 C 100 260, 60 180, 140 150 S 260 60, 340 70"
            />
            <circle cx="40" cy="320" r="5" fill="var(--wf-teal)" />
            <circle cx="140" cy="150" r="5" fill="var(--wf-coral)" />
            <circle cx="340" cy="70" r="5" fill="var(--wf-brass)" />
          </svg>
          <div className={styles["wayfarly-landing-pin-card"]} style={{ left: "6%", bottom: "16%" }}>
            📍 Lisbon
          </div>
          <div
            className={styles["wayfarly-landing-pin-card"]}
            style={{ left: "34%", top: "36%", animationDelay: "1.2s" }}
          >
            📍 Kyoto
          </div>
          <div
            className={styles["wayfarly-landing-pin-card"]}
            style={{ right: "8%", top: "12%", animationDelay: "2.1s" }}
          >
            📍 El Chaltén
          </div>
        </div>
      </section>

      <section className={styles["wayfarly-landing-section"]}>
        <div className={styles["wayfarly-landing-section-head"]}>
          <h2 className={styles["wayfarly-landing-section-title"]}>Everything a trip needs, sorted</h2>
          <p className={styles["wayfarly-landing-section-sub"]}>
            Four tools, one workspace — built so planning a trip feels as good as taking it.
          </p>
        </div>
        <div className={styles["wayfarly-landing-feature-grid"]}>
          {[
            { icon: MapPinned, title: "Trip Planning", desc: "Destinations, dates and cover photos, organized per trip." },
            { icon: Wallet, title: "Budget Tracking", desc: "Set a total, log spend, and watch what's left in real time." },
            { icon: CalendarRange, title: "Itinerary Management", desc: "Morning, afternoon, evening — day by day, laid out clearly." },
            { icon: Images, title: "Travel Memories", desc: "A gallery for every trip, so the photos don't get lost." },
          ].map((f) => (
            <div key={f.title} className={styles["wayfarly-landing-feature-card"]}>
              <div className={styles["wayfarly-landing-feature-icon"]}>
                <f.icon size={20} />
              </div>
              <div className={styles["wayfarly-landing-feature-title"]}>{f.title}</div>
              <div className={styles["wayfarly-landing-feature-desc"]}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles["wayfarly-landing-section"]}>
        <div className={styles["wayfarly-landing-section-head"]}>
          <h2 className={styles["wayfarly-landing-section-title"]}>Boarding passes, not to-do lists</h2>
          <p className={styles["wayfarly-landing-section-sub"]}>A look at trips already in the system.</p>
        </div>
        <div className={styles["wayfarly-landing-pass-row"]}>
          {trips.map((trip) => (
            <Link key={trip.id} href={`/trips/${trip.slug}`} className={styles["wayfarly-landing-pass-card"]}>
             <div className={styles["wayfarly-landing-pass-cover"]}>
  <Image
    src={tripImages[trip.destination]}
    alt={trip.destination}
    fill
    sizes="(max-width: 768px) 100vw, 300px"
    style={{
      objectFit: "cover",
    }}
  />
</div>
              <div className={styles["wayfarly-landing-pass-body"]}>
                <div className={styles["wayfarly-landing-pass-dest"]}>{trip.destination}</div>
                <div className={styles["wayfarly-landing-pass-perforation"]} />
                <div className={styles["wayfarly-landing-pass-meta"]}>
                  <span>{trip.startDate}</span>
                  <span>{trip.status.toUpperCase()}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles["wayfarly-landing-cta-band"]}>
        <div className={styles["wayfarly-landing-cta-band-title"]}>
          Your next trip deserves better than seven open tabs.
        </div>
        <Link href="/register" className={styles["wayfarly-landing-cta-primary"]}>
          Get Started Free <ArrowRight size={16} />
        </Link>
      </section>
    </>
  );
}
