import React from "react";
import {
  Repeat,
  DollarSign,
  Hourglass,
  XOctagon,
  BellRing,
  Clock,
  ShieldAlert,
  CreditCard,
  ArrowRight,
} from "lucide-react";

function Dashboard() {
  return (
    <div className="page active">
      {/* ── STATS CARDS ── */}
      <div className="stats-grid ">
        <div
          className="stat-card"
          style={{
            backgroundColor: "#f0f9ff",
            borderRadius: "1rem",
            padding: "1.5rem",
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          }}
        >
          <div>
            <div
              className="stat-value"
              style={{
                fontSize: "2.25rem",
                fontWeight: "700",
                color: "#111827",
              }}
            >
              12
            </div>
            <div
              className="stat-label"
              style={{ fontSize: "0.875rem", color: "#6b7280" }}
            >
              Total Subscriptions
            </div>
            <div
              className="stat-change"
              style={{ fontSize: "0.75rem", color: "#10b981" }}
            >
              ↑ 2 this month
            </div>
          </div>
          <div
            className="stat-icon blue"
            style={{
              backgroundColor: "#e0f2fe",
              borderRadius: "9999px",
              border: "1px solid #bae6fd",
              padding: "0.75rem",
            }}
          >
            <Repeat style={{ color: "#0ea5e9" }} />
          </div>
        </div>

        <div
          className="stat-card"
          style={{
            backgroundColor: "#ecfdf5",
            borderRadius: "1rem",
            padding: "1.5rem",
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          }}
        >
          <div>
            <div
              className="stat-value"
              style={{
                fontSize: "2.25rem",
                fontWeight: "700",
                color: "#111827",
              }}
            >
              $347
            </div>
            <div
              className="stat-label"
              style={{ fontSize: "0.875rem", color: "#6b7280" }}
            >
              Monthly Spend
            </div>
            <div
              className="stat-change down"
              style={{ fontSize: "0.75rem", color: "#ef4444" }}
            >
              ↑ $23 from last month
            </div>
          </div>
          <div
            className="stat-icon green"
            style={{
              backgroundColor: "#d1fae5",
              borderRadius: "9999px",
              border: "1px solid #a7f3d0",
              padding: "0.75rem",
            }}
          >
            <DollarSign style={{ color: "#10b981" }} />
          </div>
        </div>

        <div
          className="stat-card"
          style={{
            backgroundColor: "#fffbeb",
            borderRadius: "1rem",
            padding: "1.5rem",
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          }}
        >
          <div>
            <div
              className="stat-value"
              style={{
                fontSize: "2.25rem",
                fontWeight: "700",
                color: "#111827",
              }}
            >
              3
            </div>
            <div
              className="stat-label"
              style={{ fontSize: "0.875rem", color: "#6b7280" }}
            >
              Expiring Soon
            </div>
            <div
              className="stat-change"
              style={{ fontSize: "0.75rem", color: "#f59e0b" }}
            >
              ⚠️ Action needed
            </div>
          </div>
          <div
            className="stat-icon yellow"
            style={{
              backgroundColor: "#fef3c7",
              borderRadius: "9999px",
              border: "1px solid #fde68a",
              padding: "0.75rem",
            }}
          >
            <Hourglass style={{ color: "#f59e0b" }} />
          </div>
        </div>

        <div
          className="stat-card"
          style={{
            backgroundColor: "#fef2f2",
            borderRadius: "1rem",
            padding: "1.5rem",
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          }}
        >
          <div>
            <div
              className="stat-value"
              style={{
                fontSize: "2.25rem",
                fontWeight: "700",
                color: "#111827",
              }}
            >
              2
            </div>
            <div
              className="stat-label"
              style={{ fontSize: "0.875rem", color: "#6b7280" }}
            >
              Expired
            </div>
            <div
              className="stat-change down"
              style={{ fontSize: "0.75rem", color: "#ef4444" }}
            >
              Needs renewal
            </div>
          </div>
          <div
            className="stat-icon red"
            style={{
              backgroundColor: "#fee2e2",
              borderRadius: "9999px",
              border: "1px solid #fecaca",
              padding: "0.75rem",
            }}
          >
            <XOctagon style={{ color: "#ef4444" }} />
          </div>
        </div>
      </div>
      {/* ── ALERTS SECTION ── */}
      <div className="alert-section">
        <div className="section-header" style={{ marginBottom: "16px" }}>
          <div
            className="section-title"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "16px",
            }}
          >
            <BellRing size={18} color="var(--accent)" />
            Upcoming Alerts
          </div>
          <span className="page-breadcrumb">Action Required</span>
        </div>

        {/* Adobe Creative Cloud - Warning */}
        <div className="alert yellow">
          <div
            className="alert-icon yellow"
            style={{ borderRadius: "50%", padding: "8px" }}
          >
            <Clock size={18} />
          </div>
          <div style={{ flex: 1 }}>
            <div className="alert-title">
              Adobe Creative Cloud expiring in 5 days
            </div>
            <div className="alert-desc">
              Renews on Mar 28, 2026 · <strong>$54.99/month</strong>
            </div>
          </div>
          <div className="alert-action">
            <button className="btn btn-secondary btn-sm">Renew</button>
          </div>
        </div>

        {/* Figma Pro - Warning */}
        <div className="alert yellow">
          <div
            className="alert-icon yellow"
            style={{ borderRadius: "50%", padding: "8px" }}
          >
            <Clock size={18} />
          </div>
          <div style={{ flex: 1 }}>
            <div className="alert-title">Figma Pro expiring in 12 days</div>
            <div className="alert-desc">
              Renews on Apr 4, 2026 · <strong>$15.00/month</strong>
            </div>
          </div>
          <div className="alert-action">
            <button className="btn btn-secondary btn-sm">Renew</button>
          </div>
        </div>

        {/* GitHub Pro - Danger */}
        <div className="alert red">
          <div
            className="alert-icon red"
            style={{ borderRadius: "50%", padding: "8px" }}
          >
            <ShieldAlert size={18} />
          </div>
          <div style={{ flex: 1 }}>
            <div className="alert-title" style={{ color: "var(--red)" }}>
              GitHub Pro expired 3 days ago
            </div>
            <div className="alert-desc">
              Expired on Mar 20, 2026 · <strong>$4.00/month</strong>
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
        <div className="card w-full max-w-full overflow-hidden border border-[#e5e7eb] shadow-sm rounded-2xl bg-white">
          {/* Header Section */}
          <div className="flex items-center justify-between p-5 border-b border-gray-50">
            <h3 className="text-[16px] font-bold flex items-center gap-2 text-gray-800 m-0">
              <CreditCard size={18} className="text-blue-500" />
              Recent Subscriptions
            </h3>
            <button className="flex items-center gap-1 px-3 py-3 bg-[#f9fafb] border border-[#e5e7eb] rounded-lg text-[12.5px] font-bold text-[#4b5563] hover:bg-gray-100 transition-all group">
              View all
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>

          {/* Table Wrapper with Scroll for Mobile */}
          <div className="w-full overflow-x-auto overflow-y-hidden pb-2">
            <div className="min-w-162.5">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#fcfcfd]">
                    <th className="py-3 px-5 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="py-3 px-5 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      Cost
                    </th>
                    <th className="py-3 px-5 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      Expires
                    </th>
                    <th className="py-3 px-5 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {/* Netflix */}
                  <tr className="hover:bg-slate-50 transition-colors cursor-pointer group">
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold bg-[#E50914] shadow-sm group-hover:scale-105 transition-transform shrink-0">
                          N
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 text-[13.5px]">
                            Netflix
                          </div>
                          <div className="text-[11px] text-gray-500">
                            Premium (4K)
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-5">
                      <div className="flex items-baseline gap-1">
                        <div className="font-bold text-gray-900 text-[13.5px]">
                          $22.99
                        </div>
                        <div className="text-[11px] text-gray-500 font-medium">
                          / month
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-5 text-[13px] text-gray-600 font-medium">
                      Apr 15, 2026
                    </td>
                    <td className="py-3.5 px-5">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#ecfdf5] text-[#10b981] border border-[#d1fae5]">
                        Active
                      </span>
                    </td>
                  </tr>

                  {/* Spotify */}
                  <tr className="hover:bg-slate-50 transition-colors cursor-pointer group">
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold bg-[#1DB954] shadow-sm group-hover:scale-105 transition-transform shrink-0">
                          S
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 text-[13.5px]">
                            Spotify
                          </div>
                          <div className="text-[11px] text-gray-500">
                            Family Plan
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-5">
                      <div className="flex items-baseline gap-1">
                        <div className="font-bold text-gray-900 text-[13.5px]">
                          $16.99
                        </div>
                        <div className="text-[11px] text-gray-500 font-medium">
                          / month
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-5 text-[13px] text-gray-600 font-medium">
                      Apr 02, 2026
                    </td>
                    <td className="py-3.5 px-5">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#ecfdf5] text-[#10b981] border border-[#d1fae5]">
                        Active
                      </span>
                    </td>
                  </tr>

                  {/* Adobe CC */}
                  <tr className="hover:bg-slate-50 transition-colors cursor-pointer group">
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold bg-[#FF0000] shadow-sm group-hover:scale-105 transition-transform shrink-0">
                          A
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 text-[13.5px]">
                            Adobe CC
                          </div>
                          <div className="text-[11px] text-gray-500">
                            All Apps Plan
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-5">
                      <div className="flex items-baseline gap-1">
                        <div className="font-bold text-gray-900 text-[13.5px]">
                          $54.99
                        </div>
                        <div className="text-[11px] text-gray-500 font-medium">
                          / month
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-5 text-[13px] text-gray-600 font-medium">
                      Mar 28, 2026
                    </td>
                    <td className="py-3.5 px-5">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#fffbeb] text-[#f59e0b] border border-[#fef3c7]">
                        Expiring
                      </span>
                    </td>
                  </tr>

                  {/* ChatGPT Plus */}
                  <tr className="hover:bg-slate-50 transition-colors cursor-pointer group">
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold bg-[#10a37f] shadow-sm group-hover:scale-105 transition-transform shrink-0">
                          C
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 text-[13.5px]">
                            ChatGPT Plus
                          </div>
                          <div className="text-[11px] text-gray-500">
                            Pro Subscription
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-5">
                      <div className="flex items-baseline gap-1">
                        <div className="font-bold text-gray-900 text-[13.5px]">
                          $20.00
                        </div>
                        <div className="text-[11px] text-gray-500 font-medium">
                          / month
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-5 text-[13px] text-gray-600 font-medium">
                      Apr 10, 2026
                    </td>
                    <td className="py-3.5 px-5">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#ecfdf5] text-[#10b981] border border-[#d1fae5]">
                        Active
                      </span>
                    </td>
                  </tr>

                  {/* GitHub Pro */}
                  <tr className="hover:bg-slate-50 transition-colors cursor-pointer group">
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold bg-[#181717] shadow-sm group-hover:scale-105 transition-transform shrink-0">
                          G
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 text-[13.5px]">
                            GitHub Pro
                          </div>
                          <div className="text-[11px] text-gray-500">
                            Developer
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-5">
                      <div className="flex items-baseline gap-1">
                        <div className="font-bold text-gray-900 text-[13.5px]">
                          $4.00
                        </div>
                        <div className="text-[11px] text-gray-500 font-medium">
                          / month
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-5 text-[13px] text-gray-600 font-medium">
                      Mar 20, 2026
                    </td>
                    <td className="py-3.5 px-5">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#fef2f2] text-[#ef4444] border border-[#fee2e2]">
                        Expired
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
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
