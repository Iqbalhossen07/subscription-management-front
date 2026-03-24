import React, { useState } from "react";
import { Link } from "react-router";

function AddSubscription() {
  const [sortCode, setSortCode] = useState("");

  // Sort Code auto-format: 123456 → 12-34-56
  const handleSortCode = (e) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 6);
    const formatted =
      raw.length <= 2
        ? raw
        : raw.length <= 4
          ? `${raw.slice(0, 2)}-${raw.slice(2)}`
          : `${raw.slice(0, 2)}-${raw.slice(2, 4)}-${raw.slice(4)}`;
    setSortCode(formatted);
  };

  return (
    <div className="page active">
      {/* ── HEADER ── */}
      <div className="section-header">
        <div>
          <div className="section-title">Add Subscription</div>
          <div className="section-subtitle">
            Track a new subscription or service
          </div>
        </div>
      </div>

      <div >
        <div className="card">
          {/* ── SUBSCRIPTION DETAILS ── */}
          <div
            style={{
              fontWeight: 700,
              fontSize: "15px",
              marginBottom: "20px",
              paddingBottom: "14px",
              borderBottom: "1px solid var(--border)",
            }}
          >
            📋 Subscription Details
          </div>

          <div className="form-grid">
            {/* Service */}
            <div className="form-group">
              <label className="form-label">Service *</label>
              <select className="form-select">
                <option value="">Select a service...</option>
                <optgroup label="Streaming">
                  <option>Netflix</option>
                  <option>Spotify</option>
                  <option>YouTube Premium</option>
                  <option>Disney+</option>
                  <option>HBO Max</option>
                  <option>Apple TV+</option>
                </optgroup>
                <optgroup label="Productivity">
                  <option>Microsoft 365</option>
                  <option>Google Workspace</option>
                  <option>Notion</option>
                  <option>Slack</option>
                </optgroup>
                <optgroup label="Design & Dev">
                  <option>Adobe Creative Cloud</option>
                  <option>Figma</option>
                  <option>GitHub Pro</option>
                  <option>Vercel</option>
                </optgroup>
                <optgroup label="Other">
                  <option>Custom Service...</option>
                </optgroup>
              </select>
            </div>

            {/* Billing Cycle */}
            <div className="form-group">
              <label className="form-label">Billing Cycle *</label>
              <select className="form-select">
                <option>Monthly</option>
                <option>Quarterly</option>
                <option>Annually</option>
                <option>One-time</option>
              </select>
            </div>

            {/* Cost */}
            <div className="form-group">
              <label className="form-label">Cost *</label>
              <div className="input-prefix">
                <div className="prefix-symbol">£</div>
                <input
                  className="form-input"
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>

            {/* Start Date */}
            <div className="form-group">
              <label className="form-label">Start Date *</label>
              <input
                className="form-input"
                type="date"
                defaultValue={new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>

          <hr className="divider" />

          {/* ── UK BANK DETAILS ── */}
          <div
            style={{
              fontWeight: 700,
              fontSize: "15px",
              marginBottom: "20px",
              paddingBottom: "14px",
              borderBottom: "1px solid var(--border)",
            }}
          >
            🏦 UK Bank Details
          </div>

          <div className="form-grid">
            {/* Account Holder Name */}
            <div className="form-group full">
              <label className="form-label">Account Holder Name *</label>
              <input
                className="form-input"
                type="text"
                placeholder="e.g. John Smith"
              />
            </div>

            {/* Bank Name */}
            <div className="form-group full">
              <label className="form-label">Bank Name *</label>
              <input
                className="form-input"
                type="text"
                placeholder="e.g. Barclays, HSBC, Lloyds, NatWest"
              />
            </div>

            {/* Sort Code */}
            <div className="form-group">
              <label className="form-label">Sort Code *</label>
              <input
                className="form-input"
                type="text"
                placeholder="12-34-56"
                value={sortCode}
                onChange={handleSortCode}
                maxLength={8}
              />
              <div className="form-help">Format: 12-34-56 (6 digits)</div>
            </div>

            {/* Account Number */}
            <div className="form-group">
              <label className="form-label">Account Number *</label>
              <input
                className="form-input"
                type="text"
                placeholder="12345678"
                maxLength={8}
                onInput={(e) => {
                  e.target.value = e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 8);
                }}
              />
              <div className="form-help">8-digit UK account number</div>
            </div>
          </div>

          {/* ── FORM ACTIONS ── */}
          <div className="form-actions">
            <Link to="/dashboard/subscriptions">
              <button className="btn btn-secondary">Cancel</button>
            </Link>
            <button className="btn btn-primary">✅ Save Subscription</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddSubscription;
