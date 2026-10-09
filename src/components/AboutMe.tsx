import React, { useState } from 'react';

export const AboutMe: React.FC = () => {
  const [showFullStory, setShowFullStory] = useState(false);

  const skills = [
    { name: 'Android Modding & Smali', icon: 'fa-brands fa-android', color: '#3DDC84' },
    { name: 'iOS UI Emulation & Blurs', icon: 'fa-brands fa-apple', color: '#A2AAAD' },
    { name: 'Reverse Engineering', icon: 'fa-solid fa-microchip', color: '#EC4899' },
    { name: 'Java & C++', icon: 'fa-solid fa-code', color: '#F59E0B' },
    { name: 'TypeScript & React', icon: 'fa-brands fa-react', color: '#61DAFB' },
    { name: 'Telegram Bot & Client API', icon: 'fa-brands fa-telegram', color: '#2AABEE' },
  ];

  const principles = [
    {
      title: 'Zero Bloat & Peak Speed',
      desc: 'All modifications are crafted to run smoothly at 120Hz without battery drain or unnecessary background services.',
      icon: 'fa-solid fa-gauge-high',
      accent: 'rgba(59, 130, 246, 0.15)',
      color: '#60a5fa',
    },
    {
      title: 'iOS Aesthetics on Android',
      desc: 'Obsessed with fluid animations, dynamic blur glass, authentic iOS emojis, and modern system-level physics.',
      icon: 'fa-solid fa-palette',
      accent: 'rgba(236, 72, 153, 0.15)',
      color: '#f472b6',
    },
    {
      title: 'Strict Privacy & No Ads',
      desc: 'Every tool and patch is free of corporate trackers, telemetry, and pop-up ads. Built purely for user freedom.',
      icon: 'fa-solid fa-shield-halved',
      accent: 'rgba(34, 197, 94, 0.15)',
      color: '#4ade80',
    },
  ];

  return (
    <section id="about" style={{ marginTop: '48px' }}>
      <div className="section-label">
        About Rakshittips
      </div>

      <div
        style={{
          background: 'var(--glass)',
          backdropFilter: 'var(--blur)',
          WebkitBackdropFilter: 'var(--blur)',
          border: '1px solid var(--glass-border)',
          borderRadius: '24px',
          padding: '28px',
          boxShadow: 'inset 0 1px 0 var(--glass-sheen), 0 10px 32px -12px rgba(0, 0, 0, 0.5)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Glow ambient accent */}
        <div
          style={{
            position: 'absolute',
            top: '-60px',
            right: '-60px',
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            background: 'var(--grad)',
            filter: 'blur(60px)',
            opacity: 0.18,
            pointerEvents: 'none',
          }}
        ></div>

        {/* Developer Header Profile */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '20px',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '20px',
                background: 'var(--grad)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '28px',
                boxShadow: '0 8px 24px -4px rgba(236, 72, 153, 0.5)',
                position: 'relative',
                flexShrink: 0,
              }}
            >
              <i className="fa-solid fa-terminal"></i>
              <span
                style={{
                  position: 'absolute',
                  bottom: '-2px',
                  right: '-2px',
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  background: '#22c55e',
                  border: '2px solid var(--bg)',
                }}
                title="Active Developer"
              ></span>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <h2
                  style={{
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 800,
                    fontSize: '22px',
                    margin: 0,
                  }}
                >
                  Rakshit Dhakariya
                </h2>
                <span
                  style={{
                    fontSize: '11px',
                    background: 'rgba(236, 72, 153, 0.15)',
                    border: '1px solid rgba(236, 72, 153, 0.4)',
                    color: '#ec4899',
                    borderRadius: '999px',
                    padding: '2px 9px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  @Rakshittips
                </span>
              </div>
              <div
                style={{
                  fontSize: '13.5px',
                  color: 'var(--text-dim)',
                  marginTop: '3px',
                }}
              >
                Solo Developer &bull; Android Modder &bull; Tech Creator &bull; UI/UX Crafting
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <a
              href="https://t.me/RakshittipsDeveloper"
              target="_blank"
              rel="noopener noreferrer"
              className="copy-btn"
              style={{
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                fontSize: '12.5px',
              }}
            >
              <i className="fa-brands fa-telegram" style={{ color: '#2AABEE' }}></i>
              <span>DM on Telegram</span>
            </a>
            <a
              href="https://github.com/Rakshittips"
              target="_blank"
              rel="noopener noreferrer"
              className="copy-btn"
              style={{
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                fontSize: '12.5px',
              }}
            >
              <i className="fa-brands fa-github"></i>
              <span>GitHub</span>
            </a>
            <a
              href="https://www.instagram.com/mr._rakshit_2.0"
              target="_blank"
              rel="noopener noreferrer"
              className="copy-btn"
              style={{
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                fontSize: '12.5px',
              }}
            >
              <i className="fa-brands fa-instagram" style={{ color: '#E1306C' }}></i>
              <span>Instagram</span>
            </a>
            <a
              href="https://youtube.com/@mr._rakshit_2.0"
              target="_blank"
              rel="noopener noreferrer"
              className="copy-btn"
              style={{
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                fontSize: '12.5px',
              }}
            >
              <i className="fa-brands fa-youtube" style={{ color: '#FF0000' }}></i>
              <span>YouTube</span>
            </a>
          </div>
        </div>

        {/* Bio Paragraph */}
        <div style={{ marginTop: '20px', lineHeight: 1.65, fontSize: '14.5px', color: 'var(--text)' }}>
          <p>
            Hey! I am <strong>Rakshit</strong>, the solo creator behind <strong>Rakshittips</strong>.
            I focus on pushing the boundaries of Android customization, reverse engineering, Telegram client modifications,
            and ultra-clean web tools.
          </p>
          <p style={{ marginTop: '10px', color: 'var(--text-dim)' }}>
            My mission is simple: provide users with the sleek aesthetic and fluidity of iOS (including real blur effects,
            iOS emojis, and high-fidelity soundscapes) without forcing anyone to buy into expensive hardware, and without
            annoying ads or malicious bloatware.
          </p>

          {showFullStory && (
            <div
              style={{
                marginTop: '12px',
                paddingTop: '12px',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                color: 'var(--text-dim)',
                fontSize: '14px',
                animation: 'slideUp 0.3s ease',
              }}
            >
              <p>
                Every single line of code, patch, APK compile, documentation page, and GitHub repository is handled <strong>100% solo</strong> by me.
                There is no investor, no commercial agency, and no subscription paywall. When you use tools like
                <em> instaGram Pro</em>, <em>MRGram iPhone!</em>, <em>MRTune</em>, or <em>MRiOS Launcher</em>, you are experiencing
                thousands of hours of independent development and refinement.
              </p>
              <p style={{ marginTop: '10px' }}>
                Your contributions directly fuel server costs, testing devices, coffee, and future mod updates.
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={() => setShowFullStory(!showFullStory)}
            style={{
              background: 'none',
              border: 'none',
              color: '#ec4899',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              padding: '6px 0',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              marginTop: '6px',
            }}
          >
            <span>{showFullStory ? 'Read less' : 'Read full developer story'}</span>
            <i className={`fa-solid ${showFullStory ? 'fa-chevron-up' : 'fa-chevron-down'}`} style={{ fontSize: '11px' }}></i>
          </button>
        </div>

        {/* Skills & Specialties */}
        <div style={{ marginTop: '24px' }}>
          <div
            style={{
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontWeight: 700,
              color: 'var(--text-dim)',
              marginBottom: '10px',
            }}
          >
            Tech Stack &amp; Specialties:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {skills.map((s) => (
              <span
                key={s.name}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '999px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--glass-border)',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  color: 'var(--text)',
                }}
              >
                <i className={s.icon} style={{ color: s.color, fontSize: '13px' }}></i>
                <span>{s.name}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Core Principles */}
        <div
          style={{
            marginTop: '24px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '12px',
          }}
        >
          {principles.map((p) => (
            <div
              key={p.title}
              style={{
                padding: '16px',
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--glass-border)',
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: p.accent,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: p.color,
                  fontSize: '15px',
                  marginBottom: '10px',
                }}
              >
                <i className={p.icon}></i>
              </div>
              <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '4px' }}>
                {p.title}
              </div>
              <p style={{ fontSize: '12.5px', color: 'var(--text-dim)', lineHeight: 1.45 }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Direct Connect Row */}
        <div
          style={{
            marginTop: '24px',
            paddingTop: '18px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '13px',
            color: 'var(--text-dim)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <i className="fa-solid fa-envelope" style={{ color: '#ec4899' }}></i>
            <span>Email: <strong>RakshitDhakariya6@gmail.com</strong></span>
          </div>

          <a
            href="#amounts"
            className="copy-btn"
            style={{
              padding: '7px 16px',
              fontSize: '12.5px',
              background: 'var(--grad)',
              color: '#fff',
              border: 'none',
              textDecoration: 'none',
            }}
          >
            <i className="fa-solid fa-heart"></i>
            Support Rakshit's Mods
          </a>
        </div>
      </div>
    </section>
  );
};
