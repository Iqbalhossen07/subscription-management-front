import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function AddSubscription() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [sortCode, setSortCode] = useState("");

  // ফর্ম স্টেট
  const [formData, setFormData] = useState({
    service: "",
    billingCycle: "1",
    cost: "",
    startDate: new Date().toISOString().split("T")[0],
    accountHolderName: "",
    bankName: "",
    accountNumber: "",
  });

  // ১. ডাটাবেস থেকে সার্ভিসগুলো নিয়ে আসা
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const { data } = await axios.get(
          "http://localhost:5000/api/services",
          config,
        );
        setServices(data);
      } catch (err) {
        console.error("There is a problem loading the service.:", err.message);
      }
    };
    fetchServices();
  }, []);

  // Sort Code অটো-ফরম্যাট (12-34-56)
  const handleSortCode = (e) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 6);
    const formatted =
      raw.length <= 2
        ? raw
        : raw.length <= 4
          ? `${raw.slice(0, 2)}-${raw.slice(2)}`
          : `${raw.slice(0, 2)}-${raw.slice(2, 4)}-${raw.slice(4)}`;
    setSortCode(formatted);
  };

  // ইনপুট চেঞ্জ হ্যান্ডেলার
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ২. ডাটা সেভ করা
 const handleSubmit = async (e) => {
   e.preventDefault();

   const userInfo = JSON.parse(localStorage.getItem("userInfo"));
   const userId = userInfo?._id;

   if (!userId) return Swal.fire("Error!", "Login again", "error");

   // অটো এক্সপায়ারি ডেট ক্যালকুলেশন
   const date = new Date(formData.startDate);
   date.setMonth(date.getMonth() + parseInt(formData.billingCycle));
   const calculatedExpiry = date.toISOString().split("T")[0];

   try {
     const token = localStorage.getItem("userToken");

     // ডাটা অবজেক্ট - আপনার মডেলের সাথে ১০০% মিল রেখে
     const submissionData = {
       service: formData.service,
       billingCycle: Number(formData.billingCycle),
       cost: Number(formData.cost),
       startDate: formData.startDate,
       expiryDate: calculatedExpiry,
       accountHolderName: formData.accountHolderName,
       bankName: formData.bankName,
       accountNumber: formData.accountNumber,
       sortCode: sortCode, // আপনার স্টেট থেকে আসা ফরম্যাটেড কোড
       createdBy: userId, // মডেলে যেহেতু এই নাম আছে, তাই এটাই পাঠালাম
     };

     console.log("Final Data Sending:", submissionData);

     await axios.post(
       "http://localhost:5000/api/subscriptions",
       submissionData,
       { headers: { Authorization: `Bearer ${token}` } },
     );

     Swal.fire("Success!", "Data has been saved!", "success");
     navigate("/dashboard/subscriptions");
   } catch (err) {
     console.error("Server Error:", err.response?.data);
     Swal.fire(
       "Error!",
       err.response?.data?.message || "please check again",
       "error",
     );
   }
 };

  return (
    <div className="page active">
      <div className="section-header">
        <div>
          <div className="section-title">Add Subscription</div>
          <div className="section-subtitle">
            Track a new subscription or service
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="card">
          <div
            style={{
              fontWeight: 700,
              fontSize: "15px",
              marginBottom: "20px",
              paddingBottom: "14px",
              borderBottom: "1px solid var(--border)",
            }}
          >
            📋 Subscription Details
          </div>

          <div className="form-grid">
            {/* Service Dropdown (Dynamic) */}
            <div className="form-group">
              <label className="form-label">Service *</label>
              <select
                className="form-select"
                name="service"
                onChange={handleChange}
                required
              >
                <option value="">Select a service...</option>
                {services.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name} ({s.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Billing Cycle */}
            <div className="form-group">
              <label className="form-label">Billing Cycle *</label>
              <select
                className="form-select"
                name="billingCycle"
                onChange={handleChange}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m) => (
                  <option key={m} value={m}>
                    {m} Month
                  </option>
                ))}
              </select>
            </div>

            {/* Cost */}
            <div className="form-group">
              <label className="form-label">Cost *</label>
              <div className="input-prefix">
                <div className="prefix-symbol">£</div>
                <input
                  className="form-input"
                  name="cost"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Start Date */}
            <div className="form-group">
              <label className="form-label">Start Date *</label>
              <input
                className="form-input"
                name="startDate"
                type="date"
                defaultValue={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <hr className="divider" />

          <div
            style={{
              fontWeight: 700,
              fontSize: "15px",
              marginBottom: "20px",
              paddingBottom: "14px",
              borderBottom: "1px solid var(--border)",
            }}
          >
             UK Bank Details
          </div>

          <div className="form-grid">
            <div className="form-group full">
              <label className="form-label">Account Holder Name *</label>
              <input
                className="form-input"
                name="accountHolderName"
                type="text"
                placeholder="e.g. John Smith"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group full">
              <label className="form-label">Bank Name *</label>
              <input
                className="form-input"
                name="bankName"
                type="text"
                placeholder="e.g. Barclays, HSBC"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Sort Code *</label>
              <input
                className="form-input"
                type="text"
                placeholder="12-34-56"
                value={sortCode}
                onChange={handleSortCode}
                maxLength={8}
                required
              />
              <div className="form-help">Format: 12-34-56</div>
            </div>

            <div className="form-group">
              <label className="form-label">Account Number *</label>
              <input
                className="form-input"
                name="accountNumber"
                type="text"
                placeholder="12345678"
                maxLength={8}
                onChange={handleChange}
                required
              />
              <div className="form-help">8-digit UK account number</div>
            </div>
          </div>

          <div className="form-actions">
            <Link to="/dashboard/subscriptions">
              <button type="button" className="btn btn-secondary">
                Cancel
              </button>
            </Link>
            <button type="submit" className="btn btn-primary">
               Save Subscription
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddSubscription;
