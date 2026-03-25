import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
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
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  // ১. ডাটা ফেচ করা
  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.get(
        "http://localhost:5000/api/subscriptions",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setSubscriptions(data);
      setLoading(false);
    } catch (err) {
      console.error("Dashboard data fetching failed", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // ২. ডায়নামিক ক্যালকুলেশন এবং ফিল্টারিং
  const today = new Date();
  today.setHours(0, 0, 0, 0); // আজকের দিনের শুরু

  const threeDaysFromNow = new Date(today);
  threeDaysFromNow.setDate(today.getDate() + 3);

  const sevenDaysFromNow = new Date(today);
  sevenDaysFromNow.setDate(today.getDate() + 7);

  // Stats ক্যালকুলেশন
  let monthlySpend = 0;
  let expiringSoonCount = 0;
  let expiredCount = 0;

  subscriptions.forEach((sub) => {
    const expiry = new Date(sub.expiryDate);
    if (expiry >= today) monthlySpend += Number(sub.cost || 0);
    if (expiry < today) expiredCount++;
    else if (expiry <= threeDaysFromNow) expiringSoonCount++;
  });

  // অ্যালার্টের জন্য ফিল্টার
  const expiredSubs = subscriptions.filter(
    (sub) => new Date(sub.expiryDate) < today,
  );
  const upcomingAlerts = subscriptions.filter((sub) => {
    const expiry = new Date(sub.expiryDate);
    return expiry >= today && expiry <= sevenDaysFromNow;
  });

  // Upcoming Payments এর জন্য ফিল্টার (যেগুলো এখনো একটিভ, সেগুলোকে তারিখ অনুযায়ী সাজানো)
  const upcomingPayments = subscriptions
    .filter((sub) => new Date(sub.expiryDate) >= today)
    .sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate))
    .slice(0, 4); // শুধু প্রথম ৪টি দেখাবে

  // Recent Subscriptions (সর্বশেষ ৫টি)
  const recentSubscriptions = [...subscriptions].reverse().slice(0, 5);

  if (loading)
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        Loading Dashboard...
      </div>
    );

  return (
    <div
      className="page active"
      style={{ maxWidth: "100%", overflowX: "hidden" }}
    >
      {/* ── STATS CARDS ── */}
      <div
        className="stats-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", // এখানে ১৪০px করার কারণে মোবাইলে ২টা করে বসবে
          gap: "12px", // মোবাইলের জন্য গ্যাপ একটু কমানো হলো
          marginBottom: "30px",
        }}
      >
        {/* ১. Total Subscriptions */}
        <div
          className="stat-card"
          style={{
            backgroundColor: "#f0f9ff",
            borderRadius: "1rem",
            padding: "1.2rem", // জায়গা বাঁচানোর জন্য প্যাডিং একটু কমানো হয়েছে
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap", // জায়গা কম হলে ভেঙে নিচে নামবে
            gap: "10px",
          }}
        >
          <div>
            <div
              className="stat-value"
              style={{
                fontSize: "1.8rem", // মোবাইলে সুন্দর দেখানোর জন্য সাইজ একটু ব্যালেন্স করা হলো
                fontWeight: "700",
                color: "#111827",
              }}
            >
              {subscriptions.length}
            </div>
            <div
              className="stat-label"
              style={{ fontSize: "0.80rem", color: "#6b7280" }}
            >
              Total Subscriptions
            </div>
            <div
              className="stat-change"
              style={{
                fontSize: "0.75rem",
                color: "#10b981",
                marginTop: "4px",
              }}
            >
              All registered items
            </div>
          </div>
          <div
            className="stat-icon blue"
            style={{
              backgroundColor: "#e0f2fe",
              borderRadius: "9999px",
              border: "1px solid #bae6fd",
              padding: "0.60rem",
            }}
          >
            <Repeat style={{ color: "#0ea5e9" }} size={20} />
          </div>
        </div>

        {/* ২. Monthly Spend */}
        <div
          className="stat-card"
          style={{
            backgroundColor: "#ecfdf5",
            borderRadius: "1rem",
            padding: "1.2rem",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <div>
            <div
              className="stat-value"
              style={{
                fontSize: "1.8rem",
                fontWeight: "700",
                color: "#111827",
              }}
            >
              £{monthlySpend}
            </div>
            <div
              className="stat-label"
              style={{ fontSize: "0.80rem", color: "#6b7280" }}
            >
              Monthly Spend
            </div>
            <div
              className="stat-change"
              style={{
                fontSize: "0.75rem",
                color: "#10b981",
                marginTop: "4px",
              }}
            >
              Active total costs
            </div>
          </div>
          <div
            className="stat-icon green"
            style={{
              backgroundColor: "#d1fae5",
              borderRadius: "9999px",
              border: "1px solid #a7f3d0",
              padding: "0.60rem",
            }}
          >
            <DollarSign style={{ color: "#10b981" }} size={20} />
          </div>
        </div>

        {/* ৩. Expiring Soon */}
        <div
          className="stat-card"
          style={{
            backgroundColor: "#fffbeb",
            borderRadius: "1rem",
            padding: "1.2rem",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <div>
            <div
              className="stat-value"
              style={{
                fontSize: "1.8rem",
                fontWeight: "700",
                color: "#111827",
              }}
            >
              {expiringSoonCount}
            </div>
            <div
              className="stat-label"
              style={{ fontSize: "0.80rem", color: "#6b7280" }}
            >
              Expiring Soon
            </div>
            <div
              className="stat-change"
              style={{
                fontSize: "0.75rem",
                color: expiringSoonCount > 0 ? "#f59e0b" : "#10b981",
                marginTop: "4px",
              }}
            >
              {expiringSoonCount > 0 ? "⚠️ Next 3 days" : "✅ All secure"}
            </div>
          </div>
          <div
            className="stat-icon yellow"
            style={{
              backgroundColor: "#fef3c7",
              borderRadius: "9999px",
              border: "1px solid #fde68a",
              padding: "0.60rem",
            }}
          >
            <Hourglass style={{ color: "#f59e0b" }} size={20} />
          </div>
        </div>

        {/* ৪. Expired */}
        <div
          className="stat-card"
          style={{
            backgroundColor: "#fef2f2",
            borderRadius: "1rem",
            padding: "1.2rem",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <div>
            <div
              className="stat-value"
              style={{
                fontSize: "1.8rem",
                fontWeight: "700",
                color: "#111827",
              }}
            >
              {expiredCount}
            </div>
            <div
              className="stat-label"
              style={{ fontSize: "0.80rem", color: "#6b7280" }}
            >
              Expired
            </div>
            <div
              className="stat-change"
              style={{
                fontSize: "0.75rem",
                color: "#ef4444",
                marginTop: "4px",
              }}
            >
              {expiredCount > 0 ? "Needs renewal" : "No expired items"}
            </div>
          </div>
          <div
            className="stat-icon red"
            style={{
              backgroundColor: "#fee2e2",
              borderRadius: "9999px",
              border: "1px solid #fecaca",
              padding: "0.60rem",
            }}
          >
            <XOctagon style={{ color: "#ef4444" }} size={20} />
          </div>
        </div>
      </div>

      {/* ── ALERTS SECTION ── */}
      {(expiredSubs.length > 0 || upcomingAlerts.length > 0) && (
        <div
          className="alert-section"
          style={{ marginTop: "30px", marginBottom: "30px" }}
        >
          <div
            className="section-header"
            style={{
              marginBottom: "16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              className="section-title"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              <BellRing size={18} color="#6366f1" /> Upcoming Alerts
            </div>
            <span
              style={{
                fontSize: "12px",
                background: "#f3f4f6",
                padding: "4px 10px",
                borderRadius: "12px",
                color: "#6b7280",
              }}
            >
              Action Required
            </span>
          </div>

          {expiredSubs.map((sub) => (
            <div
              key={sub._id}
              className="alert red"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                padding: "16px",
                backgroundColor: "#fef2f2",
                borderRadius: "12px",
                border: "1px solid #fee2e2",
                marginBottom: "12px",
              }}
            >
              <div
                className="alert-icon red"
                style={{
                  backgroundColor: "#fee2e2",
                  borderRadius: "50%",
                  padding: "10px",
                  display: "flex",
                  color: "#ef4444",
                }}
              >
                <ShieldAlert size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <div
                  className="alert-title"
                  style={{
                    fontWeight: "700",
                    color: "#991b1b",
                    fontSize: "14px",
                  }}
                >
                  {sub.service?.name} expired
                </div>
                <div
                  className="alert-desc"
                  style={{ fontSize: "13px", color: "#b91c1c" }}
                >
                  Expired on {new Date(sub.expiryDate).toLocaleDateString()} ·{" "}
                  <strong>£{sub.cost}/mo</strong>
                </div>
              </div>
              <div className="alert-action">
                <button
                  className="btn btn-danger btn-sm"
                  style={{ padding: "6px 12px", fontSize: "12px" }}
                >
                  Reactivate
                </button>
              </div>
            </div>
          ))}

          {upcomingAlerts.map((sub) => {
            const diffDays = Math.ceil(
              (new Date(sub.expiryDate) - today) / (1000 * 60 * 60 * 24),
            );
            return (
              <div
                key={sub._id}
                className="alert yellow"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  padding: "16px",
                  backgroundColor: "#fffbeb",
                  borderRadius: "12px",
                  border: "1px solid #fef3c7",
                  marginBottom: "12px",
                }}
              >
                <div
                  className="alert-icon yellow"
                  style={{
                    backgroundColor: "#fef3c7",
                    borderRadius: "50%",
                    padding: "10px",
                    display: "flex",
                    color: "#d97706",
                  }}
                >
                  <Clock size={20} />
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    className="alert-title"
                    style={{
                      fontWeight: "700",
                      color: "#92400e",
                      fontSize: "14px",
                    }}
                  >
                    {sub.service?.name} expiring in {diffDays}{" "}
                    {diffDays === 1 ? "day" : "days"}
                  </div>
                  <div
                    className="alert-desc"
                    style={{ fontSize: "13px", color: "#b45309" }}
                  >
                    Renews on {new Date(sub.expiryDate).toLocaleDateString()} ·{" "}
                    <strong>£{sub.cost}/mo</strong>
                  </div>
                </div>
                <div className="alert-action">
                  <button
                    className="btn btn-secondary btn-sm"
                    style={{
                      padding: "6px 12px",
                      fontSize: "12px",
                      backgroundColor: "#fff",
                      border: "1px solid #fbbf24",
                    }}
                  >
                    Renew
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── DASHBOARD GRID ── */}
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
            <Link to="/dashboard/subscriptions">
              <button className="flex items-center gap-1 px-3 py-3 bg-[#f9fafb] border border-[#e5e7eb] rounded-lg text-[12.5px] font-bold text-[#4b5563] hover:bg-gray-100 transition-all group">
                View all
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </Link>
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
                  {/* ডায়নামিক Recent Subscriptions Map */}
                  {recentSubscriptions.length > 0 ? (
                    recentSubscriptions.map((sub) => {
                      const isExpired = new Date(sub.expiryDate) < today;
                      return (
                        <tr
                          key={sub._id}
                          className="hover:bg-slate-50 transition-colors cursor-pointer group"
                        >
                          <td className="py-3.5 px-5">
                            <div className="flex items-center gap-3">
                              <div
                                className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold shadow-sm group-hover:scale-105 transition-transform shrink-0"
                                style={{
                                  backgroundColor:
                                    sub.service?.brandColor || "#3b82f6",
                                }}
                              >
                                {sub.service?.name?.charAt(0)}
                              </div>
                              <div>
                                <div className="font-bold text-gray-900 text-[13.5px]">
                                  {sub.service?.name}
                                </div>
                                <div className="text-[11px] text-gray-500">
                                  {sub.bankName || "Standard"}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-5">
                            <div className="flex items-baseline gap-1">
                              <div className="font-bold text-gray-900 text-[13.5px]">
                                £{sub.cost}
                              </div>
                              <div className="text-[11px] text-gray-500 font-medium">
                                / month
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-5 text-[13px] text-gray-600 font-medium">
                            {new Date(sub.expiryDate).toLocaleDateString()}
                          </td>
                          <td className="py-3.5 px-5">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                                isExpired
                                  ? "bg-[#fef2f2] text-[#ef4444] border-[#fee2e2]"
                                  : "bg-[#ecfdf5] text-[#10b981] border-[#d1fae5]"
                              }`}
                            >
                              {isExpired ? "Expired" : "Active"}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="py-8 text-center text-gray-400 text-sm"
                      >
                        No recent subscriptions found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Upcoming Payments & Mini Chart Card */}
        <div className="card">
          <div className="card-title">Upcoming Payments</div>
          <div className="upcoming-list">
            {/* ডায়নামিক Upcoming Payments Map */}
            {upcomingPayments.length > 0 ? (
              upcomingPayments.map((sub) => {
                const diffDays = Math.ceil(
                  (new Date(sub.expiryDate) - today) / (1000 * 60 * 60 * 24),
                );
                const isUrgent = diffDays <= 7; // ৭ দিনের কম হলে লাল দেখাবে
                return (
                  <div key={sub._id} className="upcoming-item">
                    <div className="upcoming-days">
                      <div
                        className="days-num"
                        style={{ color: isUrgent ? "#ef4444" : "#10b981" }}
                      >
                        {diffDays}
                      </div>
                      <div className="days-label">days</div>
                    </div>
                    <div
                      className="service-logo"
                      style={{ background: sub.service?.brandColor || "#ccc" }}
                    >
                      {sub.service?.name?.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="upcoming-name">{sub.service?.name}</div>
                      <div className="upcoming-cost">
                        <span>£{sub.cost}</span> / mo
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div
                style={{
                  padding: "15px 0",
                  fontSize: "13px",
                  color: "#6b7280",
                  textAlign: "center",
                }}
              >
                No upcoming payments.
              </div>
            )}
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
                  {/* কারেন্ট মান্থের বারের হাইট ডায়নামিক করার জন্য আপনি monthlySpend এর ওপর ভিত্তি করে একটা পার্সেন্টেজ বানাতে পারেন, আপাতত স্ট্যাটিক রাখছি */}
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
                <span>£0</span>
                {/* ডায়নামিক Monthly Spend */}
                <span style={{ fontWeight: "bold", color: "#111827" }}>
                  £{monthlySpend} this month
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
