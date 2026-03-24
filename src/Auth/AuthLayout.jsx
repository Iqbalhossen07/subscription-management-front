import React from "react";
import { Outlet, Link, useLocation } from "react-router";
import { CheckCircle2 } from "lucide-react";
import "./AuthLayout.css";

const PERKS = [
  "Track unlimited subscriptions",
  "Expiry alerts & smart reminders",
  "UK bank details — stored securely",
  "Monthly spend breakdown & insights",
];

const STATS = [
  { val: "2,400+", label: "Active users" },
  { val: "£18k", label: "Saved monthly" },
  { val: "99.9%", label: "Uptime" },
];

function AuthLayout() {
  const location = useLocation();
  const isLogin = location.pathname === "/login" || location.pathname === "/";

  return (
    <div className="auth-page">
      {/* ── TOPBAR ── */}
      <header className="auth-topbar">
        <a className="auth-logo" href="/">
          <div className="auth-logo-icon">📊</div>
          <span className="auth-logo-text">
            Sub<span>Track</span>
          </span>
        </a>

        <div className="auth-topbar-right">
          {isLogin ? (
            <>
              Don't have an account? <Link to="/register">Create one free</Link>
            </>
          ) : (
            <>
              Already have an account? <Link to="/login">Sign in</Link>
            </>
          )}
        </div>
      </header>

      {/* ── CENTERED CONTENT ── */}
      <div className="auth-content">
        <div className="auth-inner">
          {/* ── LEFT: Brand Info ── */}
          <div className="auth-brand">
            <div className="auth-badge">
              <span className="auth-badge-dot" />
              <span>Smart Subscription Manager</span>
            </div>

            <h1 className="auth-headline">
              Take control of
              <br />
              your <span className="auth-headline-accent">subscriptions</span>
            </h1>

            <p className="auth-subtext">
              Track every subscription, never miss a renewal, and stop paying
              for things you forgot about.
            </p>

            {/* Stats */}
            <div className="auth-stats">
              {STATS.map(({ val, label }) => (
                <div key={label} className="auth-stat">
                  <div className="auth-stat-val">{val}</div>
                  <div className="auth-stat-label">{label}</div>
                </div>
              ))}
            </div>

            {/* Perks */}
            <div className="auth-perks">
              {PERKS.map((p) => (
                <div key={p} className="auth-perk">
                  <div className="auth-perk-check">
                    <CheckCircle2 size={13} />
                  </div>
                  <span>{p}</span>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div className="auth-testimonial">
              <div className="auth-testimonial-avatar">SK</div>
              <div>
                <p className="auth-testimonial-quote">
                  "SubTrack saved me over £200 by catching subscriptions I'd
                  completely forgotten about."
                </p>
                <p className="auth-testimonial-author">Sarah K. — London, UK</p>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Form Card ── */}
          <div className="auth-card-wrap">
            <div className="auth-card">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
