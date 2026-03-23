import React from "react";
import { NavLink } from "react-router";

function Sidebar({ isOpen, closeSidebar }) {
  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`} id="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">📊</div>
        <div>
          <div className="logo-text">
            Sub<span>Track</span>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-section-label">Overview</div>

        {/* NavLink অটোমেটিক active ক্লাস অ্যাড করবে যদি URL ম্যাচ করে */}
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          onClick={closeSidebar}
        >
          <span className="nav-icon">🏠</span> Dashboard
        </NavLink>

        <NavLink
          to="/dashboard/subscriptions"
          className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          onClick={closeSidebar}
        >
          <span className="nav-icon">🔁</span> Subscriptions
          <span className="nav-badge">2</span>
        </NavLink>

        <div className="sidebar-section-label">Manage</div>
        <div className="nav-item">
          <span className="nav-icon">➕</span> Add Subscription
        </div>
      

        <NavLink
          to="/dashboard/services"
          end
          className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          onClick={closeSidebar}
        >
          <span className="nav-icon">⚙️</span> Services
        </NavLink>

        <div className="sidebar-section-label">Account</div>
        <div className="nav-item">
          <span className="nav-icon">👤</span> Profile
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="user-block">
          <div className="user-avatar">AK</div>
          <div>
            <div className="user-name">Alex Kim</div>
            <div className="user-role">Pro Plan</div>
          </div>
          <div className="user-menu-icon">⋯</div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
