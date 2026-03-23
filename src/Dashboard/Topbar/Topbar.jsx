import React from "react";
import { useLocation } from "react-router";

function Topbar({ toggleSidebar }) {
  const location = useLocation();

  // URL অনুযায়ী পেজের নাম ঠিক করার জন্য
  const getPageTitle = () => {
    if (location.pathname.includes("subscriptions")) return "Subscriptions";
    return "Dashboard";
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="hamburger" onClick={toggleSidebar}>
          ☰
        </button>
        <div>
          <div className="page-title">{getPageTitle()}</div>
        </div>
      </div>
      <div className="topbar-right">
        <div className="topbar-search">🔍 &nbsp; Search subscriptions...</div>
        <button className="icon-btn" data-tip="Notifications">
          🔔
          <span className="notif-dot"></span>
        </button>
        <button className="icon-btn" data-tip="Settings">
          ⚙️
        </button>
      </div>
    </header>
  );
}

export default Topbar;
