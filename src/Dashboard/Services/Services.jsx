import React, { useState, useEffect } from "react";
import ServiceModal from "./ServiceModal";
import axios from "axios";
import Swal from "sweetalert2";
import { Plus, Pencil, Trash2, LayoutGrid } from "lucide-react";

function Services() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(true);

  // ── ডাটা নিয়ে আসা ──
  const fetchServices = async () => {
    const userToken = localStorage.getItem("userToken");
    if (!userToken) return;

    try {
      const config = {
        headers: { Authorization: `Bearer ${userToken}` },
      };
      const { data } = await axios.get(
        "http://localhost:5000/api/services",
        config,
      );
      setServices(data);
      setLoading(false);
    } catch (err) {
      console.log(err.response?.data?.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleAddClick = () => {
    setSelectedService(null);
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleEditClick = (service) => {
    setSelectedService(service);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete this service?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        };
        await axios.delete(`http://localhost:5000/api/services/${id}`, config);
        Swal.fire("Deleted!", "Successfully deleted.", "success");
        fetchServices();
      } catch (err) {
        Swal.fire("Error!", "Could not delete.", "error");
      }
    }
  };

  if (loading)
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "#6b7280" }}>
        Loading Services...
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
            Service Catalog
          </h1>
          <p style={{ margin: "6px 0 0", color: "#6b7280", fontSize: "14px" }}>
            Manage the catalog of available services and platforms
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={handleAddClick}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 20px",
          }}
        >
          <Plus size={18} /> Add New Service
        </button>
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
              minWidth: "800px",
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
                    width: "80px",
                  }}
                >
                  #ID
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
                  Category
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
                  Brand Color
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
              {services.length > 0 ? (
                services.map((s, index) => (
                  <tr
                    key={s._id}
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
                    <td
                      style={{
                        padding: "16px 24px",
                        color: "#9ca3af",
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "13px",
                      }}
                    >
                      {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </td>
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
                            backgroundColor: s.brandColor || "#6366f1",
                            width: "40px",
                            height: "40px",
                            borderRadius: "12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            fontWeight: "bold",
                            fontSize: "16px",
                            flexShrink: 0,
                          }}
                        >
                          {s.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div
                          style={{
                            fontWeight: "700",
                            color: "#111827",
                            fontSize: "15px",
                          }}
                        >
                          {s.name}
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "16px 24px" }}>
                      <span
                        style={{
                          backgroundColor: "#f3f4f6",
                          color: "#4b5563",
                          padding: "4px 10px",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: "600",
                        }}
                      >
                        {s.category}
                      </span>
                    </td>
                    <td style={{ padding: "16px 24px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <div
                          style={{
                            width: "24px",
                            height: "12px",
                            borderRadius: "4px",
                            backgroundColor: s.brandColor,
                          }}
                        ></div>
                        <span
                          style={{
                            fontFamily: "'DM Mono'",
                            fontSize: "13px",
                            color: "#6b7280",
                          }}
                        >
                          {s.brandColor}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: "16px 24px" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          gap: "10px",
                        }}
                      >
                        <button
                          onClick={() => handleEditClick(s)}
                          style={{
                            padding: "8px",
                            borderRadius: "8px",
                            border: "1px solid #e5e7eb",
                            display: "flex",
                            color: "#4b5563",
                            cursor: "pointer",
                            background: "none",
                          }}
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(s._id)}
                          style={{
                            padding: "8px",
                            borderRadius: "8px",
                            border: "1px solid #fee2e2",
                            display: "flex",
                            cursor: "pointer",
                            background: "none",
                          }}
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
                    colSpan={5}
                    style={{
                      padding: "80px",
                      textAlign: "center",
                      color: "#9ca3af",
                    }}
                  >
                    <LayoutGrid
                      size={40}
                      style={{ marginBottom: "10px", opacity: 0.2 }}
                    />
                    <div style={{ fontSize: "16px" }}>
                      No services found in catalog.
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isEdit={isEditMode}
        serviceData={selectedService}
        refreshData={fetchServices}
      />
    </div>
  );
}

export default Services;
