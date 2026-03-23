import React, { useState } from "react";
import ServiceModal from "./ServiceModal";

function Services() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // অ্যাড বাটন ক্লিক হ্যান্ডলার
  const handleAddClick = () => {
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  // এডিট বাটন ক্লিক হ্যান্ডলার
  const handleEditClick = () => {
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  return (
    <div className="page active">
      {/* ── SECTION HEADER ── */}
      <div className="section-header">
        <div>
          <div className="section-title">Services</div>
          <div className="section-subtitle">
            Manage the catalog of available services
          </div>
        </div>
        {/* অ্যাড বাটন */}
        <button className="btn btn-primary" onClick={handleAddClick}>
          ➕ Add Service
        </button>
      </div>

      {/* ── SERVICES TABLE ── */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Service Name</th>
              <th>Category</th>
              <th>Color</th>
              <th>Active Subs</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Netflix */}
            <tr>
              <td
                style={{
                  color: "var(--text-muted)",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "12px",
                }}
              >
                01
              </td>
              <td>
                <div className="td-service">
                  <div
                    className="service-logo"
                    style={{ background: "#ff6b35" }}
                  >
                    Nc
                  </div>
                  <div className="service-name">Netflix</div>
                </div>
              </td>
              <td>
                <span
                  className="badge active"
                  style={{ background: "#f0fdf4" }}
                >
                  Streaming
                </span>
              </td>
              <td>
                <span
                  className="color-pill"
                  style={{ background: "#ff6b35" }}
                ></span>{" "}
                #ff6b35
              </td>
              <td>1</td>
              <td>
                <div className="actions">
                  <button
                    className="btn btn-secondary btn-sm btn-icon"
                    onClick={handleEditClick}
                  >
                    ✏️
                  </button>
                  <button
                    className="btn btn-secondary btn-sm btn-icon"
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              </td>
            </tr>

            {/* Spotify */}
            <tr>
              <td
                style={{
                  color: "var(--text-muted)",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "12px",
                }}
              >
                02
              </td>
              <td>
                <div className="td-service">
                  <div
                    className="service-logo"
                    style={{ background: "#1db954" }}
                  >
                    Sp
                  </div>
                  <div className="service-name">Spotify</div>
                </div>
              </td>
              <td>
                <span
                  className="badge active"
                  style={{ background: "#f0fdf4" }}
                >
                  Streaming
                </span>
              </td>
              <td>
                <span
                  className="color-pill"
                  style={{ background: "#1db954" }}
                ></span>{" "}
                #1db954
              </td>
              <td>1</td>
              <td>
                <div className="actions">
                  <button
                    className="btn btn-secondary btn-sm btn-icon"
                    onClick={handleEditClick}
                  >
                    ✏️
                  </button>
                  <button className="btn btn-secondary btn-sm btn-icon">
                    🗑️
                  </button>
                </div>
              </td>
            </tr>

            {/* Adobe CC */}
            <tr>
              <td
                style={{
                  color: "var(--text-muted)",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "12px",
                }}
              >
                03
              </td>
              <td>
                <div className="td-service">
                  <div
                    className="service-logo"
                    style={{ background: "#cc4b37" }}
                  >
                    Ac
                  </div>
                  <div className="service-name">Adobe Creative Cloud</div>
                </div>
              </td>
              <td>
                <span
                  className="badge"
                  style={{ background: "#eff6ff", color: "#1d4ed8" }}
                >
                  Design
                </span>
              </td>
              <td>
                <span
                  className="color-pill"
                  style={{ background: "#cc4b37" }}
                ></span>{" "}
                #cc4b37
              </td>
              <td>1</td>
              <td>
                <div className="actions">
                  <button
                    className="btn btn-secondary btn-sm btn-icon"
                    onClick={handleEditClick}
                  >
                    ✏️
                  </button>
                  <button className="btn btn-secondary btn-sm btn-icon">
                    🗑️
                  </button>
                </div>
              </td>
            </tr>

            {/* Figma */}
            <tr>
              <td
                style={{
                  color: "var(--text-muted)",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "12px",
                }}
              >
                04
              </td>
              <td>
                <div className="td-service">
                  <div
                    className="service-logo"
                    style={{ background: "#f24e1e" }}
                  >
                    Fg
                  </div>
                  <div className="service-name">Figma</div>
                </div>
              </td>
              <td>
                <span
                  className="badge"
                  style={{ background: "#eff6ff", color: "#1d4ed8" }}
                >
                  Design
                </span>
              </td>
              <td>
                <span
                  className="color-pill"
                  style={{ background: "#f24e1e" }}
                ></span>{" "}
                #f24e1e
              </td>
              <td>1</td>
              <td>
                <div className="actions">
                  <button
                    className="btn btn-secondary btn-sm btn-icon"
                    onClick={handleEditClick}
                  >
                    ✏️
                  </button>
                  <button className="btn btn-secondary btn-sm btn-icon">
                    🗑️
                  </button>
                </div>
              </td>
            </tr>

            {/* Microsoft 365 */}
            <tr>
              <td
                style={{
                  color: "var(--text-muted)",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "12px",
                }}
              >
                05
              </td>
              <td>
                <div className="td-service">
                  <div
                    className="service-logo"
                    style={{ background: "#0078d4" }}
                  >
                    Ms
                  </div>
                  <div className="service-name">Microsoft 365</div>
                </div>
              </td>
              <td>
                <span
                  className="badge"
                  style={{ background: "#faf5ff", color: "#7c3aed" }}
                >
                  Productivity
                </span>
              </td>
              <td>
                <span
                  className="color-pill"
                  style={{ background: "#0078d4" }}
                ></span>{" "}
                #0078d4
              </td>
              <td>1</td>
              <td>
                <div className="actions">
                  <button
                    className="btn btn-secondary btn-sm btn-icon"
                    onClick={handleEditClick}
                  >
                    ✏️
                  </button>
                  <button className="btn btn-secondary btn-sm btn-icon">
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ── MODAL COMPONENT ── */}
      <ServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isEdit={isEditMode}
      />
    </div>
  );
}

export default Services;
