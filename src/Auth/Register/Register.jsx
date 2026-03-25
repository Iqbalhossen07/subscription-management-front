import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import Swal from "sweetalert2"; // SweetAlert ইমপোর্ট
import axios from "axios"; // API কল করার জন্য
import "./Register.css";

/* ── Password strength calculator ── */
function calcStrength(password) {
  if (!password) return 0;
  let s = 0;
  if (password.length >= 8) s++;
  if (/[A-Z]/.test(password)) s++;
  if (/[0-9]/.test(password)) s++;
  if (/[^A-Za-z0-9]/.test(password)) s++;
  return s;
}

const STRENGTH_META = [
  { label: "Weak", cls: "s1" },
  { label: "Fair", cls: "s2" },
  { label: "Good", cls: "s3" },
  { label: "Strong", cls: "s4" },
];

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "", // ব্যাকএন্ডে শুধু 'name' ছিল, তাই firstName lastName বদলে name রাখলাম
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const strength = calcStrength(form.password);
  const strengthMeta = STRENGTH_META[strength - 1];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // বেসিক ভ্যালিডেশন
    if (!form.name || !form.email || !form.password) {
      return Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Please fill in all the fields",
        confirmButtonColor: "#2563eb",
      });
    }

    setLoading(true);

    try {
      // আপনার ব্যাকএন্ড API URL (নিশ্চিত হোন ব্যাকএন্ড চালু আছে)
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: form.name,
          email: form.email,
          password: form.password,
        },
      );

      // সাকসেস মেসেজ
      Swal.fire({
        icon: "success",
        title: "Welcome!",
        text: "Your account has been created",
        timer: 2000,
        showConfirmButton: false,
      });

      // টোকেন সেভ করা (ভবিষ্যতের কাজের জন্য)
      localStorage.setItem("userToken", response.data.token);
      localStorage.setItem("userInfo", JSON.stringify(response.data));

      // ২ সেকেন্ড পর ড্যাশবোর্ডে পাঠানো
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      // এরর মেসেজ হ্যান্ডলিং
      Swal.fire({
        icon: "error",
        title: "wrong!",
        text:
          error.response?.data?.message || "There is a problem with the server",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="register-mobile-logo">
        <div className="register-mobile-logo-icon">📊</div>
        <span className="register-mobile-logo-text">
          Sub<span>Track</span>
        </span>
      </div>

      <div className="register-header">
        <h1 className="register-title">Create your account</h1>
        <p className="register-subtitle">
          Free forever · No credit card required
        </p>
      </div>

      <form className="register-form" onSubmit={handleSubmit} noValidate>
        {/* Full Name */}
        <div className="field-group">
          <label className="field-label">Full Name *</label>
          <div className="input-wrap">
            <span className="input-icon">
              <User size={15} />
            </span>
            <input
              className="field-input"
              type="text"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange("name")}
              required
              autoFocus
            />
          </div>
        </div>

        {/* Email */}
        <div className="field-group">
          <label className="field-label">Email address *</label>
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
            />
          </div>
        </div>

        {/* Password */}
        <div className="field-group">
          <label className="field-label">Password *</label>
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

          {form.password && (
            <div className="strength-wrap">
              <div className="strength-bar">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`strength-seg ${i <= strength ? `filled-${strength}` : ""}`}
                  />
                ))}
              </div>
              {strengthMeta && (
                <span className={`strength-label ${strengthMeta.cls}`}>
                  {strengthMeta.label}
                </span>
              )}
            </div>
          )}
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? (
            "Creating account..."
          ) : (
            <>
              Create free account <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>

      <p className="switch-text">
        Already have an account?{" "}
        <Link to="/auth/login" className="switch-link">
          Sign in
        </Link>
      </p>
    </>
  );
}

export default Register;
