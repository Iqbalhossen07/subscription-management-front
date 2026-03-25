import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";
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

    if (!form.email || !form.password) {
      return Swal.fire({
        icon: "warning",
        title: "Wait!",
        text: "You didn’t provide the email and password!",
        confirmButtonColor: "#2563eb",
      });
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: form.email,
          password: form.password,
        },
      );

      Swal.fire({
        icon: "success",
        title: "Login successful.! 🚀",
        text: `Welcome ${response.data.name} your dashboard is ready.`,
        timer: 2000,
        showConfirmButton: false,
      });

      localStorage.setItem("userToken", response.data.token);
      localStorage.setItem("userInfo", JSON.stringify(response.data));

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Access denied.",
        text:
          error.response?.data?.message ||
          "It seems you have entered the wrong email or password",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setLoading(false);
    }
  };

  const inputWrapClass =
    "relative flex items-center overflow-hidden rounded-xl border-[1.5px] border-[#e4e7ec] bg-white transition focus-within:border-blue-400 focus-within:ring-[3.5px] focus-within:ring-blue-500/15";

  const inputClass =
    "w-full border-0 bg-transparent py-2.5 text-sm leading-snug text-[#0d1117] outline-none placeholder:text-[#b0b9c8]";

  return (
    <>
      <div className="mb-7 text-center">
        <h1 className="mb-1.5 font-(family-name:--font-display) text-2xl font-extrabold tracking-tight text-[#0d1117]">
          Welcome back 👋
        </h1>
        <p className="text-[13.5px] leading-relaxed text-gray-500">
          Sign in to your Track Management account to continue
        </p>
      </div>

      <form
        className="flex flex-col gap-4.5"
        onSubmit={handleSubmit}
        noValidate
      >
      

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
                      className="eye-btn "
                      onClick={() => setShowPassword((v) => !v)}
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
        
                
                </div>

        <button
          type="submit"
          className="mt-1 submit-btn"
          disabled={loading}
        >
          {loading ? (
            "Signing in..."
          ) : (
            <>
              Sign in <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>

      <p className="mt-[22px] text-center text-[13.5px] text-gray-500">
        Don&apos;t have an account?{" "}
        <Link
          to="/auth/register"
          className="font-[family-name:var(--font-display)] font-bold text-blue-600 transition-colors hover:text-blue-800 hover:underline"
        >
          Create one free
        </Link>
      </p>
    </>
  );
}

export default Login;
