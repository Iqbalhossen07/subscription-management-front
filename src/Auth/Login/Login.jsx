import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import Swal from "sweetalert2"; // SweetAlert ইমপোর্ট
import axios from "axios"; // API কল করার জন্য
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    // বেসিক ভ্যালিডেশন
    if (!form.email || !form.password) {
      return Swal.fire({
        icon: "warning",
        title: "থামুন ভাই!",
        text: "ইমেইল আর পাসওয়ার্ড তো দিলেন না!",
        confirmButtonColor: "#2563eb",
      });
    }

    setLoading(true);

    try {
      // ব্যাকএন্ডে লগইন রিকোয়েস্ট
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: form.email,
          password: form.password,
        },
      );

      // সাকসেস মেসেজ
      Swal.fire({
        icon: "success",
        title: "লগইন সফল! 🚀",
        text: `স্বাগতম ${response.data.name} ভাই, আপনার ড্যাশবোর্ড রেডি।`,
        timer: 2000,
        showConfirmButton: false,
      });

      // টোকেন এবং ইউজার ডাটা ব্রাউজারে সেভ করা
      localStorage.setItem("userToken", response.data.token);
      localStorage.setItem("userInfo", JSON.stringify(response.data));

      // ২ সেকেন্ড পর ড্যাশবোর্ডে রিডাইরেক্ট
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      // এরর মেসেজ হ্যান্ডলিং (ভুল ইমেইল বা পাসওয়ার্ড)
      Swal.fire({
        icon: "error",
        title: "এক্সেস ডিনাইড!",
        text:
          error.response?.data?.message ||
          "ইমেইল বা পাসওয়ার্ড মনে হয় ভুল দিয়েছেন ভাই!",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ── HEADER ── */}
      <div className="login-header">
        <h1 className="login-title">Welcome back 👋</h1>
        <p className="login-subtitle">
          Sign in to your SubTrack account to continue
        </p>
      </div>

      {/* ── FORM ── */}
      <form className="login-form" onSubmit={handleSubmit} noValidate>
        {/* Email */}
        <div className="field-group">
          <label className="field-label">Email address</label>
          <div className="input-wrap">
            <span className="input-icon">
              <Mail size={15} />
            </span>
            <input
              className="field-input"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange("email")}
              required
              autoComplete="email"
              autoFocus
            />
          </div>
        </div>

        {/* Password */}
        <div className="field-group">
          <div className="field-label-row">
            <label className="field-label">Password</label>
            <a href="#" className="forgot-link">
              Forgot password?
            </a>
          </div>
          <div className="input-wrap">
            <span className="input-icon">
              <Lock size={15} />
            </span>
            <input
              className="field-input has-right-icon"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange("password")}
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
              aria-label="Toggle password"
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>

        {/* Remember me */}
        <label className="remember-row">
          <input type="checkbox" />
          <span>Remember me for 30 days</span>
        </label>

        {/* Submit */}
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? (
            "Signing in..."
          ) : (
            <>
              Sign in <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>

      {/* Switch */}
      <p className="switch-text">
        Don't have an account?{" "}
        <Link to="/auth/register" className="switch-link">
          Create one free
        </Link>
      </p>
    </>
  );
}

export default Login;
