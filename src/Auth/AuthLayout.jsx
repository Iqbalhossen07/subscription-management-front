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
    <div className="auth-page ">
      {/* ── TOPBAR ── */}
      <header className=" flex justify-center items-center  mt-8">
       
          <Link to="/">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-32 h-auto block mt-6"
            />
          </Link>
       
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
