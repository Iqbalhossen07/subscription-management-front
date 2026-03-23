import React from "react";

function AddSubscription() {
  return (
    <div className="page active">
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
            {/* Service Selection */}
            <div className="form-group">
              <label className="form-label">Service *</label>
              <select className="form-select">
                <option value="">Select a service...</option>
                <optgroup label="Streaming">
                  <option>Netflix</option>
                  <option>Spotify</option>
                  <option>YouTube Premium</option>
                  <option>Disney+</option>
                </optgroup>
                <optgroup label="Productivity">
                  <option>Microsoft 365</option>
                  <option>Notion</option>
                  <option>Slack</option>
                </optgroup>
                <optgroup label="Design & Dev">
                  <option>Adobe Creative Cloud</option>
                  <option>Figma</option>
                  <option>GitHub Pro</option>
                </optgroup>
              </select>
            </div>

            {/* Plan/Tier */}
            <div className="form-group">
              <label className="form-label">Plan / Tier</label>
              <input
                className="form-input"
                type="text"
                placeholder="e.g. Premium, Individual, Business"
              />
            </div>

            {/* Cost with Prefix */}
            <div className="form-group">
              <label className="form-label">Cost *</label>
              <div className="input-prefix">
                <div className="prefix-symbol">$</div>
                <input
                  className="form-input"
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                />
              </div>
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

            {/* Dates */}
            <div className="form-group">
              <label className="form-label">Start Date *</label>
              <input
                className="form-input"
                type="date"
                defaultValue="2026-03-23"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Expiry Date *</label>
              <input className="form-input" type="date" />
              <div className="form-help">
                When does this subscription renew or expire?
              </div>
            </div>

            {/* Notes */}
            <div className="form-group full">
              <label className="form-label">Notes</label>
              <textarea
                className="form-textarea"
                placeholder="Add any additional notes about this subscription..."
              ></textarea>
            </div>
          </div>

          <hr className="divider" />

          {/* Reminder Settings */}
          <div
            style={{ fontWeight: 700, fontSize: "14px", marginBottom: "14px" }}
          >
            🔔 Reminder Settings
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Alert Before Expiry</label>
              <select className="form-select">
                <option>7 days before</option>
                <option>14 days before</option>
                <option>30 days before</option>
                <option>No reminder</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Auto-Renew</label>
              <select className="form-select">
                <option>Yes — auto-renews</option>
                <option>No — manual renewal</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="form-actions">
            <button className="btn btn-secondary">Cancel</button>
            <button className="btn btn-primary">✅ Save Subscription</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddSubscription;
