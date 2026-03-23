import React from "react";

function DeleteModal({
  isOpen,
  onClose,
  onDelete,
  title = "Confirm Deletion",
}) {
  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isOpen ? "open" : ""}`} onClick={onClose}>
      <div className="modal modal-sm" onClick={(e) => e.stopPropagation()}>
        <div
          className="modal-body"
          style={{ paddingTop: "28px", textAlign: "center" }}
        >
          {/* আপনার অরিজিনাল ডিজাইনের ডিলিট আইকন */}
          <div className="delete-icon-wrap">🗑️</div>
          <div
            style={{ fontSize: "17px", fontWeight: 700, marginBottom: "8px" }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: "13.5px",
              color: "var(--text-secondary)",
              lineHeight: 1.6,
            }}
          >
            Are you sure you want to delete this item? This action{" "}
            <strong>cannot be undone</strong> and all associated data will be
            permanently removed.
          </div>
        </div>

        <div
          className="modal-footer"
          style={{
            justifyContent: "center",
            gap: "12px",
            paddingBottom: "28px",
          }}
        >
          <button
            className="btn btn-secondary"
            onClick={onClose}
            style={{ minWidth: "100px" }}
          >
            Cancel
          </button>
          <button
            className="btn btn-danger"
            onClick={onDelete}
            style={{ minWidth: "100px" }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
