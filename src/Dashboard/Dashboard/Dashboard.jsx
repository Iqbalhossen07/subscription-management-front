import React from "react";

function Dashboard() {
  return (
    <div className="page active">
      {/* ── STATS CARDS ── */}
      <div className="stats-grid">
        <div className="stat-card">
          <div>
            <div className="stat-value">12</div>
            <div className="stat-label">Total Subscriptions</div>
            <div className="stat-change">↑ 2 this month</div>
          </div>
          <div className="stat-icon blue">🔁</div>
        </div>
        <div className="stat-card">
          <div>
            <div className="stat-value">$347</div>
            <div className="stat-label">Monthly Spend</div>
            <div className="stat-change down">↑ $23 from last month</div>
          </div>
          <div className="stat-icon green">💰</div>
        </div>
        <div className="stat-card">
          <div>
            <div className="stat-value">3</div>
            <div className="stat-label">Expiring Soon</div>
            <div className="stat-change" style={{ color: "var(--yellow)" }}>
              ⚠️ Action needed
            </div>
          </div>
          <div className="stat-icon yellow">⏳</div>
        </div>
        <div className="stat-card">
          <div>
            <div className="stat-value">2</div>
            <div className="stat-label">Expired</div>
            <div className="stat-change down">Needs renewal</div>
          </div>
          <div className="stat-icon red">❌</div>
        </div>
      </div>

      {/* ── ALERTS SECTION ── */}
      <div className="alert-section">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "12px",
          }}
        >
          <div style={{ fontWeight: 700, fontSize: "15px" }}>
            ⚠️ Upcoming Alerts
          </div>
        </div>

        <div className="alert yellow">
          <div className="alert-icon">⏳</div>
          <div>
            <div className="alert-title">
              Adobe Creative Cloud expiring in 5 days
            </div>
            <div className="alert-desc">
              Renews on Mar 28, 2026 · $54.99/month
            </div>
          </div>
          <div className="alert-action">
            <button className="btn btn-secondary btn-sm">Renew</button>
          </div>
        </div>

        <div className="alert yellow">
          <div className="alert-icon">⏳</div>
          <div>
            <div className="alert-title">Figma Pro expiring in 12 days</div>
            <div className="alert-desc">
              Renews on Apr 4, 2026 · $15.00/month
            </div>
          </div>
          <div className="alert-action">
            <button className="btn btn-secondary btn-sm">Renew</button>
          </div>
        </div>

        <div className="alert red">
          <div className="alert-icon">❌</div>
          <div>
            <div className="alert-title">GitHub Pro expired 3 days ago</div>
            <div className="alert-desc">
              Expired on Mar 20, 2026 · $4.00/month
            </div>
          </div>
          <div className="alert-action">
            <button className="btn btn-danger btn-sm">Reactivate</button>
          </div>
        </div>
      </div>

      {/* ── DASHBOARD GRID ── */}
      <div className="dashboard-grid">
        {/* Recent Subscriptions Card */}
        <div className="card">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "16px",
            }}
          >
            <div className="card-title" style={{ margin: 0 }}>
              Recent Subscriptions
            </div>
            <button className="btn btn-secondary btn-sm">View all</button>
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Cost</th>
                  <th>Expires</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
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
                  <td>
                    <div className="cost-val">$22.99</div>
                    <div className="cost-period">/ month</div>
                  </td>
                  <td>Apr 15, 2026</td>
                  <td>
                    <span className="badge active">Active</span>
                  </td>
                </tr>
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
                  <td>
                    <div className="cost-val">$9.99</div>
                    <div className="cost-period">/ month</div>
                  </td>
                  <td>Apr 2, 2026</td>
                  <td>
                    <span className="badge active">Active</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="td-service">
                      <div
                        className="service-logo"
                        style={{ background: "#ff0000" }}
                      >
                        Yt
                      </div>
                      <div>
                        <div className="service-name">YouTube Premium</div>
                        <div className="service-plan">Family</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="cost-val">$22.99</div>
                    <div className="cost-period">/ month</div>
                  </td>
                  <td>Mar 28, 2026</td>
                  <td>
                    <span className="badge expiring">Expiring Soon</span>
                  </td>
                </tr>
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
                  <td>
                    <div className="cost-val">$12.50</div>
                    <div className="cost-period">/ month</div>
                  </td>
                  <td>May 1, 2026</td>
                  <td>
                    <span className="badge active">Active</span>
                  </td>
                </tr>
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
                  <td>
                    <div className="cost-val">$4.00</div>
                    <div className="cost-period">/ month</div>
                  </td>
                  <td>Mar 20, 2026</td>
                  <td>
                    <span className="badge expired">Expired</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming Payments & Mini Chart Card */}
        <div className="card">
          <div className="card-title">Upcoming Payments</div>
          <div className="upcoming-list">
            <div className="upcoming-item">
              <div className="upcoming-days">
                <div className="days-num">5</div>
                <div className="days-label">days</div>
              </div>
              <div className="service-logo" style={{ background: "#cc4b37" }}>
                Ac
              </div>
              <div>
                <div className="upcoming-name">Adobe CC</div>
                <div className="upcoming-cost">
                  <span>$54.99</span> / mo
                </div>
              </div>
            </div>
            <div className="upcoming-item">
              <div className="upcoming-days">
                <div className="days-num">12</div>
                <div className="days-label">days</div>
              </div>
              <div className="service-logo" style={{ background: "#f24e1e" }}>
                Fg
              </div>
              <div>
                <div className="upcoming-name">Figma Pro</div>
                <div className="upcoming-cost">
                  <span>$15.00</span> / mo
                </div>
              </div>
            </div>
            <div className="upcoming-item">
              <div className="upcoming-days">
                <div className="days-num" style={{ color: "var(--green)" }}>
                  23
                </div>
                <div className="days-label">days</div>
              </div>
              <div className="service-logo" style={{ background: "#ff6b35" }}>
                Nc
              </div>
              <div>
                <div className="upcoming-name">Netflix</div>
                <div className="upcoming-cost">
                  <span>$22.99</span> / mo
                </div>
              </div>
            </div>
            <div className="upcoming-item">
              <div className="upcoming-days">
                <div className="days-num" style={{ color: "var(--green)" }}>
                  31
                </div>
                <div className="days-label">days</div>
              </div>
              <div className="service-logo" style={{ background: "#1db954" }}>
                Sp
              </div>
              <div>
                <div className="upcoming-name">Spotify</div>
                <div className="upcoming-cost">
                  <span>$9.99</span> / mo
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Spend Mini Chart */}
          <div style={{ marginTop: "20px" }}>
            <div className="card-title">Monthly Spend</div>
            <div className="mini-chart">
              <div className="chart-bars">
                <div className="bar-wrap">
                  <div className="bar" style={{ height: "45px" }}></div>
                  <div className="bar-label">Oct</div>
                </div>
                <div className="bar-wrap">
                  <div className="bar" style={{ height: "55px" }}></div>
                  <div className="bar-label">Nov</div>
                </div>
                <div className="bar-wrap">
                  <div className="bar" style={{ height: "38px" }}></div>
                  <div className="bar-label">Dec</div>
                </div>
                <div className="bar-wrap">
                  <div className="bar" style={{ height: "62px" }}></div>
                  <div className="bar-label">Jan</div>
                </div>
                <div className="bar-wrap">
                  <div className="bar" style={{ height: "48px" }}></div>
                  <div className="bar-label">Feb</div>
                </div>
                <div className="bar-wrap">
                  <div className="bar current" style={{ height: "70px" }}></div>
                  <div className="bar-label">Mar</div>
                </div>
              </div>
              <div
                style={{
                  marginTop: "8px",
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "11px",
                  color: "var(--text-muted)",
                }}
              >
                <span>$0</span>
                <span>$347 this month</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
