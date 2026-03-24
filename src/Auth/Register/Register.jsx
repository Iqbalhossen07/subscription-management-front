import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import "./Register.css";
/* Login.css থেকে shared styles (.field-group, .input-wrap, .submit-btn ইত্যাদি) use হবে */
import "../Login/Login.css";

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
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const strength = calcStrength(form.password);
  const strengthMeta = STRENGTH_META[strength - 1];
  const passwordsMatch = form.confirm === "" || form.password === form.confirm;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passwordsMatch) return;

    setLoading(true);
    // তোমার register API call এখানে
    await new Promise((r) => setTimeout(r, 900)); // placeholder
    navigate("/dashboard");
  };

  return (
    <>
      {/* Mobile logo */}
      <div className="register-mobile-logo">
        <div className="register-mobile-logo-icon">📊</div>
        <span className="register-mobile-logo-text">
          Sub<span>Track</span>
        </span>
      </div>

      {/* ── HEADER ── */}
      <div className="register-header">
        <h1 className="register-title">Create your account</h1>
        <p className="register-subtitle">
          Free forever · No credit card required
        </p>
      </div>

      {/* ── FORM ── */}
      <form className="register-form" onSubmit={handleSubmit} noValidate>
        {/* First + Last Name */}
       
          <div className="field-group">
            <label className="field-label">First Name *</label>
            <div className="input-wrap">
              <span className="input-icon">
                <User size={15} />
              </span>
              <input
                className="field-input"
                type="text"
                placeholder="John"
                value={form.firstName}
                onChange={handleChange("firstName")}
                required
                autoFocus
                autoComplete="given-name"
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
              autoComplete="email"
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
              placeholder="Min. 8 characters"
              value={form.password}
              onChange={handleChange("password")}
              required
              autoComplete="new-password"
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

          {/* Strength indicator */}
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

       


        {/* Submit */}
        <button
          type="submit"
          className="submit-btn"
          disabled={loading || !passwordsMatch}
        >
          {loading ? (
            "Creating account..."
          ) : (
            <>
              Create free account <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>

      {/* Switch to Login */}
      <p className="switch-text">
        Already have an account?{" "}
        <Link to="/login" className="switch-link">
          Sign in
        </Link>
      </p>
    </>
  );
}

export default Register;
