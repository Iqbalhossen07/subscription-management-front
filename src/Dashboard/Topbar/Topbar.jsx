import React from "react";
import { useLocation } from "react-router";

function Topbar({ toggleSidebar }) {
  const location = useLocation();

  // URL অনুযায়ী পেজের নাম ঠিক করার জন্য
  const getPageTitle = () => {
    if (location.pathname.includes("Welcome to Track Subscription Admin Panel"))
      return "Welcome to Track Subscription Admin Panel";
    return "Welcome to Track Subscription Admin Panel";
  };

  return (
    <header className="topbar mt-20 md:mt-0">
      <div className="topbar-left">
        <div>
          <div className="page-title">{getPageTitle()}</div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
