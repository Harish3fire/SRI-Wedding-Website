import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const WEDDING = {
  // =====================================================
  // 💍 CHANGE YOUR WEDDING CONTENT ONLY IN THIS BLOCK
  // =====================================================

  bride: "Srividhya",
  groom: "Diwakar",

  // Countdown ends exactly at 30 Oct 2026, 8:00 AM IST
  countdownDate: "2026-10-30T08:00:00+05:30",

  // Date shown on the opening screen and hero
  dateLabel: "30 October 2026",

  venue: "AARAV Wedding Hall",

  address:
    "8/24, Pudhu Thottam, Ramasamy Nagar Extension II, Urumandampalayam, Gounder Mills, Coimbatore, Tamil Nadu 641029",

  mapUrl:
    "https://maps.app.goo.gl/1z6XK4kEfS7jFKqaA",

  // =====================================================
  // VIDEO SECTION
  // Change only these values to customize the video section.
  // Put your MP4 inside: public/video/wedding.mp4
  // =====================================================
  video: {
    src: "/video/wedding.mp4",
    eyebrow: "A MEMORY IN MOTION",
    title: "Our Story",
    label: "YOUR WEDDING VIDEO",
    description:
      "Write your own message here. This space can be used for your wedding story, a pre-wedding message, or a personal note to your guests."
  },

  // =====================================================
  // EVENT CARDS
  // Add, remove, or edit events here.
  // =====================================================
  events: [
    {
      day: "29",
      month: "OCT",
      weekday: "THURSDAY",
      icon: "♧",
      type: "EVENT",
      title: "Groom Welcoming",
      time: "5:30 PM – 6:00 PM",
    },

    {
      day: "29",
      month: "OCT",
      weekday: "THURSDAY",
      icon: "◉",
      type: "CEREMONY",
      title: "Reception",
      time: "6:00 PM- 9:00 PM",
    },

    {
      day: "29",
      month: "OCT",
      weekday: "THURSDAY",
      icon: "◉",
      type: "CEREMONY",
      title: "Engagement",
      time: "9:30 PM -10:30PM",
    },

    {
      day: "30",
      month: "OCT",
      weekday: "FRIDAY",
      icon: "❋",
      type: "CEREMONY",
      title: "Wedding/Muhurtham",
      time: "9:15 AM - 10:15 AM",
    }
  ],

  brideParents: "Mr. Krishnamoorthy & Mrs. Latha",
  groomParents: "Mr. Ramana & Mrs. Bhuvaneshwari",
  whatsappNumber: "91+8105778991"
};

const IMAGES = {
  // Put your own files in public/images/ using these names.
  // If you want to keep the sample images, set USE_LOCAL_PHOTOS to false.
  hero: "/images/hero.jpg",
  blessing: "/images/blessing.jpg",
  family: "/images/familyyy.jpg",
  wedding: "/images/wedding.jpg",
  reception: "/images/reception.jpg"
};

const DEMO_IMAGES = {
  hero: "/images/hero.jpg",
  blessing: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85",
  family: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?auto=format&fit=crop&w=1200&q=85",
  wedding: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85",
  reception: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=85"
};

