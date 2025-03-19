import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./forgotpassword.css";
import { useNavigate } from "react-router-dom";
import { User2 } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [method, setMethod] = useState("email");
  const [showOTPDialog, setShowOTPDialog] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [sentOtp, setSentotp] = useState("");
  const [errorUpdate, setErrorUpdate] = useState("");
  const [success, setSuccess] = useState("");
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [userNotExist, setUserNotExist] = useState(false);
  const [showChangePasswordDialog, setshowChangePasswordDialog] = useState(false);
  const [Password, setPassword] = useState("");
  const [cnfpassword, setcnfPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("Email");

  const otpRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    let interval;
    if (showOTPDialog && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [showOTPDialog, timer]);

  const handleUpdate = async () => {
    if (Password !== cnfpassword) {
      setErrorUpdate("Passwords do not match");
      return;
    }
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/update-password`, {
      password: Password,
      email: method === "email" ? email : null,
      phone: method === "phone" ? phone : null,
    });
    if (res.status === 200) {
      setSuccess("Password updated successfully!");
      navigate('/log');
    } else {
      setErrorUpdate("Failed to update password. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (method === "email" && !email) {
      setError("Please enter your email address");
      return;
    }
    if (method === "phone" && !phone) {
      setError("Please enter your phone number");
      return;
    }
    
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/forgot-password`, {
      email: email,
      phone: phone
    });
    if (res.status === 200) {
      try {
        if (method === "phone") {
          const res = await axios.post(`${process.env.REACT_APP_API_URL}/send-otp/sms`, { phone: phone });
          setSentotp(await res.data.otp);
        } else {
          const res = await axios.post(`${process.env.REACT_APP_API_URL}/send-otp/email`, { email: email });
          setSentotp(await res.data.otp);
        }

        setShowOTPDialog(true);
        setTimer(30);
        setCanResend(false);
        setSuccess(`OTP sent to your ${method}`);
      } catch (err) {
        setError("Failed to send OTP. Please try again.");
      }
    } else {
      setUserNotExist(true);
    }
  };

  const handleOTPChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOtp(newOTP);

      // Move to next input
      if (value && index < 3) {
        otpRefs[index + 1].current?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  const verifyOTP = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 4) {
      setError("Please enter complete OTP");
      return;
    }
    if (otpValue === sentOtp) {
      setSuccess("OTP verified successfully!");
      setShowOTPDialog(false);
      setshowChangePasswordDialog(true);
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };

  const resendOTP = async () => {
    setTimer(30);
    setCanResend(false);
    setOtp(["", "", "", ""]);
    setSuccess("OTP resent successfully!");
    if (method === "phone") {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/send-otp/sms`, { phone: phone });
      setSentotp(await res.data.otp);
    } else {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/send-otp/email`, { email: email });
      setSentotp(await res.data.otp);
    }
    setShowOTPDialog(true);
    setTimer(30);
    setCanResend(false);
    setSuccess(`OTP sent to your ${method}`);
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          {/* Toggle buttons for Email and Phone */}
          <div className="toggle-container">
            <div className="toggle-buttons">
              <button
                className={`toggle-button ${activeTab === "Email" ? "active" : ""}`}
                onClick={() => setActiveTab("Email")}
                type="button"
              >
                Email
              </button>
              <button
                className={`toggle-button ${activeTab === "Phone" ? "active" : ""}`}
                onClick={() => setActiveTab("Phone")}
                type="button"
              >
                Phone
              </button>
            </div>
          </div>

          {/* Conditionally render the form inputs based on the active tab */}
          {activeTab === "Email" ? (
            <div className="form-group">
              <User2 style={{ width: '80px', height: '80px', marginLeft:'40%', marginBottom:'20px' }} />
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
          ) : (
            <div className="form-group">
              <User2 style={{ width: '80px', height: '80px', marginLeft:'40%', marginBottom:'20px' }} />
              <label>Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>
          )}

          {userNotExist && <div className="error-message">Can't find {method}, please recheck or register!</div>}
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <button type="submit" className="button">Send OTP</button>
        </form>
      </div>

      {/* OTP Dialog */}
      {showOTPDialog && (
        <div className="dialog-overlay">
          <div className="dialog-content">
            <h3>Enter OTP</h3>
            <p>
              Please enter the OTP sent to your {method === "email" ? email : phone}
            </p>

            <div className="otp-container">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={otpRefs[index]}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOTPChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="otp-input"
                />
              ))}
            </div>

            {timer > 0 && <div className="timer">Resend OTP in {timer}s</div>}

            {canResend && (
              <button
                onClick={resendOTP}
                className="resend-button"
                disabled={!canResend}
              >
                Resend OTP
              </button>
            )}

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <button onClick={verifyOTP} className="button">
              Verify OTP
            </button>
          </div>
        </div>
      )}

      {/* Change Password Dialog */}
      {showChangePasswordDialog && (
        <div className="dialog-overlay">
          <div className="dialog-content">
            <label>New Password</label>
            <input
              type="password"
              required
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Confirm Password</label>
            <input
              type="password"
              required
              value={cnfpassword}
              onChange={(e) => setcnfPassword(e.target.value)}
            />
            <button onClick={handleUpdate}>Update</button>
          </div>
          {errorUpdate && <div className="error-message">{errorUpdate}</div>}
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
