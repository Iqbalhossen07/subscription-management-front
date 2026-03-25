import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Plus,
  Pencil,
  Trash2,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Eye,
} from "lucide-react";

// ── স্ট্যাটাস কনফিগারেশন (Badge Styles) ──
const STATUS_CONFIG = {
  active: {
    label: "Active",
    icon: CheckCircle2,
    color: "#10b981",
    bg: "#ecfdf5",
  },
  expiring: {
    label: "Expiring",
    icon: AlertCircle,
    color: "#f59e0b",
    bg: "#fffbeb",
  },
  expired: { label: "Expired", icon: XCircle, color: "#ef4444", bg: "#fef2f2" },
};

function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.active;
  const { label, icon: Icon, color, bg } = config;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "4px 12px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "600",
        backgroundColor: bg,
        color: color,
        whiteSpace: "nowrap",
      }}
    >
      <Icon size={14} />
      {label}
    </span>
  );
}

function Subscriptions() {
  const [allSubscriptions, setAllSubscriptions] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);

  // ── ডাটা নিয়ে আসা ──
  const fetchSubscriptions = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.get(
        "http://localhost:5000/api/subscriptions",
        config,
      );

      const processedData = data.map((sub) => {
        const today = new Date();
        const expiry = new Date(sub.expiryDate);
        const diffDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

        let status = "active";
        if (diffDays < 0) status = "expired";
        else if (diffDays <= 7) status = "expiring";

        return { ...sub, calculatedStatus: status };
      });

      setAllSubscriptions(processedData);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  // ── ডিলিট ফাংশন ──
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("userToken");
          await axios.delete(`http://localhost:5000/api/subscriptions/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          Swal.fire("Deleted!", "Successfully deleted.", "success");
          fetchSubscriptions();
        } catch (err) {
          Swal.fire("Error!", "Could not delete.", "error");
        }
      }
    });
  };

  const filteredSubs =
    activeTab === "all"
      ? allSubscriptions
      : allSubscriptions.filter((s) => s.calculatedStatus === activeTab);

  if (loading)
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "#6b7280" }}>
        Loading...
      </div>
    );

  return (
    <div
      className="page active"
      style={{
        flex: 1,
        minWidth: 0,
        width: "100%",
        maxWidth: "100vw",
        padding: "24px",
        boxSizing: "border-box",
        overflowX: "hidden",
      }}
    >
      {/* হেডার সেকশন */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "28px",
              fontWeight: "800",
              color: "#111827",
            }}
          >
            Subscriptions
          </h1>
          <p style={{ margin: "6px 0 0", color: "#6b7280", fontSize: "14px" }}>
            Track and manage your recurring services effortlessly.
          </p>
        </div>
        <Link to="/dashboard/add-subscription">
          <button
            className="btn btn-primary"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
            }}
          >
            <Plus size={18} /> Add Subscription
          </button>
        </Link>
      </div>

      {/* ট্যাব বার */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          overflowX: "auto",
          whiteSpace: "nowrap",
          paddingBottom: "12px",
          marginBottom: "24px",
          scrollbarWidth: "none",
          borderBottom: "1px solid #f3f4f6",
        }}
      >
        {["all", "active", "expiring", "expired"].map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`tab ${activeTab === key ? "active" : ""}`}
            style={{
              flexShrink: 0,
              padding: "8px 16px",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
            <span
              style={{ opacity: 0.5, marginLeft: "6px", fontWeight: "bold" }}
            >
              {
                allSubscriptions.filter(
                  (s) => key === "all" || s.calculatedStatus === key,
                ).length
              }
            </span>
          </button>
        ))}
      </div>

      {/* টেবিল কার্ড */}
      <div
        style={{
          background: "#fff",
          borderRadius: "16px",
          border: "1px solid #e5e7eb",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "100%",
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <table
            style={{
              width: "100%",
              minWidth: "900px",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "#f9fafb",
                  borderBottom: "1px solid #f3f4f6",
                }}
              >
                <th
                  style={{
                    padding: "16px 24px",
                    textAlign: "left",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#6b7280",
                    textTransform: "uppercase",
                  }}
                >
                  Service
                </th>
                <th
                  style={{
                    padding: "16px 24px",
                    textAlign: "left",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#6b7280",
                    textTransform: "uppercase",
                  }}
                >
                  Start Date
                </th>
                <th
                  style={{
                    padding: "16px 24px",
                    textAlign: "left",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#6b7280",
                    textTransform: "uppercase",
                  }}
                >
                  Expiry Date
                </th>
                <th
                  style={{
                    padding: "16px 24px",
                    textAlign: "left",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#6b7280",
                    textTransform: "uppercase",
                  }}
                >
                  Cost
                </th>
                <th
                  style={{
                    padding: "16px 24px",
                    textAlign: "left",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#6b7280",
                    textTransform: "uppercase",
                  }}
                >
                  Status
                </th>
                <th
                  style={{
                    padding: "16px 24px",
                    textAlign: "center",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#6b7280",
                    textTransform: "uppercase",
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredSubs.length > 0 ? (
                filteredSubs.map((sub) => (
                  <tr
                    key={sub._id}
                    style={{
                      borderBottom: "1px solid #f9fafb",
                      transition: "background 0.2s",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#fcfcfc")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                  >
                    <td style={{ padding: "16px 24px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "14px",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor:
                              sub.service?.brandColor || "#6366f1",
                            width: "40px",
                            height: "40px",
                            borderRadius: "12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            fontWeight: "bold",
                            fontSize: "18px",
                            flexShrink: 0,
                          }}
                        >
                          {sub.service?.name?.charAt(0)}
                        </div>
                        <div>
                          <div
                            style={{
                              fontWeight: "700",
                              color: "#111827",
                              fontSize: "15px",
                            }}
                          >
                            {sub.service?.name}
                          </div>
                          <div style={{ fontSize: "12px", color: "#9ca3af" }}>
                            {sub.bankName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td
                      style={{
                        padding: "16px 24px",
                        color: "#4b5563",
                        fontSize: "14px",
                      }}
                    >
                      {new Date(sub.startDate).toLocaleDateString()}
                    </td>
                    <td style={{ padding: "16px 24px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          fontSize: "14px",
                          fontWeight: "600",
                          color: "#374151",
                        }}
                      >
                        <Clock size={14} color="#9ca3af" />{" "}
                        {new Date(sub.expiryDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td
                      style={{
                        padding: "16px 24px",
                        fontWeight: "700",
                        color: "#111827",
                        fontSize: "15px",
                      }}
                    >
                      £{sub.cost}
                    </td>
                    <td style={{ padding: "16px 24px" }}>
                      <StatusBadge status={sub.calculatedStatus} />
                    </td>
                    <td style={{ padding: "16px 24px" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          gap: "10px",
                        }}
                      >
                        {/* 👁️ View Button (Details Page) */}
                        <Link
                          to={`/dashboard/subscription-details/${sub._id}`}
                          style={{
                            padding: "8px",
                            borderRadius: "8px",
                            border: "1px solid #e5e7eb",
                            display: "flex",
                            color: "#3b82f6", // ভিউ বাটনের জন্য সুন্দর একটা নীল রং
                            background: "#eff6ff",
                          }}
                          title="View Details"
                        >
                          <Eye size={16} />
                        </Link>

                        {/* ✏️ Edit Button */}
                        <Link
                          to={`/dashboard/edit-subscription/${sub._id}`}
                          style={{
                            padding: "8px",
                            borderRadius: "8px",
                            border: "1px solid #e5e7eb",
                            display: "flex",
                            color: "#4b5563",
                            background: "none",
                          }}
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </Link>

                        {/* 🗑️ Delete Button */}
                        <button
                          onClick={() => handleDelete(sub._id)}
                          style={{
                            padding: "8px",
                            borderRadius: "8px",
                            border: "1px solid #fee2e2",
                            display: "flex",
                            cursor: "pointer",
                            background: "none",
                          }}
                          title="Delete"
                        >
                          <Trash2 size={16} color="#ef4444" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    style={{
                      padding: "80px",
                      textAlign: "center",
                      color: "#9ca3af",
                    }}
                  >
                    <div style={{ fontSize: "40px", marginBottom: "10px" }}>
                      📦
                    </div>
                    <div style={{ fontSize: "16px" }}>
                      No subscriptions found in this category.
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Subscriptions;
