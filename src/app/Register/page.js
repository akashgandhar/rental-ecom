"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import loginImage from "../../public/assets/image.png";
import loginImg from "../../public/assets/loginImg.png";
import axios from "axios";
import { API_DOMAIN } from "../helper/constant";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const payload = {
        userName: email,
        password: password,
      };

      const response = await axios.post(`${API_DOMAIN}/login`, payload);
      const userInfo = response.data;

      localStorage.setItem("userInfoData", JSON.stringify(userInfo));
      router.push("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-modal">
        {/* Left Side */}
        <div className="login-left">
          <Image src={loginImage} alt="Login Visual" layout="fill" objectFit="contain" />
        </div>

        {/* Right Side */}
        <div className="login-right">
          <div className="logo">
            <Image src={loginImg} alt="logo" title="logo" />
          </div>
          <h2>Login to Continue</h2>

          <label className="label">Email Address</label>
          <div className="input-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@bidforsure.com"
            />
          </div>

          <label className="label">Password</label>
          <div className="input-group" style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: "absolute", right: 10, cursor: "pointer" }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </span>
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button disabled={!email || !password} onClick={handleLogin} className="btn">
            Login
          </button>

          <hr className="divider" />
          <div className="checkbox-line small">
            <input type="checkbox" defaultChecked />
            <span>
              By continuing, you agree to Zoomcar's <a href="#">Privacy policy</a> & <a href="#">Terms & Condition</a>
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: #f4f4f4;
          padding: 20px;
        }
        .login-modal {
          display: flex;
          width: 900px;
          height: 585px;
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
        }
        .login-left {
          position: relative;
          width: 50%;
          background: #f9f9f9;
        }
        .login-right {
          width: 50%;
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 16px;
        }
        .logo {
          font-size: 20px;
          font-weight: bold;
          color: #0d1e6a;
        }
        h2 {
          font-size: 24px;
          font-weight: 600;
        }
        .label {
          font-weight: 500;
        }
        .input-group {
          display: flex;
          align-items: center;
          border: 1px solid #ccc;
          padding: 12px;
          border-radius: 8px;
          background: #fafafa;
        }
        .input-group input {
          width: 100%;
          border: none;
          outline: none;
          font-size: 16px;
          background: transparent;
        }
        .btn {
          background: #ff6c00;
          color: white;
          padding: 14px;
          border: none;
          cursor: pointer;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
        }
        .btn:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
        .checkbox-line {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 14px;
        }
        .checkbox-line input {
          margin-top: 4px;
        }
        .checkbox-line b {
          color: #0baf28;
        }
        .divider {
          border: none;
          border-top: 1px solid #ddd;
          margin: 10px 0;
        }
        .checkbox-line.small {
          font-size: 12px;
          color: #666;
        }
        .checkbox-line.small a {
          text-decoration: underline;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}