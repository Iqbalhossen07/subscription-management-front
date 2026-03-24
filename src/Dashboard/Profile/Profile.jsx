import React, { useState, useRef } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { Eye, EyeOff, Camera, Trash2, Save, Lock, User } from "lucide-react";

function Profile() {
  const fileInputRef = useRef(null);
  const storedUser = JSON.parse(localStorage.getItem("userInfo"));
  const token = localStorage.getItem("userToken");

  // স্টেটস
  const [name, setName] = useState(storedUser?.name || "");
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showPass, setShowPass] = useState(false); // পাসওয়ার্ড দেখানো বা লুকানোর জন্য
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [preview, setPreview] = useState(storedUser?.image || null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // ১. ইমেজ সিলেক্ট ও প্রিভিউ
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // ২. Cloudinary-তে ইমেজ আপলোড ও প্রোফাইল আপডেট
  const handleImageUpload = async () => {
    if (!imageFile)
      return Swal.fire("ভুল!", "আগে একটি ছবি সিলেক্ট করুন!", "error");

    setLoading(true);
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "mop3imdh"); // আপনার প্রিসেট
    formData.append("cloud_name", "doihd0eib"); // আপনার ক্লাউড নাম

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/doihd0eib/image/upload",
        formData,
      );
      const imageUrl = res.data.secure_url;

      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.put(
        "http://localhost:5000/api/auth/profile",
        { image: imageUrl },
        config,
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      Swal.fire("সফল!", "প্রোফাইল ছবি আপডেট হয়েছে!", "success");
      setLoading(false);
    } catch (err) {
      Swal.fire("ব্যর্থ!", "ইমেজ আপলোড করা যায়নি!", "error");
      setLoading(false);
    }
  };

  // ৩. নাম আপডেট
  const handleUpdateName = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.put(
        "http://localhost:5000/api/auth/profile",
        { name },
        config,
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      Swal.fire("সফল!", "নাম পরিবর্তন করা হয়েছে।", "success");
    } catch (err) {
      Swal.fire("ব্যর্থ!", "সার্ভারে সমস্যা!", "error");
    }
  };

  // ৪. পাসওয়ার্ড আপডেট
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return Swal.fire("ভুল!", "পাসওয়ার্ড দুটি মেলেনি!", "error");
    }
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.put(
        "http://localhost:5000/api/auth/profile",
        { password: passwordData.newPassword },
        config,
      );
      setPasswordData({ newPassword: "", confirmPassword: "" });
      Swal.fire("সফল!", "পাসওয়ার্ড আপডেট হয়েছে।", "success");
    } catch (err) {
      Swal.fire("ব্যর্থ!", "পাসওয়ার্ড পরিবর্তন করা যায়নি!", "error");
    }
  };

  // ৫. একাউন্ট ডিলিট
  const handleDeleteAccount = () => {
    Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: "একবার ডিলিট করলে আপনার সব ডাটা চিরতরে মুছে যাবে!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "হ্যাঁ, ডিলিট করুন!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const config = { headers: { Authorization: `Bearer ${token}` } };
          await axios.delete("http://localhost:5000/api/auth/profile", config);
          localStorage.clear();
          window.location.href = "/auth/login";
        } catch (err) {
          Swal.fire("ভুল!", "ডিলিট করা যায়নি!", "error");
        }
      }
    });
  };

  return (
    <div className="page active">
      <div className="section-header">
        <div>
          <div className="section-title">Profile Settings</div>
          <div className="section-subtitle">Manage account and preferences</div>
        </div>
      </div>

      <div className="profile-grid">
        {/* LEFT: AVATAR CARD */}
        <div>
          <div className="card profile-avatar-card">
            <div
              className="profile-avatar-big"
              onClick={() => fileInputRef.current.click()}
              style={{ cursor: "pointer", position: "relative" }}
            >
              {preview ? (
                <img
                  src={preview}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              ) : (
                <span style={{ fontSize: "40px" }}>{name[0]}</span>
              )}
              <div
                style={{
                  position: "absolute",
                  bottom: "5px",
                  right: "5px",
                  background: "#fff",
                  borderRadius: "50%",
                  padding: "5px",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                }}
              >
                <Camera size={16} color="#666" />
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              hidden
              accept="image/*"
              onChange={handleFileChange}
            />
            <div className="profile-name">{name}</div>
            <div className="profile-email-small">{storedUser?.email}</div>
            <button
              className="btn btn-secondary"
              style={{ width: "100%", marginTop: "15px" }}
              onClick={handleImageUpload}
              disabled={loading}
            >
              {loading ? "⌛ Uploading..." : "💾 Update Photo"}
            </button>
          </div>
        </div>

        {/* RIGHT: FORMS */}
        <div>
          {/* নাম পরিবর্তন */}
          <div className="card" style={{ marginBottom: "20px" }}>
            <div
              style={{
                fontWeight: 700,
                marginBottom: "15px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <User size={18} /> Personal Information
            </div>
            <form onSubmit={handleUpdateName}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  className="form-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ marginTop: "10px" }}
              >
                Save Changes
              </button>
            </form>
          </div>

          {/* পাসওয়ার্ড পরিবর্তন (Show/Hide সহ) */}
          <div className="card" style={{ marginBottom: "20px" }}>
            <div
              style={{
                fontWeight: 700,
                marginBottom: "15px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Lock size={18} /> Change Password
            </div>
            <form onSubmit={handleUpdatePassword}>
              <div className="form-group" style={{ position: "relative" }}>
                <label className="form-label">New Password</label>
                <input
                  className="form-input"
                  type={showPass ? "text" : "password"}
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                />
                <div
                  onClick={() => setShowPass(!showPass)}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "35px",
                    cursor: "pointer",
                    color: "#666",
                  }}
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </div>
              </div>

              <div
                className="form-group"
                style={{ position: "relative", marginTop: "15px" }}
              >
                <label className="form-label">Confirm Password</label>
                <input
                  className="form-input"
                  type={showConfirmPass ? "text" : "password"}
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
                <div
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "35px",
                    cursor: "pointer",
                    color: "#666",
                  }}
                >
                  {showConfirmPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ marginTop: "20px" }}
              >
                Update Password
              </button>
            </form>
          </div>

          {/* DANGER ZONE */}
          <div className="danger-zone">
            <div className="dz-title">⚠️ Danger Zone</div>
            <div className="dz-desc">
              Once you delete your account, there is no going back.
            </div>
            <button
              onClick={handleDeleteAccount}
              className="btn btn-danger btn-sm"
              style={{ display: "flex", alignItems: "center", gap: "5px" }}
            >
              <Trash2 size={16} /> Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
