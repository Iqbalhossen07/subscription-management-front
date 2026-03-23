import React, { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../Dashboard/Sidebar/Sidebar";
import Topbar from "../Dashboard/Topbar/Topbar";

function Root() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <>
      {/* SIDEBAR OVERLAY (mobile) */}
      <div
        className={`sidebar-overlay ${isSidebarOpen ? "open" : ""}`}
        onClick={closeSidebar}
      ></div>

      {/* SIDEBAR */}
      <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />

      {/* MAIN CONTENT AREA */}
      <div className="main">
        <Topbar toggleSidebar={toggleSidebar} />

        <div className="content">
          {/* Outlet এর জায়গায় ডাইনামিক ভাবে Dashboard বা Subscriptions লোড হবে */}
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Root;
