import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function EditSubscription() {
  const { id } = useParams(); // URL থেকে ID নেওয়া
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [sortCode, setSortCode] = useState("");
  const [loading, setLoading] = useState(true);

  // ফর্ম স্টেট
  const [formData, setFormData] = useState({
    service: "",
    billingCycle: "1",
    cost: "",
    startDate: "",
    accountHolderName: "",
    bankName: "",
    accountNumber: "",
  });

  // ১. প্রয়োজনীয় ডাটা লোড করা (Services + Existing Subscription Data)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const config = { headers: { Authorization: `Bearer ${token}` } };

        // সকল সার্ভিস লিস্ট আনা
        const servicesRes = await axios.get(
          "http://localhost:5000/api/services",
          config,
        );
        setServices(servicesRes.data);

        // এডিট করার জন্য নির্দিষ্ট সাবস্ক্রিপশন ডাটা আনা
        const subRes = await axios.get(
          `http://localhost:5000/api/subscriptions/${id}`,
          config,
        );
        const sub = subRes.data;

        // ফর্মে ডাটা সেট করা
        setFormData({
          service: sub.service?._id || sub.service,
          billingCycle: sub.billingCycle.toString(),
          cost: sub.cost,
          startDate: new Date(sub.startDate).toISOString().split("T")[0],
          accountHolderName: sub.accountHolderName,
          bankName: sub.bankName,
          accountNumber: sub.accountNumber,
        });
        setSortCode(sub.sortCode);
        setLoading(false);
      } catch (err) {
        console.error("ডাটা লোড করতে সমস্যা:", err.message);
        Swal.fire("Error!", "ডাটা খুঁজে পাওয়া যায়নি", "error");
        navigate("/dashboard/subscriptions");
      }
    };
    fetchData();
  }, [id, navigate]);

  // Sort Code অটো-ফরম্যাট
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ২. আপডেট করা (PUT Request)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const userId = userInfo?._id;

    const date = new Date(formData.startDate);
    date.setMonth(date.getMonth() + parseInt(formData.billingCycle));
    const calculatedExpiry = date.toISOString().split("T")[0];

    try {
      const token = localStorage.getItem("userToken");
      const submissionData = {
        ...formData,
        billingCycle: Number(formData.billingCycle),
        cost: Number(formData.cost),
        expiryDate: calculatedExpiry,
        sortCode: sortCode,
        createdBy: userId,
      };

      await axios.put(
        `http://localhost:5000/api/subscriptions/${id}`,
        submissionData,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      Swal.fire("Updated!", "The subscription has been updated.!", "success");
      navigate("/dashboard/subscriptions");
    } catch (err) {
      Swal.fire(
        "Error!",
        err.response?.data?.message || "The update has failed.",
        "error",
      );
    }
  };

  if (loading) return <div className="page active">Loading Data...</div>;

  return (
    <div className="page active">
      <div className="section-header">
        <div>
          <div className="section-title">Edit Subscription</div>
          <div className="section-subtitle">
            Update your subscription details
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
             Update Details
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Service *</label>
              <select
                className="form-select"
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
              >
                <option value="">Select a service...</option>
                {services.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Billing Cycle *</label>
              <select
                className="form-select"
                name="billingCycle"
                value={formData.billingCycle}
                onChange={handleChange}
              >
                {[1, 2, 3, 6, 12].map((m) => (
                  <option key={m} value={m}>
                    {m} Month
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Cost *</label>
              <div className="input-prefix">
                <div className="prefix-symbol">£</div>
                <input
                  className="form-input"
                  name="cost"
                  type="number"
                  step="0.01"
                  value={formData.cost}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Start Date *</label>
              <input
                className="form-input"
                name="startDate"
                type="date"
                value={formData.startDate}
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
             Bank Details
          </div>

          <div className="form-grid">
            <div className="form-group full">
              <label className="form-label">Account Holder Name *</label>
              <input
                className="form-input"
                name="accountHolderName"
                type="text"
                value={formData.accountHolderName}
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
                value={formData.bankName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Sort Code *</label>
              <input
                className="form-input"
                type="text"
                value={sortCode}
                onChange={handleSortCode}
                maxLength={8}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Account Number *</label>
              <input
                className="form-input"
                name="accountNumber"
                type="text"
                value={formData.accountNumber}
                onChange={handleChange}
                maxLength={8}
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <Link to="/dashboard/subscriptions">
              <button type="button" className="btn btn-secondary">
                Cancel
              </button>
            </Link>
            <button type="submit" className="btn btn-primary">
               Update Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditSubscription;
