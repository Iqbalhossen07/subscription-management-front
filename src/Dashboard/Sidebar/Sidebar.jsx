import React from "react";
import { NavLink } from "react-router";
// মডার্ন এবং প্রিমিয়াম আইকন ইমপোর্ট করছি
import {
  LayoutDashboard,
  Repeat,
  PlusCircle,
  Settings,
  UserCircle,
  MoreHorizontal,
  BarChart3,
} from "lucide-react";

function Sidebar({ isOpen, closeSidebar }) {
  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`} id="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <BarChart3 size={20} strokeWidth={2.5} />
        </div>
        <div>
          <div className="logo-text">
            Sub<span>Track</span>
          </div>
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
          end
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
          end
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
          end
          className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          onClick={closeSidebar}
        >
          <span className="nav-icon">
            <UserCircle size={18} />
          </span>{" "}
          Profile
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <div className="user-block">
          <div className="user-avatar">AK</div>
          <div>
            <div className="user-name">Alex Kim</div>
            <div className="user-role">Pro Plan</div>
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
