import React from "react";
import { useNavigate } from "react-router";

function EditSubscription() {
  const navigate = useNavigate();

  return (
    <div className="page active" style={{ width: "100%" }}>
      <div className="section-header">
        <div>
          <div className="section-title">✏️ Edit Subscription</div>
          <div className="section-subtitle">
            Update the details for your Netflix subscription
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
              <select className="form-select" defaultValue="Netflix">
                <option>Netflix</option>
                <option>Spotify</option>
                <option>Adobe Creative Cloud</option>
                <option>Figma</option>
              </select>
            </div>

            {/* Plan/Tier */}
            <div className="form-group">
              <label className="form-label">Plan / Tier</label>
              <input
                className="form-input"
                type="text"
                defaultValue="Premium"
              />
            </div>

            {/* Cost */}
            <div className="form-group">
              <label className="form-label">Cost *</label>
              <div className="input-prefix">
                <div className="prefix-symbol">$</div>
                <input
                  className="form-input"
                  type="number"
                  defaultValue="22.99"
                  step="0.01"
                />
              </div>
            </div>

            {/* Billing Cycle */}
            <div className="form-group">
              <label className="form-label">Billing Cycle *</label>
              <select className="form-select" defaultValue="Monthly">
                <option>Monthly</option>
                <option>Annually</option>
              </select>
            </div>

            {/* Start Date */}
            <div className="form-group">
              <label className="form-label">Start Date *</label>
              <input
                className="form-input"
                type="date"
                defaultValue="2025-04-15"
              />
            </div>

            {/* Expiry Date */}
            <div className="form-group">
              <label className="form-label">Expiry Date *</label>
              <input
                className="form-input"
                type="date"
                defaultValue="2026-04-15"
              />
            </div>

            {/* Notes */}
            <div className="form-group full">
              <label className="form-label">Notes</label>
              <textarea
                className="form-textarea"
                defaultValue="Shared with family member. Primary account."
              ></textarea>
            </div>
          </div>

          <hr className="divider" />

          {/* Status Section (Edit এ বাড়তি সুবিধা) */}
          <div
            style={{ fontWeight: 700, fontSize: "14px", marginBottom: "14px" }}
          >
            ⚙️ Subscription Status
          </div>
          <div className="form-grid">
            <div className="form-group full">
              <label className="form-label">Current Status</label>
              <select className="form-select" defaultValue="active">
                <option value="active">Active</option>
                <option value="expiring">Expiring Soon</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="form-actions">
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/dashboard/subscriptions")}
            >
              Cancel
            </button>
            <button className="btn btn-primary">💾 Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditSubscription;
