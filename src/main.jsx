import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const WEDDING = {
  bride: "Srividhya",
  groom: "Diwakar",
  dateLabel: "29 October 2026",
  weddingDate: "2026-10-29T09:30:00",
  weddingTime: "9:30 AM",
  weddingVenue: "AARAV Wedding Hall",
  weddingAddress: "8/24, pudhu thottam, Ramasamy Nagar Extension II, Urumandampalayam, Gounder Mills, Coimbatore, Tamil Nadu 641029",
  receptionDate: "29 October 2026",
  receptionTime: "6:30 PM",
  receptionVenue: "Sri Lakshmi Mahal",
  receptionAddress: "8/24, pudhu thottam, Ramasamy Nagar Extension II, Urumandampalayam, Gounder Mills, Coimbatore, Tamil Nadu 641029",
  brideParents: "Mr.Krishnamoorthy & Mrs. Latha",
  groomParents: "Mr. & Mrs. Groom's Parents",
  mapUrl: "https://maps.app.goo.gl/1z6XK4kEfS7jFKqaA",
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

function FlowerShower() {
  const petals = Array.from({ length: 34 }, (_, i) => ({
    id: i,
    left: `${(i * 29) % 101}%`,
    delay: `${-((i * 1.73) % 10)}s`,
    duration: `${7 + ((i * 13) % 7)}s`,
    size: `${12 + ((i * 17) % 13)}px`,
    drift: `${-55 + ((i * 31) % 111)}px`,
    rotate: `${(i * 47) % 360}deg`,
  }));

  return (
    <div className="flower-shower" aria-hidden="true">
      {petals.map(petal => (
        <span
          key={petal.id}
          className="falling-flower"
          style={{
            left: petal.left,
            animationDelay: petal.delay,
            animationDuration: petal.duration,
            fontSize: petal.size,
            ['--drift']: petal.drift,
            ['--rotate']: petal.rotate,
          }}
        >
          {petal.id % 3 === 0 ? '✿' : petal.id % 3 === 1 ? '❀' : '✽'}
        </span>
      ))}
    </div>
  );
}

function Section({ id, className = "", children }) {
  return <section id={id} className={`section ${className}`}>{children}</section>;
}

function App() {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [music, setMusic] = useState(false);
  const [rsvp, setRsvp] = useState({ name: "", guests: "1", attending: "yes" });

  useReveal();

  const openInvitation = () => {
    if (opening || opened) return;
    setOpening(true);

    const audio = document.getElementById("wedding-music");
    if (audio) {
      audio.volume = 0.55;
      audio.play().then(() => setMusic(true)).catch(() => {});
    }

    window.setTimeout(() => {
      setOpened(true);
      setOpening(false);
    }, 1900);
  };

  const toggleMusic = () => {
    const audio = document.getElementById("wedding-music");
    if (!audio) return;
    if (music) {
      audio.pause();
      setMusic(false);
    } else {
      audio.play().then(() => setMusic(true)).catch(() => {});
    }
  };

  const submitRsvp = e => {
    e.preventDefault();
    const status = rsvp.attending === "yes" ? "Yes, I will attend" : "Sorry, I can't attend";
    const text = `Wedding RSVP%0AName: ${encodeURIComponent(rsvp.name)}%0AGuests: ${rsvp.guests}%0AResponse: ${encodeURIComponent(status)}`;
    window.open(`https://wa.me/${WEDDING.whatsappNumber}?text=${text}`, "_blank");
  };

  return (
    <main>
      <audio id="wedding-music" loop preload="auto">
        <source src="/audio/wedding.mp3" type="audio/mpeg" />
      </audio>

      <FlowerShower />

      {!opened && (
        <div className={`opening-screen ${opening ? "opening" : ""}`}>
          <div className="opening-aura" />
          <div className="opening-mandala mandala-one">✽</div>
          <div className="opening-mandala mandala-two">✽</div>

          <div className="opening-shrine">
            <div className="opening-garland garland-left">❀ ❀ ❀ ❀</div>
            <div className="opening-garland garland-right">❀ ❀ ❀ ❀</div>

            <div className="opening-content">
              <p className="eyebrow">YOU ARE INVITED</p>
              <h1>{WEDDING.groom}<span>&</span>{WEDDING.bride}</h1>
              <p className="opening-date">{WEDDING.dateLabel}</p>
              <div className="opening-ornament">✦</div>
              <button className="gold-button opening-button" onClick={openInvitation} disabled={opening}>
                {opening ? "Opening…" : "Open Invitation"}
              </button>
            </div>

            <div className="door-panel door-left" />
            <div className="door-panel door-right" />

            <div className="door-lamp lamp-left">
              <div className="lamp-flame" />
              <div className="lamp-bowl" />
            </div>
            <div className="door-lamp lamp-right">
              <div className="lamp-flame" />
              <div className="lamp-bowl" />
            </div>

            <div className="door-floor-glow" />
          </div>

          <p className="opening-hint">Tap to open the doors</p>
        </div>
      )}

      <div className={`site ${opened ? "site-open" : ""}`}>
        <button
          className="music-button"
          onClick={toggleMusic}
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