const USE_LOCAL_PHOTOS = true;

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
  const getRemaining = () => {
    const target = new Date(WEDDING.countdownDate).getTime();
    const diff = target - Date.now();

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff / 3600000) % 24),
      minutes: Math.floor((diff / 60000) % 60),
      seconds: Math.floor((diff / 1000) % 60)
    };
  };

  const [time, setTime] = useState(getRemaining);

  useEffect(() => {
    const tick = () => {
      const remaining = getRemaining();
      setTime(remaining);

      if (
        new Date(WEDDING.countdownDate).getTime() - Date.now() <= 0
      ) {
        window.dispatchEvent(new Event("wedding-countdown-finished"));
      }
    };

    tick();
    const id = setInterval(tick, 250);

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


function imageSource(name) {
  return USE_LOCAL_PHOTOS ? IMAGES[name] : DEMO_IMAGES[name];
}

function EventCard({
  day,
  month,
  weekday,
  icon,
  type,
  title,
  time
}) {
  return (
    <article className="event-card reveal">
      <div className="event-date">
        <strong>{day}</strong>
        <span>{month}</span>
        <small>{weekday}</small>
      </div>

      <div className="event-divider" />

      <div className="event-info">
        <div className="event-title-row">
          <span className="event-icon" aria-hidden="true">{icon}</span>

          <div>
            <p className="event-kicker">{type}</p>
            <h3>{title}</h3>
          </div>
        </div>

        <p className="event-time">◷ {time}</p>
      </div>
    </article>
  );
}

function EventsAndVenue() {
  return (
    <Section id="events" className="events-section">
      <div className="events-shell">

        <div className="events-heading reveal">
          <p className="eyebrow">THE CELEBRATION</p>

          <h2>The Wedding</h2>

          <p>
            Join us as the celebrations begin and two hearts become one.
          </p>

          <div className="location-heading">
            <span>LOCATION</span>
            <strong>{WEDDING.venue}</strong>
            <a
              className="location-map-link"
              href={WEDDING.mapUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Get directions to mahal"
            >
              <span className="location-map-icon" aria-hidden="true">➤</span>
              <span>GET DIRECTIONS TO MAHAL</span>
            </a>
          </div>
        </div>

        <div className="events-list">
          {WEDDING.events.map((event, index) => (
            <EventCard
              key={`${event.title}-${index}`}
              day={event.day}
              month={event.month}
              weekday={event.weekday}
              icon={event.icon}
              type={event.type}
              title={event.title}
              time={event.time}
            />
          ))}
        </div>

      </div>
    </Section>
  );
}


function TouchFlowerBursts() {
  const [bursts, setBursts] = useState([]);

  useEffect(() => {
    let nextId = 0;

    const burst = e => {
      if (typeof e.clientX !== "number" || typeof e.clientY !== "number") return;
      const id = `${Date.now()}-${nextId++}`;
      setBursts(current => [...current.slice(-5), { id, x: e.clientX, y: e.clientY }]);
      window.setTimeout(() => {
        setBursts(current => current.filter(item => item.id !== id));
      }, 1150);
    };

    window.addEventListener("pointerdown", burst, { passive: true });
    return () => window.removeEventListener("pointerdown", burst);
  }, []);

  return (
    <div className="touch-bursts" aria-hidden="true">
      {bursts.map(burst => (
        <div
          className="touch-burst"
          key={burst.id}
          style={{ left: burst.x, top: burst.y }}
        >
          <span>✿</span>
          <span>❀</span>
          <span>✽</span>
          <span>❁</span>
          <span>✿</span>
          <i />
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


function Fireworks() {
  const canvasRef = React.useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame;
    let launchTimer;
    let running = true;
    const rockets = [];
    const particles = [];

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = Math.floor(window.innerWidth * ratio);
      canvas.height = Math.floor(window.innerHeight * ratio);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const launch = () => {
      rockets.push({
        x: window.innerWidth * (0.15 + Math.random() * 0.7),
        y: window.innerHeight + 20,
        targetY: window.innerHeight * (0.16 + Math.random() * 0.34),
        speed: 8 + Math.random() * 3,
        hue: Math.random() * 360
      });
    };

    const explode = rocket => {
      const count = 70 + Math.floor(Math.random() * 45);

      for (let i = 0; i < count; i += 1) {
        const angle = (Math.PI * 2 * i) / count;
        const speed = 1.5 + Math.random() * 5.5;

        particles.push({
          x: rocket.x,
          y: rocket.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          decay: 0.012 + Math.random() * 0.012,
          size: 1 + Math.random() * 2,
          hue: rocket.hue + Math.random() * 35
        });
      }
    };

    const draw = () => {
      if (!running) return;

      ctx.fillStyle = "rgba(10, 5, 7, 0.16)";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      rockets.forEach((rocket, index) => {
        rocket.y -= rocket.speed;
        rocket.speed *= 0.995;

        ctx.beginPath();
        ctx.fillStyle = `hsla(${rocket.hue}, 90%, 72%, .95)`;
        ctx.arc(rocket.x, rocket.y, 2, 0, Math.PI * 2);
        ctx.fill();

        if (rocket.y <= rocket.targetY) {
          explode(rocket);
          rockets.splice(index, 1);
        }
      });

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.045;
        particle.vx *= 0.985;
        particle.vy *= 0.985;
        particle.life -= particle.decay;

        ctx.beginPath();
        ctx.fillStyle = `hsla(${particle.hue}, 95%, 70%, ${Math.max(particle.life, 0)})`;
        ctx.arc(
          particle.x,
          particle.y,
          particle.size,
          0,
          Math.PI * 2
        );
        ctx.fill();

        if (particle.life <= 0) {
          particles.splice(index, 1);
        }
      });

      animationFrame = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);

    launch();
    launchTimer = window.setInterval(launch, 700);

    draw();

    return () => {
      running = false;
      cancelAnimationFrame(animationFrame);
      clearInterval(launchTimer);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fireworks-canvas"
      aria-hidden="true"
    />
  );
}

function Section({ id, className = "", children }) {
  return <section id={id} className={`section ${className}`}>{children}</section>;
}

function App() {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [music, setMusic] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [rsvp, setRsvp] = useState({ name: "", guests: "1", attending: "yes" });

  // Remembers whether the background song was playing before the video started.
  const musicBeforeVideoRef = React.useRef(false);
  const videoPlayingRef = React.useRef(false);

  useReveal();

  useEffect(() => {
    const handleCountdownFinished = () => setShowFireworks(true);

    window.addEventListener(
      "wedding-countdown-finished",
      handleCountdownFinished
    );

    return () => {
      window.removeEventListener(
        "wedding-countdown-finished",
        handleCountdownFinished
      );
    };
  }, []);

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

    // Never allow the background song to play over the wedding video.
    if (videoPlayingRef.current) return;

    if (music) {
      audio.pause();
      setMusic(false);
    } else {
      audio.play().then(() => setMusic(true)).catch(() => {});
    }
  };

  const handleVideoPlay = () => {
    const audio = document.getElementById("wedding-music");
    if (!audio) return;

    musicBeforeVideoRef.current = !audio.paused && !audio.ended;
    videoPlayingRef.current = true;

    // Background song must stop while the wedding video is playing.
    audio.pause();
    setMusic(false);
  };

  const resumeBackgroundMusic = () => {
    const audio = document.getElementById("wedding-music");

    videoPlayingRef.current = false;

    // Resume the wedding song automatically whenever the video is paused or ends.
    if (!audio) return;

    audio.play()
      .then(() => setMusic(true))
      .catch(() => setMusic(false));

    musicBeforeVideoRef.current = false;
  };

  const handleVideoPause = () => {
    // Pause means the user stopped the video, so restore the background song
    // if it was playing before the video began.
    resumeBackgroundMusic();
  };

  const handleVideoEnded = () => {
    // Ended follows the same resume behaviour as pause.
    resumeBackgroundMusic();
  };

  const submitRsvp = e => {
    e.preventDefault();
    const status = rsvp.attending === "yes" ? "Yes, I will attend" : "Sorry, I can't attend";
    const text = `Wedding RSVP%0AName: ${encodeURIComponent(rsvp.name)}%0AGuests: ${rsvp.guests}%0AResponse: ${encodeURIComponent(status)}`;
    window.open(`https://wa.me/${WEDDING.whatsappNumber}?text=${text}`, "_blank");
  };

  return (
    <main>
      {showFireworks && <Fireworks />}

      <audio id="wedding-music" loop preload="auto">
        <source src="/audio/wedding.mp3" type="audio/mpeg" />
      </audio>

      <FlowerShower />
      <TouchFlowerBursts />

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
          <div className="hero-image" style={{ backgroundImage: `url(${imageSource("hero")})` }} />
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
          <div className="section-image" style={{ backgroundImage: `url(${imageSource("blessing")})` }} />
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

        <Section id="families" className="family-section">
          <div className="family-bg">
            <img
              src={imageSource("family")}
              alt="Our families"
            />
          </div>

          <div className="family-overlay" />

          <div className="family-content">
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
          </div>
        </Section>

        <EventsAndVenue />

        <Section id="video" className="video-section">
          <div className="video-card video-card-custom reveal">
            <div className="video-media">
              <video
                className="wedding-video"
                controls
                playsInline
                preload="auto"
                onPlay={handleVideoPlay}
                onPause={handleVideoPause}
                onEnded={handleVideoEnded}
              >
                <source src={WEDDING.video.src} type="video/mp4" />
                Your browser does not support HTML5 video.
              </video>
            </div>

            <div className="video-copy video-copy-custom">
              {WEDDING.video.eyebrow && (
                <p className="eyebrow">{WEDDING.video.eyebrow}</p>
              )}

              {WEDDING.video.title && (
                <h2>{WEDDING.video.title}</h2>
              )}

              {WEDDING.video.label && (
                <p className="video-label">{WEDDING.video.label}</p>
              )}

              {WEDDING.video.description && (
                <p>{WEDDING.video.description}</p>
              )}
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
