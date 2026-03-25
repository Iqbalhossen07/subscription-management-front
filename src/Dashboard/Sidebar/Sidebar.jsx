import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  LayoutDashboard,
  Repeat,
  PlusCircle,
  Settings,
  UserCircle,
  MoreHorizontal,
  BarChart3,
  LogOut,
  Menu,
  X,
  ChevronRight, // মেনুর ভেতরে সুন্দর তীরের জন্য
} from "lucide-react";



function Sidebar({ isOpen, closeSidebar }) {
  const navigate = useNavigate();

  // স্ক্রিন সাইজ ট্র্যাক করার জন্য স্টেট
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);

    // মোবাইলে কন্টেন্ট যাতে হেডার ও বটম ন্যাভের নিচে না ঢুকে যায়
    if (isMobile) {
      document.body.style.paddingTop = "60px";
      document.body.style.paddingBottom = "70px";
    } else {
      document.body.style.paddingTop = "0px";
      document.body.style.paddingBottom = "0px";
    }

    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  // ১. লোকাল স্টোরেজ থেকে ইউজারের ডাটা
  const storedUser = localStorage.getItem("userInfo");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // ২. নামের প্রথম অক্ষর বের করা
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
      title: "Do you want to log out?",
      text: "You won’t be able to access the dashboard until you log in again.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, log me out.",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("userToken");
        localStorage.removeItem("userInfo");
        navigate("/auth/login");
        closeSidebar();
        setIsMobileMenuOpen(false);
      }
    });
  };

  // ─── DESKTOP VIEW (আগের মতোই থাকবে) ───
  if (!isMobile) {
    return (
      <aside className={`sidebar ${isOpen ? "open" : ""}`} id="sidebar">
        <div
          className="sidebar-logo flex items-center justify-center"
          style={{ padding: "20px 0", height: "auto" }}
        >
          {/* logo-text থেকে flex ক্লাসগুলো সরিয়ে শুধুমাত্র কন্টেইনার হিসেবে রাখা হলো */}
          <div className="logo-text">
            <img className="w-24" src="/logo.png" alt="logo" />
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
          </NavLink>

          <div className="sidebar-section-label">Manage</div>

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
            </span>{" "}
            Logout
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="user-block">
            <div className="user-avatar">{getInitials(user?.name)}</div>
            <div>
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

  // ─── MOBILE VIEW (APP VIBES) ───
  return (
    <>
      <style>{`
    /* Mobile Top Header - Updated for Clear Logo */
.mobile-header { 
  position: fixed; 
  top: 0; 
  left: 0; 
  right: 0; 
  height: 100px; /* ১০০ থেকে কমিয়ে ৮০ করলাম যাতে স্ক্রিন বেশি দখল না করে */
  background: white; 
  z-index: 40; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  box-shadow: 0 2px 10px rgba(0,0,0,0.05); 
  padding: 10px;
}

.mobile-logo { 
  display: flex; 
  align-items: center; 
  justify-content: center;
  width: 100%;
  
}

.mobile-logo img {
  height: auto;
  max-height: 100px; /* লোগোর উচ্চতা এখান থেকে কন্ট্রোল করবেন */
  width: auto;
  object-fit: contain;
  
}
        
        /* Mobile Bottom Navigation */
        .mobile-bottom-nav { position: fixed; bottom: 0; left: 0; right: 0; height: 65px; background: white; z-index: 40; display: flex; align-items: center; justify-content: space-around; box-shadow: 0 -4px 15px rgba(0,0,0,0.03); padding-bottom: env(safe-area-inset-bottom); border-top: 1px solid #f3f4f6; }
        .mobile-nav-item { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; font-size: 10px; font-weight: 600; color: #9ca3af; text-decoration: none; background: none; border: none; padding: 0; cursor: pointer; transition: color 0.2s; }
        .mobile-nav-item.active { color: #3b82f6; }
        
        /* Floating Add Button */
        .floating-add-btn { width: 50px; height: 50px; background: #3b82f6; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; transform: translateY(-15px); box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4); text-decoration: none; transition: transform 0.2s; }
        .floating-add-btn:active { transform: translateY(-12px) scale(0.95); }

        /* Full Screen Menu Overlay */
        .mobile-full-menu { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: #ffffff; z-index: 100; transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); display: flex; flex-direction: column; overflow: hidden; }
        .mobile-full-menu.open { transform: translateY(0); }
        
        .full-menu-header { padding: 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f3f4f6; }
        .full-menu-user { display: flex; align-items: center; gap: 12px; }
        .full-menu-avatar { width: 44px; height: 44px; border-radius: 50%; background: #eff6ff; color: #3b82f6; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 16px; }
        
        .full-menu-content { flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 12px; }
        
        .full-menu-link { display: flex; align-items: center; justify-content: space-between; padding: 16px; border-radius: 14px; background: #f9fafb; color: #4b5563; font-weight: 600; text-decoration: none; transition: background 0.2s; }
        .full-menu-link.active { background: #eff6ff; color: #3b82f6; }
        .full-menu-link-left { display: flex; align-items: center; gap: 14px; }
        .full-menu-icon { background: white; padding: 8px; border-radius: 10px; box-shadow: 0 1px 2px rgba(0,0,0,0.05); display: flex; }
        .full-menu-link.active .full-menu-icon { color: #3b82f6; }
      `}</style>

      {/* ১. Top Header - Only Project Name */}
      <div className="mobile-header">
        <div className="mobile-logo">
          <img
            src="/logo.png"
            alt="Track-Subscription"
            className="w-40 md:w-48" // Tailwind দিয়ে উইডথ একটু বাড়িয়ে দিলাম
            style={{ display: "block" }}
          />
        </div>
      </div>

      {/* ২. Bottom Navigation Bar */}
      <div className="mobile-bottom-nav">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `mobile-nav-item ${isActive ? "active" : ""}`
          }
        >
          <LayoutDashboard size={22} />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/dashboard/subscriptions"
          className={({ isActive }) =>
            `mobile-nav-item ${isActive ? "active" : ""}`
          }
        >
          <Repeat size={22} />
          <span>Subs</span>
        </NavLink>

        {/* Center Floating Add Button */}
        <NavLink to="/dashboard/add-subscription" className="floating-add-btn">
          <PlusCircle size={26} color="white" />
        </NavLink>

        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            `mobile-nav-item ${isActive ? "active" : ""}`
          }
        >
          <UserCircle size={22} />
          <span>Profile</span>
        </NavLink>

        {/* Hamburger Menu Button */}
        <button
          className="mobile-nav-item"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={22} />
          <span>Menu</span>
        </button>
      </div>

      {/* ৩. Full Screen Menu Overlay */}
      <div className={`mobile-full-menu ${isMobileMenuOpen ? "open" : ""}`}>
        {/* Menu Header with User Info & Close Button */}
        <div className="full-menu-header">
          <div className="full-menu-user">
            <div className="full-menu-avatar">{getInitials(user?.name)}</div>
            <div>
              <div
                style={{
                  fontWeight: "800",
                  fontSize: "16px",
                  color: "#111827",
                }}
              >
                {user?.name || "User Name"}
              </div>
              <div style={{ fontSize: "12px", color: "#6b7280" }}>
                Manage your account
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              background: "#f3f4f6",
              border: "none",
              padding: "8px",
              borderRadius: "50%",
              color: "#4b5563",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu Links */}
        <div className="full-menu-content">
          <div
            style={{
              fontSize: "12px",
              fontWeight: "bold",
              color: "#9ca3af",
              textTransform: "uppercase",
              marginBottom: "4px",
              paddingLeft: "4px",
            }}
          >
            Main Menu
          </div>

          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `full-menu-link ${isActive ? "active" : ""}`
            }
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="full-menu-link-left">
              <div className="full-menu-icon">
                <LayoutDashboard size={18} />
              </div>
              Dashboard Overview
            </div>
            <ChevronRight size={18} color="#9ca3af" />
          </NavLink>

          <NavLink
            to="/dashboard/subscriptions"
            className={({ isActive }) =>
              `full-menu-link ${isActive ? "active" : ""}`
            }
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="full-menu-link-left">
              <div className="full-menu-icon">
                <Repeat size={18} />
              </div>
              My Subscriptions
            </div>
            <ChevronRight size={18} color="#9ca3af" />
          </NavLink>

          <NavLink
            to="/dashboard/services"
            className={({ isActive }) =>
              `full-menu-link ${isActive ? "active" : ""}`
            }
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="full-menu-link-left">
              <div className="full-menu-icon">
                <Settings size={18} />
              </div>
              Services Catalog
            </div>
            <ChevronRight size={18} color="#9ca3af" />
          </NavLink>

          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `full-menu-link ${isActive ? "active" : ""}`
            }
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="full-menu-link-left">
              <div className="full-menu-icon">
                <UserCircle size={18} />
              </div>
              Account Profile
            </div>
            <ChevronRight size={18} color="#9ca3af" />
          </NavLink>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            style={{
              marginTop: "auto",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "16px",
              borderRadius: "14px",
              background: "#fef2f2",
              color: "#ef4444",
              border: "1px solid #fee2e2",
              fontWeight: "bold",
              fontSize: "15px",
            }}
          >
            <LogOut size={18} /> Log Out Securely
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
