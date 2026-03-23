import React from "react";

function Profile() {
  return (
    <div className="page active">
      {/* ── SECTION HEADER ── */}
      <div className="section-header">
        <div>
          <div className="section-title">Profile Settings</div>
          <div className="section-subtitle">
            Manage your account information and preferences
          </div>
        </div>
      </div>

      <div className="profile-grid">
        {/* ── LEFT: AVATAR & BILLING CARD ── */}
        <div>
          {/* User Info Card */}
          <div className="card profile-avatar-card">
            <div className="profile-avatar-big">AK</div>
            <div className="profile-name">Alex Kim</div>
            <div className="profile-email-small">alex.kim@example.com</div>
            <div style={{ marginTop: "10px" }}>
              <span className="badge active">Pro Plan</span>
            </div>

            <div className="profile-stat-row">
              <div className="profile-stat">
                <div className="val">12</div>
                <div className="lbl">Subs</div>
              </div>
              <div className="profile-stat">
                <div className="val">$347</div>
                <div className="lbl">/ mo</div>
              </div>
            </div>

            <button
              className="btn btn-secondary"
              style={{
                width: "100%",
                marginTop: "16px",
                justifyContent: "center",
              }}
            >
              📷 Change Photo
            </button>
          </div>

          {/* Billing Plan Card */}
          <div className="card" style={{ marginTop: "16px" }}>
            <div className="card-title">Plan & Billing</div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px",
                background: "var(--accent-light)",
                borderRadius: "8px",
                border: "1px solid #bfdbfe",
              }}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: "14px" }}>
                  Pro Plan
                </div>
                <div style={{ fontSize: "12px", color: "#1d4ed8" }}>
                  Unlimited subscriptions
                </div>
              </div>
              <div
                style={{
                  fontWeight: 800,
                  fontSize: "16px",
                  color: "var(--accent)",
                }}
              >
                $9/mo
              </div>
            </div>
            <button
              className="btn btn-secondary"
              style={{
                width: "100%",
                marginTop: "12px",
                justifyContent: "center",
              }}
            >
              Manage Billing
            </button>
          </div>
        </div>

        {/* ── RIGHT: FORMS ── */}
        <div>
          {/* Personal Information Form */}
          <div className="card" style={{ marginBottom: "20px" }}>
            <div
              style={{
                fontWeight: 700,
                fontSize: "15px",
                marginBottom: "18px",
                paddingBottom: "14px",
                borderBottom: "1px solid var(--border)",
              }}
            >
              👤 Personal Information
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">First Name</label>
                <input className="form-input" type="text" defaultValue="Alex" />
              </div>
              <div className="form-group">
                <label className="form-label">Last Name</label>
                <input className="form-input" type="text" defaultValue="Kim" />
              </div>
              <div className="form-group full">
                <label className="form-label">Email Address</label>
                <input
                  className="form-input"
                  type="email"
                  defaultValue="alex.kim@example.com"
                />
                <div className="form-help">
                  We'll send subscription alerts to this email.
                </div>
              </div>
              <div className="form-group full">
                <label className="form-label">Timezone</label>
                <select className="form-select" defaultValue="Asia/Dhaka">
                  <option value="Asia/Dhaka">UTC+6 — Asia/Dhaka</option>
                  <option value="Europe/London">UTC+0 — Europe/London</option>
                  <option value="America/New_York">
                    UTC-5 — America/New_York
                  </option>
                </select>
              </div>
            </div>
            <div className="form-actions">
              <button className="btn btn-primary">💾 Save Changes</button>
            </div>
          </div>

          {/* Change Password Form */}
          <div className="card" style={{ marginBottom: "20px" }}>
            <div
              style={{
                fontWeight: 700,
                fontSize: "15px",
                marginBottom: "18px",
                paddingBottom: "14px",
                borderBottom: "1px solid var(--border)",
              }}
            >
              🔐 Change Password
            </div>
            <div className="form-grid">
              <div className="form-group full">
                <label className="form-label">Current Password</label>
                <input
                  className="form-input"
                  type="password"
                  placeholder="Enter current password"
                />
              </div>
              <div className="form-group">
                <label className="form-label">New Password</label>
                <input
                  className="form-input"
                  type="password"
                  placeholder="Min. 8 characters"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Confirm New Password</label>
                <input
                  className="form-input"
                  type="password"
                  placeholder="Repeat new password"
                />
              </div>
            </div>
            <div className="form-actions">
              <button className="btn btn-primary">🔒 Update Password</button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="danger-zone">
            <div className="dz-title">⚠️ Danger Zone</div>
            <div className="dz-desc">
              Once you delete your account, there is no going back. All your
              subscription data will be permanently removed.
            </div>
            <button className="btn btn-danger btn-sm">🗑️ Delete Account</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
