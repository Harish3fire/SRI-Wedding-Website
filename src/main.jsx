import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const WEDDING = {
  bride: "Srividhya",
  groom: "Diwakhar",
  dateLabel: "29 October 2026",
  weddingDate: "2026-10-30T08:30:00",
  weddingTime: "7:30 AM",
  weddingVenue: "AARAV WEDDING HALL",
  weddingAddress: "8/24, Pudhu Thottam, Ramasamy Nagar Extension II, Urumandampalayam, Gounder Mills, Coimbatore, Tamil Nadu",
  receptionDate: "29 October 2026",
  receptionTime: "6:30 PM",
  receptionVenue: "AARAV WEDDING HALL",
  receptionAddress: "8/24, Pudhu Thottam, Ramasamy Nagar Extension II, Urumandampalayam, Gounder Mills, Coimbatore, Tamil Nadu",
  brideParents: "Mr.Krishnamoorthy & Mrs.latha",
  groomParents: "Mr.aaa & Mrs.bbb",
  mapUrl: "https://maps.app.goo.gl/iunRucq4UXFk9npf9",
  whatsappNumber: "8105778991"
};

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85",
  blessing: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85",
  family: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?auto=format&fit=crop&w=1200&q=85",
  wedding: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85",
  reception: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=85",
  gallery1: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=85",
  gallery2: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=85",
  gallery3: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=85",
  gallery4: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?auto=format&fit=crop&w=900&q=85"
};

