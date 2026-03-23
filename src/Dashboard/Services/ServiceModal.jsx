import React from "react";

function ServiceModal({ isOpen, onClose, isEdit = false }) {
  if (!isOpen) return null;

  return (
    /* আপনার CSS এর modal-overlay এবং open ক্লাস এখানে */
    <div className={`modal-overlay ${isOpen ? "open" : ""}`} onClick={onClose}>
      {/* আপনার CSS এর modal ক্লাস এখানে */}
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {/* মডাল হেডার */}
        <div className="modal-header">
          <div>
            <div className="modal-title">
              {isEdit ? "✏️ Edit Service" : "➕ Add Service"}
            </div>
            <div className="modal-subtitle">
              {isEdit
                ? "Update existing service details"
                : "Define a new service for subscriptions"}
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* মডাল বডি */}
        <div className="modal-body">
          <div className="form-grid">
            <div className="form-group full">
              <label className="form-label">Service Name *</label>
              <input
                className="form-input"
                type="text"
                placeholder="e.g. Netflix, Figma, Notion"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Abbreviation (2-3 chars)</label>
              <input
                className="form-input"
                type="text"
                placeholder="e.g. Nc, Fg"
                maxLength="3"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select className="form-select">
                <option>Streaming</option>
                <option>Productivity</option>
                <option>Design</option>
                <option>Development</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Brand Color</label>
              <input
                className="form-input"
                type="color"
                defaultValue="#3b82f6"
                style={{ height: "42px", cursor: "pointer" }}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Website URL</label>
              <input
                className="form-input"
                type="url"
                placeholder="https://..."
              />
            </div>
          </div>
        </div>

        {/* মডাল ফুটার */}
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary">
            {isEdit ? "💾 Update Service" : "✅ Save Service"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ServiceModal;
