import React, { useState } from "react";
import { Link } from "react-router";
import {
  Plus,
  Pencil,
  Trash2,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";

// ── DATA ──
const allSubscriptions = [
  {
    id: 1,
    service: "Netflix",
    logo: "N",
    color: "#E50914",
    plan: "Premium",
    start: "Apr 15, 2025",
    expiry: "Apr 15, 2026",
    cost: "$22.99",
    billing: "Monthly",
    status: "active",
  },
  {
    id: 2,
    service: "Spotify",
    logo: "S",
    color: "#1DB954",
    plan: "Individual",
    start: "Apr 2, 2025",
    expiry: "Apr 2, 2026",
    cost: "$9.99",
    billing: "Monthly",
    status: "active",
  },
  {
    id: 3,
    service: "Adobe CC",
    logo: "A",
    color: "#CC4B37",
    plan: "All Apps",
    start: "Mar 28, 2025",
    expiry: "Mar 28, 2026",
    cost: "$54.99",
    billing: "Monthly",
    status: "expiring",
  },
  {
    id: 4,
    service: "Figma Pro",
    logo: "Fg",
    color: "#F24E1E",
    plan: "Professional",
    start: "Apr 4, 2025",
    expiry: "Apr 4, 2026",
    cost: "$15.00",
    billing: "Monthly",
    status: "expiring",
  },
  {
    id: 5,
    service: "GitHub Pro",
    logo: "G",
    color: "#181717",
    plan: "Developer",
    start: "Mar 20, 2025",
    expiry: "Mar 20, 2026",
    cost: "$4.00",
    billing: "Monthly",
    status: "expired",
  },
  {
    id: 6,
    service: "Notion Pro",
    logo: "Nt",
    color: "#000000",
    plan: "Plus",
    start: "Jan 10, 2026",
    expiry: "Jan 10, 2027",
    cost: "$8.00",
    billing: "Monthly",
    status: "active",
  },
];

// ── TAB CONFIG ──
const TABS = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "expiring", label: "Expiring" },
  { key: "expired", label: "Expired" },
];

// ── STATUS CONFIG ──
const STATUS_CONFIG = {
  active: {
    label: "Active",
    icon: CheckCircle2,
    className: "badge active",
  },
  expiring: {
    label: "Expiring",
    icon: AlertCircle,
    className: "badge expiring",
  },
  expired: {
    label: "Expired",
    icon: XCircle,
    className: "badge expired",
  },
};

// ── STATUS BADGE COMPONENT ──
function StatusBadge({ status }) {
  const { label, icon: Icon, className } = STATUS_CONFIG[status];
  return (
    <span
      className={className}
      style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}
    >
      <Icon size={12} />
      {label}
    </span>
  );
}

// ── MAIN COMPONENT ──
function Subscriptions() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredSubs =
    activeTab === "all"
      ? allSubscriptions
      : allSubscriptions.filter((s) => s.status === activeTab);

  const getCount = (key) =>
    key === "all"
      ? allSubscriptions.length
      : allSubscriptions.filter((s) => s.status === key).length;

  return (
    <div className="page active">
      {/* ── SECTION HEADER ── */}
      <div className="section-header">
        <div>
          <h1 className="section-title">Subscriptions</h1>
          <p className="section-subtitle">
            Manage all your active and past subscriptions
          </p>
        </div>
        <Link to="/dashboard/add-subscription">
          <button className="btn btn-primary">
            <Plus size={16} />
            Add Subscription
          </button>
        </Link>
      </div>

      {/* ── TABS ── */}
      <div className="tab-bar">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`tab ${activeTab === key ? "active" : ""}`}
          >
            {label}
            <span
              style={{
                marginLeft: "6px",
                fontSize: "11px",
                fontWeight: 700,
                opacity: activeTab === key ? 0.6 : 0.35,
              }}
            >
              ({getCount(key)})
            </span>
          </button>
        ))}
      </div>

      {/* ── TABLE ── */}
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
              <th style={{ textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubs.length > 0 ? (
              filteredSubs.map((sub) => (
                <tr key={sub.id} className="group">
                  {/* Service */}
                  <td>
                    <div className="td-service">
                      <div
                        className="service-logo"
                        style={{ backgroundColor: sub.color }}
                      >
                        {sub.logo}
                      </div>
                      <div>
                        <div className="service-name">{sub.service}</div>
                        <div className="service-plan">{sub.plan}</div>
                      </div>
                    </div>
                  </td>

                  {/* Start Date */}
                  <td
                    style={{ color: "var(--text-muted)", fontStyle: "italic" }}
                  >
                    {sub.start}
                  </td>

                  {/* Expiry Date */}
                  <td>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontWeight: 600,
                        color: "var(--text-secondary)",
                      }}
                    >
                      <Clock size={13} style={{ color: "var(--text-muted)" }} />
                      {sub.expiry}
                    </div>
                  </td>

                  {/* Cost */}
                  <td>
                    <span className="cost-val">{sub.cost}</span>
                  </td>

                  {/* Billing */}
                  <td>
                    <span className="billing-badge">{sub.billing}</span>
                  </td>

                  {/* Status */}
                  <td>
                    <StatusBadge status={sub.status} />
                  </td>

                  {/* Actions */}
                  <td>
                    <div className="actions">
                      <button className="btn-edit" title="Edit">
                        <Pencil size={15} />
                      </button>
                      <button className="btn-delete" title="Delete">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              /* ── EMPTY STATE ── */
              <tr>
                <td colSpan={7}>
                  <div className="empty-state">
                    <div className="empty-icon">📭</div>
                    <div className="empty-title">No subscriptions found</div>
                    <div className="empty-desc">
                      Try a different filter or add a new subscription
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Subscriptions;