function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      }),
      { threshold: 0.14 }
    );
    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function Countdown() {
  const [time, setTime] = useState(getRemaining());

  function getRemaining() {
    const diff = new Date(WEDDING.weddingDate).getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff / 3600000) % 24),
      minutes: Math.floor((diff / 60000) % 60),
      seconds: Math.floor((diff / 1000) % 60)
    };
  }

  useEffect(() => {
    const id = setInterval(() => setTime(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="countdown">
      {Object.entries(time).map(([key, value]) => (
        <div className="count-box" key={key}>
          <strong>{String(value).padStart(2, "0")}</strong>
          <span>{key}</span>
        </div>
      ))}
    </div>
  );
}

function Section({ id, className = "", children }) {
  return <section id={id} className={`section ${className}`}>{children}</section>;
}

function App() {
  const [opened, setOpened] = useState(false);
  const [music, setMusic] = useState(false);
  const [rsvp, setRsvp] = useState({ name: "", guests: "1", attending: "yes" });

  useReveal();

  const submitRsvp = e => {
    e.preventDefault();
    const status = rsvp.attending === "yes" ? "Yes, I will attend" : "Sorry, I can't attend";
    const text = `Wedding RSVP%0AName: ${encodeURIComponent(rsvp.name)}%0AGuests: ${rsvp.guests}%0AResponse: ${encodeURIComponent(status)}`;
    window.open(`https://wa.me/${WEDDING.whatsappNumber}?text=${text}`, "_blank");
  };

  return (
    <main>
      {!opened && (
        <div className="opening-screen">
          <div className="opening-flower flower-a">✿</div>
          <div className="opening-flower flower-b">❀</div>
          <div className="door-glow" />
          <div className="opening-door">
            <p className="eyebrow">YOU ARE INVITED</p>
            <h1>{WEDDING.groom}<span>&</span>{WEDDING.bride}</h1>
            <p className="opening-date">{WEDDING.dateLabel}</p>
            <button className="gold-button" onClick={() => setOpened(true)}>
              Open Invitation
            </button>
          </div>
        </div>
      )}

      <div className={`site ${opened ? "site-open" : ""}`}>
        <button
          className="music-button"
          onClick={() => setMusic(!music)}
          aria-label="Toggle music"
          title="Add your music file in public/audio/wedding.mp3"
        >
          {music ? "♫" : "♪"}
        </button>

        <Section id="hero" className="hero">
          <div className="hero-image" style={{ backgroundImage: `url(${IMAGES.hero})` }} />
          <div className="hero-overlay" />
          <div className="hero-content reveal">
            <p className="eyebrow">TWO HEARTS • ONE BEAUTIFUL JOURNEY</p>
            <h1>{WEDDING.groom}<span>Weds</span>{WEDDING.bride}</h1>
            <p className="hero-date">{WEDDING.dateLabel}</p>
            <Countdown />
            <a href="#blessing" className="scroll-cue">Scroll to begin ↓</a>
          </div>
          <div className="arch arch-left" />
          <div className="arch arch-right" />
        </Section>

        <Section id="blessing" className="image-section">
          <div className="section-image" style={{ backgroundImage: `url(${IMAGES.blessing})` }} />
          <div className="cream-card reveal">
            <p className="eyebrow">A MOMENT MADE COMPLETE BY YOU</p>
            <h2>With Grateful Hearts</h2>
            <p>
              Some moments become memories because of the people who share them.
              As we step into this beautiful new chapter, we would be honoured
              to have you beside us, blessing our beginning and sharing our joy.
            </p>
            <div className="signature">With love, {WEDDING.groom} & {WEDDING.bride}</div>
          </div>
        </Section>

        <Section id="families" className="paper-section">
          <div className="reveal centered">
            <p className="eyebrow">OUR FAMILIES</p>
            <h2>Two Families, One Celebration</h2>
            <p className="lead">
              With the blessings and love of our families, we invite you to
              celebrate this special day with us.
            </p>
          </div>
          <div className="family-grid">
            <div className="family-card reveal">
              <div className="family-icon">❋</div>
              <p className="eyebrow">BRIDE'S FAMILY</p>
              <h3>{WEDDING.bride}</h3>
              <p>{WEDDING.brideParents}</p>
            </div>
            <div className="family-card reveal">
              <div className="family-icon">❋</div>
              <p className="eyebrow">GROOM'S FAMILY</p>
              <h3>{WEDDING.groom}</h3>
              <p>{WEDDING.groomParents}</p>
            </div>
          </div>
        </Section>

        <Section id="wedding" className="detail-section">
          <div className="detail-photo reveal" style={{ backgroundImage: `url(${IMAGES.wedding})` }} />
          <div className="detail-content reveal">
            <p className="eyebrow">THE WEDDING</p>
            <h2>A Day We Will Remember Forever</h2>
            <div className="detail-list">
              <div><span>DATE</span><strong>{WEDDING.dateLabel}</strong></div>
              <div><span>TIME</span><strong>{WEDDING.weddingTime}</strong></div>
              <div><span>VENUE</span><strong>{WEDDING.weddingVenue}</strong></div>
              <div><span>LOCATION</span><strong>{WEDDING.weddingAddress}</strong></div>
            </div>
            <a className="outline-button" href={WEDDING.mapUrl} target="_blank" rel="noreferrer">
              Open in Google Maps ↗
            </a>
          </div>
        </Section>

        <Section id="reception" className="reception-section">
          <div className="reception-card reveal">
            <p className="eyebrow">THE RECEPTION</p>
            <h2>Celebrate With Us</h2>
            <p className="lead">Come for the ceremony, stay for the celebration.</p>
            <div className="reception-date">{WEDDING.receptionDate}</div>
            <div className="reception-time">{WEDDING.receptionTime}</div>
            <div className="divider">✦</div>
            <h3>{WEDDING.receptionVenue}</h3>
            <p>{WEDDING.receptionAddress}</p>
            <a className="gold-button inline-button" href={WEDDING.mapUrl} target="_blank" rel="noreferrer">
              View Venue
            </a>
          </div>
        </Section>

        <Section id="gallery" className="gallery-section">
          <div className="centered reveal">
            <p className="eyebrow">OUR MOMENTS</p>
            <h2>A Little Gallery</h2>
          </div>
          <div className="gallery-grid">
            {[IMAGES.gallery1, IMAGES.gallery2, IMAGES.gallery3, IMAGES.gallery4].map((src, i) => (
              <img key={src} className={`gallery-img reveal gallery-${i + 1}`} src={src} alt={`Wedding moment ${i + 1}`} />
            ))}
          </div>
        </Section>

        <Section id="video" className="video-section">
          <div className="video-card reveal">
            <div className="video-placeholder">
              <div className="play">▶</div>
              <p>YOUR WEDDING VIDEO</p>
              <small>Replace this block with your MP4 video.</small>
            </div>
            <div className="video-copy">
              <p className="eyebrow">A MEMORY IN MOTION</p>
              <h2>Press Play</h2>
              <p>
                Add your own wedding or pre-wedding video to
                <code>public/video/wedding.mp4</code> and replace the placeholder
                with a normal HTML5 video element.
              </p>
            </div>
          </div>
        </Section>

        <Section id="rsvp" className="rsvp-section">
          <div className="rsvp-card reveal">
            <p className="eyebrow">RSVP</p>
            <h2>Will You Join Us?</h2>
            <p className="lead">Please let us know. We would love to celebrate with you.</p>
            <form onSubmit={submitRsvp}>
              <input
                required
                placeholder="Your name"
                value={rsvp.name}
                onChange={e => setRsvp({ ...rsvp, name: e.target.value })}
              />
              <select value={rsvp.guests} onChange={e => setRsvp({ ...rsvp, guests: e.target.value })}>
                {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} guest{n > 1 ? "s" : ""}</option>)}
              </select>
              <div className="radio-row">
                <label><input type="radio" checked={rsvp.attending === "yes"} onChange={() => setRsvp({ ...rsvp, attending: "yes" })} /> I'll be there</label>
                <label><input type="radio" checked={rsvp.attending === "no"} onChange={() => setRsvp({ ...rsvp, attending: "no" })} /> Can't make it</label>
              </div>
              <button className="gold-button" type="submit">Send RSVP on WhatsApp</button>
            </form>
          </div>
        </Section>

        <footer className="footer">
          <p className="eyebrow">WITH LOVE</p>
          <h2>{WEDDING.groom} & {WEDDING.bride}</h2>
          <p>{WEDDING.dateLabel}</p>
          <a href="#hero">Back to top ↑</a>
        </footer>
      </div>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
