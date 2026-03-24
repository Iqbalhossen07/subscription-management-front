import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
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
    setLoading(true);
    // তোমার login API call এখানে
    await new Promise((r) => setTimeout(r, 800));
    navigate("/dashboard");
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
              {" "}
              Sign in <ArrowRight size={16} />{" "}
            </>
          )}
        </button>
      </form>

      {/* Switch */}
      <p className="switch-text">
        Don't have an account?{" "}
        <Link to="/register" className="switch-link">
          Create one free
        </Link>
      </p>
    </>
  );
}

export default Login;
