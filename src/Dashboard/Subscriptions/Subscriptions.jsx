import React, { useState } from "react";
import { Link } from "react-router";

function Subscriptions() {
  // ফিল্টার করার জন্য একটি স্টেট (ভবিষ্যতে কাজে লাগবে)
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="page active">
      {/* ── SECTION HEADER ── */}
      <div className="section-header">
        <div>
          <div className="section-title">Subscriptions</div>
          <div className="section-subtitle">
            Manage all your active and past subscriptions
          </div>
        </div>
        <Link to="/dashboard/add-subscription">
          <button className="btn btn-primary">➕ Add Subscription</button>
        </Link>
      </div>

      {/* ── TAB BAR ── */}
      <div className="tab-bar">
        <div
          className={`tab ${activeTab === "all" ? "active" : ""}`}
          onClick={() => setActiveTab("all")}
        >
          All (12)
        </div>
        <div
          className={`tab ${activeTab === "active" ? "active" : ""}`}
          onClick={() => setActiveTab("active")}
        >
          Active (7)
        </div>
        <div
          className={`tab ${activeTab === "expiring" ? "active" : ""}`}
          onClick={() => setActiveTab("expiring")}
        >
          Expiring (3)
        </div>
        <div
          className={`tab ${activeTab === "expired" ? "active" : ""}`}
          onClick={() => setActiveTab("expired")}
        >
          Expired (2)
        </div>
      </div>

      {/* ── SUBSCRIPTIONS TABLE ── */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Service</th>
              <th>Start Date</th>
              <th>Expiry Date</th>
              <th>Cost</th>
              <th>Billing</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Netflix */}
            <tr>
              <td>
                <div className="td-service">
                  <div
                    className="service-logo"
                    style={{ background: "#ff6b35" }}
                  >
                    Nc
                  </div>
                  <div>
                    <div className="service-name">Netflix</div>
                    <div className="service-plan">Premium</div>
                  </div>
                </div>
              </td>
              <td>Apr 15, 2025</td>
              <td>Apr 15, 2026</td>
              <td>
                <div className="cost-val">$22.99</div>
              </td>
              <td>Monthly</td>
              <td>
                <span className="badge active">Active</span>
              </td>
              <td>
                <div className="actions">
                  <button
                    className="btn btn-secondary btn-sm btn-icon"
                    title="Edit"
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
              <td>
                <div className="td-service">
                  <div
                    className="service-logo"
                    style={{ background: "#1db954" }}
                  >
                    Sp
                  </div>
                  <div>
                    <div className="service-name">Spotify</div>
                    <div className="service-plan">Individual</div>
                  </div>
                </div>
              </td>
              <td>Apr 2, 2025</td>
              <td>Apr 2, 2026</td>
              <td>
                <div className="cost-val">$9.99</div>
              </td>
              <td>Monthly</td>
              <td>
                <span className="badge active">Active</span>
              </td>
              <td>
                <div className="actions">
                  <button className="btn btn-secondary btn-sm btn-icon">
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
              <td>
                <div className="td-service">
                  <div
                    className="service-logo"
                    style={{ background: "#cc4b37" }}
                  >
                    Ac
                  </div>
                  <div>
                    <div className="service-name">Adobe Creative Cloud</div>
                    <div className="service-plan">All Apps</div>
                  </div>
                </div>
              </td>
              <td>Mar 28, 2025</td>
              <td>Mar 28, 2026</td>
              <td>
                <div className="cost-val">$54.99</div>
              </td>
              <td>Monthly</td>
              <td>
                <span className="badge expiring">Expiring Soon</span>
              </td>
              <td>
                <div className="actions">
                  <button className="btn btn-secondary btn-sm btn-icon">
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
              <td>
                <div className="td-service">
                  <div
                    className="service-logo"
                    style={{ background: "#f24e1e" }}
                  >
                    Fg
                  </div>
                  <div>
                    <div className="service-name">Figma Pro</div>
                    <div className="service-plan">Professional</div>
                  </div>
                </div>
              </td>
              <td>Apr 4, 2025</td>
              <td>Apr 4, 2026</td>
              <td>
                <div className="cost-val">$15.00</div>
              </td>
              <td>Monthly</td>
              <td>
                <span className="badge expiring">Expiring Soon</span>
              </td>
              <td>
                <div className="actions">
                  <button className="btn btn-secondary btn-sm btn-icon">
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
              <td>
                <div className="td-service">
                  <div
                    className="service-logo"
                    style={{ background: "#0078d4" }}
                  >
                    Ms
                  </div>
                  <div>
                    <div className="service-name">Microsoft 365</div>
                    <div className="service-plan">Business</div>
                  </div>
                </div>
              </td>
              <td>May 1, 2025</td>
              <td>May 1, 2026</td>
              <td>
                <div className="cost-val">$12.50</div>
              </td>
              <td>Monthly</td>
              <td>
                <span className="badge active">Active</span>
              </td>
              <td>
                <div className="actions">
                  <button className="btn btn-secondary btn-sm btn-icon">
                    ✏️
                  </button>
                  <button className="btn btn-secondary btn-sm btn-icon">
                    🗑️
                  </button>
                </div>
              </td>
            </tr>

            {/* GitHub */}
            <tr>
              <td>
                <div className="td-service">
                  <div
                    className="service-logo"
                    style={{ background: "#ea4335" }}
                  >
                    Gh
                  </div>
                  <div>
                    <div className="service-name">GitHub Pro</div>
                    <div className="service-plan">Developer</div>
                  </div>
                </div>
              </td>
              <td>Mar 20, 2025</td>
              <td>Mar 20, 2026</td>
              <td>
                <div className="cost-val">$4.00</div>
              </td>
              <td>Monthly</td>
              <td>
                <span className="badge expired">Expired</span>
              </td>
              <td>
                <div className="actions">
                  <button className="btn btn-secondary btn-sm btn-icon">
                    ✏️
                  </button>
                  <button className="btn btn-secondary btn-sm btn-icon">
                    🗑️
                  </button>
                </div>
              </td>
            </tr>

            {/* Notion */}
            <tr>
              <td>
                <div className="td-service">
                  <div
                    className="service-logo"
                    style={{ background: "#7c3aed" }}
                  >
                    Nt
                  </div>
                  <div>
                    <div className="service-name">Notion Pro</div>
                    <div className="service-plan">Plus</div>
                  </div>
                </div>
              </td>
              <td>Jan 10, 2026</td>
              <td>Jan 10, 2027</td>
              <td>
                <div className="cost-val">$8.00</div>
              </td>
              <td>Monthly</td>
              <td>
                <span className="badge active">Active</span>
              </td>
              <td>
                <div className="actions">
                  <button className="btn btn-secondary btn-sm btn-icon">
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
    </div>
  );
}

export default Subscriptions;
