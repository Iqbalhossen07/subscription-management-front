import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Calendar,
  CreditCard,
  Clock,
  Building,
  User,
  Hash,
  AlertCircle,
  CheckCircle2,
  XCircle,
  FileText,
  Repeat,
} from "lucide-react";

function SubscriptionDetails() {
  const { id } = useParams(); // URL থেকে সাবস্ক্রিপশন আইডি নিবে
  const navigate = useNavigate();
  const [sub, setSub] = useState(null);
  const [loading, setLoading] = useState(true);

  // ডাটাবেস থেকে স্পেসিফিক আইডি দিয়ে ডাটা আনা
  const fetchSubscriptionDetails = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.get(
        `http://localhost:5000/api/subscriptions/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setSub(data);
      setLoading(false);
    } catch (err) {
      console.error("Details fetching failed", err);
      setLoading(false);
      Swal.fire("Error", "Could not load subscription details", "error");
    }
  };

  useEffect(() => {
    fetchSubscriptionDetails();
  }, [id]);

  // ডিলিট ফাংশন
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this subscription forever!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("userToken");
        await axios.delete(`http://localhost:5000/api/subscriptions/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        Swal.fire("Deleted!", "Subscription has been deleted.", "success").then(
          () => {
            navigate("/dashboard/subscriptions"); // ডিলিট শেষে লিস্ট পেজে পাঠাবে
          },
        );
      } catch (err) {
        Swal.fire("Error!", "Could not delete.", "error");
      }
    }
  };

  if (loading)
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "#6b7280" }}>
        Loading Details...
      </div>
    );
  if (!sub)
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "#ef4444" }}>
        Subscription not found!
      </div>
    );

  // স্ট্যাটাস লজিক
  const today = new Date();
  const expiry = new Date(sub.expiryDate);
  const diffDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
  let status = "Active";
  let statusColor = "#10b981";
  let statusBg = "#ecfdf5";
  let StatusIcon = CheckCircle2;

  if (diffDays < 0) {
    status = "Expired";
    statusColor = "#ef4444";
    statusBg = "#fef2f2";
    StatusIcon = XCircle;
  } else if (diffDays <= 7) {
    status = "Expiring Soon";
    statusColor = "#f59e0b";
    statusBg = "#fffbeb";
    StatusIcon = AlertCircle;
  }

  return (
    <div
      className="page active"
      style={{
        flex: 1,
        padding: "24px",
        maxWidth: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* ── HEADER & NAVIGATION ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "15px",
          marginBottom: "30px",
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "#f9fafb",
            border: "1px solid #e5e7eb",
            padding: "8px 16px",
            borderRadius: "10px",
            color: "#4b5563",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          <ArrowLeft size={18} /> Back
        </button>
        <div style={{ display: "flex", gap: "10px" }}>
          <Link to={`/dashboard/edit-subscription/${sub._id}`}>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: "#eff6ff",
                border: "1px solid #bfdbfe",
                padding: "8px 16px",
                borderRadius: "10px",
                color: "#3b82f6",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              <Edit size={16} /> Edit
            </button>
          </Link>
          <button
            onClick={handleDelete}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "#fef2f2",
              border: "1px solid #fecaca",
              padding: "8px 16px",
              borderRadius: "10px",
              color: "#ef4444",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            <Trash2 size={16} /> Delete
          </button>
        </div>
      </div>

      {/* ── HERO SECTION (Logo & Title) ── */}
      <div
        style={{
          background: "#fff",
          borderRadius: "16px",
          border: "1px solid #e5e7eb",
          padding: "30px",
          display: "flex",
          alignItems: "center",
          gap: "20px",
          marginBottom: "24px",
          flexWrap: "wrap",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "36px",
            fontWeight: "bold",
            backgroundColor: sub.service?.brandColor || "#3b82f6",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          {sub.service?.name?.charAt(0)}
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <h1
              style={{
                margin: 0,
                fontSize: "28px",
                fontWeight: "800",
                color: "#111827",
              }}
            >
              {sub.service?.name}
            </h1>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                padding: "4px 12px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: "bold",
                backgroundColor: statusBg,
                color: statusColor,
                border: `1px solid ${statusColor}40`,
              }}
            >
              <StatusIcon size={14} /> {status}
            </span>
          </div>
          <p
            style={{
              margin: "8px 0 0",
              color: "#6b7280",
              fontSize: "15px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <FileText size={16} /> Category:{" "}
            <strong>{sub.service?.category || "General"}</strong>
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <div
            style={{ fontSize: "32px", fontWeight: "800", color: "#111827" }}
          >
            £{sub.cost}
          </div>
          <div
            style={{ color: "#6b7280", fontSize: "14px", fontWeight: "500" }}
          >
            per {sub.billingCycle} month(s)
          </div>
        </div>
      </div>

      {/* ── DETAILS GRID ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
        }}
      >
        {/* Billing Information Card */}
        <div
          style={{
            background: "#fff",
            borderRadius: "16px",
            border: "1px solid #e5e7eb",
            padding: "24px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <h3
            style={{
              margin: "0 0 20px",
              fontSize: "16px",
              fontWeight: "bold",
              color: "#111827",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              borderBottom: "1px solid #f3f4f6",
              paddingBottom: "12px",
            }}
          >
            <Calendar size={18} color="#3b82f6" /> Billing Schedule
          </h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  color: "#6b7280",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Clock size={16} /> Start Date
              </span>
              <span
                style={{
                  fontWeight: "600",
                  color: "#111827",
                  fontSize: "14px",
                }}
              >
                {new Date(sub.startDate).toLocaleDateString()}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  color: "#6b7280",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Calendar size={16} /> Expiry Date
              </span>
              <span
                style={{
                  fontWeight: "600",
                  color: statusColor,
                  fontSize: "14px",
                }}
              >
                {new Date(sub.expiryDate).toLocaleDateString()}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  color: "#6b7280",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Repeat size={16} /> Billing Cycle
              </span>
              <span
                style={{
                  fontWeight: "600",
                  color: "#111827",
                  fontSize: "14px",
                }}
              >
                Every {sub.billingCycle} Month(s)
              </span>
            </div>
            {diffDays > 0 && (
              <div
                style={{
                  marginTop: "8px",
                  padding: "12px",
                  background: "#f9fafb",
                  borderRadius: "10px",
                  fontSize: "13px",
                  color: "#4b5563",
                  textAlign: "center",
                  fontWeight: "500",
                  border: "1px dashed #d1d5db",
                }}
              >
                Next payment is in <strong>{diffDays} days</strong>
              </div>
            )}
          </div>
        </div>

        {/* Payment & Bank Details Card */}
        <div
          style={{
            background: "#fff",
            borderRadius: "16px",
            border: "1px solid #e5e7eb",
            padding: "24px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <h3
            style={{
              margin: "0 0 20px",
              fontSize: "16px",
              fontWeight: "bold",
              color: "#111827",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              borderBottom: "1px solid #f3f4f6",
              paddingBottom: "12px",
            }}
          >
            <CreditCard size={18} color="#8b5cf6" /> Payment Method
          </h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  color: "#6b7280",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Building size={16} /> Bank Name
              </span>
              <span
                style={{
                  fontWeight: "600",
                  color: "#111827",
                  fontSize: "14px",
                }}
              >
                {sub.bankName || "N/A"}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  color: "#6b7280",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <User size={16} /> Account Holder
              </span>
              <span
                style={{
                  fontWeight: "600",
                  color: "#111827",
                  fontSize: "14px",
                }}
              >
                {sub.accountHolderName || "N/A"}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  color: "#6b7280",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Hash size={16} /> Sort Code
              </span>
              <span
                style={{
                  fontWeight: "600",
                  color: "#111827",
                  fontSize: "14px",
                  fontFamily: "monospace",
                }}
              >
                {sub.sortCode || "N/A"}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  color: "#6b7280",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <CreditCard size={16} /> Account Number
              </span>
              <span
                style={{
                  fontWeight: "600",
                  color: "#111827",
                  fontSize: "14px",
                  fontFamily: "monospace",
                }}
              >
                {sub.accountNumber
                  ? `•••• ${sub.accountNumber.slice(-4)}`
                  : "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionDetails;
