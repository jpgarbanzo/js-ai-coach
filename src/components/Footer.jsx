import React from 'react'

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="app-footer">
      <div className="footer-inner">
        <span className="footer-copy">
          © {year} JP Garbanzo · All rights reserved
        </span>
        <span className="footer-sep" aria-hidden="true">·</span>
        <a
          href="https://www.jpgc.tech"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          jpgc.tech
        </a>
        <span className="footer-sep" aria-hidden="true">·</span>
        <span className="footer-tagline">Powered by AI Coach</span>
      </div>
      <style>{`
        .app-footer {
          background: var(--bg-nav);
          border-top: 1px solid rgba(255,255,255,0.08);
          padding: var(--space-4) var(--space-6);
          margin-top: auto;
          color: rgba(255,255,255,0.55);
          font-size: var(--font-size-sm);
        }
        .footer-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-3);
          flex-wrap: wrap;
        }
        .footer-link {
          color: rgba(255,255,255,0.8);
          text-decoration: none;
          font-weight: var(--font-weight-medium);
          transition: color var(--transition-fast);
        }
        .footer-link:hover {
          color: #fff;
          text-decoration: underline;
        }
        .footer-sep {
          opacity: 0.35;
        }
        .footer-tagline {
          opacity: 0.4;
        }
      `}</style>
    </footer>
  )
}

export default Footer
