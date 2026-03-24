import React from "react";
import { NavLink, useNavigate } from "react-router"; // useNavigate ইমপোর্ট করলাম
import Swal from "sweetalert2"; // সুন্দর এলার্টের জন্য
import {
  LayoutDashboard,
  Repeat,
  PlusCircle,
  Settings,
  UserCircle,
  MoreHorizontal,
  BarChart3,
  LogOut, // লগআউট আইকন
} from "lucide-react";

function Sidebar({ isOpen, closeSidebar }) {
  const navigate = useNavigate();

  // ১. লোকাল স্টোরেজ থেকে ইউজারের ডাটা নিয়ে আসা
  const storedUser = localStorage.getItem("userInfo");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // ২. নামের প্রথম অক্ষর বের করা (Avatar এর জন্য)
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // 🚪 লগআউট ফাংশন
  const handleLogout = () => {
    Swal.fire({
      title: "লগআউট করবেন?",
      text: "আপনি আবার লগইন না করা পর্যন্ত ড্যাশবোর্ডে ঢুকতে পারবেন না।",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "হ্যাঁ, লগআউট করুন",
      cancelButtonText: "না",
    }).then((result) => {
      if (result.isConfirmed) {
        // ১. লোকাল স্টোরেজ ক্লিয়ার করা
        localStorage.removeItem("userToken");
        localStorage.removeItem("userInfo");

        // ২. লগইন পেজে পাঠিয়ে দেওয়া
        navigate("/auth/login");

        // ৩. সাইডবার বন্ধ করা (মোবাইলের জন্য)
        closeSidebar();
      }
    });
  };

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`} id="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <BarChart3 size={20} strokeWidth={2.5} />
        </div>
        <div className="logo-text">
          Sub<span>Track</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-section-label">Overview</div>
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          onClick={closeSidebar}
        >
          <span className="nav-icon">
            <LayoutDashboard size={18} />
          </span>{" "}
          Dashboard
        </NavLink>

        <NavLink
          to="/dashboard/subscriptions"
          className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          onClick={closeSidebar}
        >
          <span className="nav-icon">
            <Repeat size={18} />
          </span>{" "}
          Subscriptions
          <span className="nav-badge">2</span>
        </NavLink>

        <div className="sidebar-section-label">Manage</div>
        <NavLink
          to="/dashboard/add-subscription"
          className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          onClick={closeSidebar}
        >
          <span className="nav-icon">
            <PlusCircle size={18} />
          </span>{" "}
          Add Subscription
        </NavLink>

        <NavLink
          to="/dashboard/services"
          className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          onClick={closeSidebar}
        >
          <span className="nav-icon">
            <Settings size={18} />
          </span>{" "}
          Services
        </NavLink>

        <div className="sidebar-section-label">Account</div>
        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          onClick={closeSidebar}
        >
          <span className="nav-icon">
            <UserCircle size={18} />
          </span>{" "}
          Profile
        </NavLink>

        {/* 🚀 লগআউট বাটন যোগ করা হলো */}
        <button
          onClick={handleLogout}
          className="nav-item logout-btn-sidebar"
          style={{
            width: "100%",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#ef4444",
          }}
        >
          <span className="nav-icon">
            <LogOut size={18} />
          </span>
          Logout
        </button>
      </nav>

      <div className="sidebar-footer">
        <div className="user-block">
          {/* ইউজারের নামের ওপর ভিত্তি করে ডাইনামিক অবতার */}
          <div className="user-avatar">{getInitials(user?.name)}</div>
          <div>
            {/* ডাটাবেস থেকে আসা আসল নাম */}
            <div className="user-name">{user?.name || "User Name"}</div>
          </div>
          <div className="user-menu-icon">
            <MoreHorizontal size={18} />
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
