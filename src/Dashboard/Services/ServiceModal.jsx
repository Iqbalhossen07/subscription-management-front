import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function ServiceModal({ isOpen, onClose, isEdit, serviceData, refreshData }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "Streaming",
    brandColor: "#3b82f6",
  });

  useEffect(() => {
    if (isEdit && serviceData) {
      setFormData(serviceData);
    } else {
      setFormData({ name: "", category: "Streaming", brandColor: "#3b82f6" });
    }
  }, [isEdit, serviceData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      };
      if (isEdit) {
        await axios.put(
          `http://localhost:5000/api/services/${serviceData._id}`,
          formData,
          config,
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/services",
          formData,
          config,
        );
      }
      Swal.fire("Saved!", "Service data updated successfully.", "success");
      refreshData();
      onClose();
    } catch (err) {
      Swal.fire(
        "Error!",
        err.response?.data?.message || "Something went wrong",
        "error",
      );
    }
  };

  return (
    <div className={`modal-overlay ${isOpen ? "open" : ""}`} onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div className="modal-title">
              {isEdit ? "✏️ Edit Service" : "➕ Add Service"}
            </div>
            <div className="modal-subtitle">
              {isEdit
                ? "Update existing service details"
                : "Define a new service"}
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-grid">
              <div className="form-group full">
                <label className="form-label">Service Name *</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="e.g. Netflix"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              

              <div className="form-group full">
                <label className="form-label">Category *</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="e.g. Netflix"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Brand Color</label>
                <input
                  className="form-input"
                  type="color"
                  value={formData.brandColor}
                  onChange={(e) =>
                    setFormData({ ...formData, brandColor: e.target.value })
                  }
                  style={{ height: "42px", cursor: "pointer" }}
                />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {isEdit ? " Update Service" : " Save Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ServiceModal;
