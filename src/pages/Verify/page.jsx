import { useState, useEffect, useRef } from "react";
import { Mail, Shield, Clock, Loader2 } from "lucide-react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import {
  useSendOtpMutation,
  useVerifyOtpMutation,
} from "../../redux/features/auth/auth.api";

export default function VerifyPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isVerified, setIsVerified] = useState(false);

  const navigate = useNavigate();
  const timerRef = useRef(null);

  const [sendOtp, { isLoading: isSending }] = useSendOtpMutation();
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();

  const storedData = JSON.parse(sessionStorage.getItem("verifyData") || "{}");

  const { name, email } = storedData;

  useEffect(() => {
    if (isVerified) return;

    if (!name || !email) {
      navigate("/register");
      return;
    }

    const storedExpiry = sessionStorage.getItem("otpExpiry");
    const now = Date.now();

    if (storedExpiry) {
      const expiryTime = parseInt(storedExpiry, 10);
      const remaining = Math.max(0, Math.floor((expiryTime - now) / 1000));
      setTimeLeft(remaining);
    } else {
      const expiryTime = now + 120000;
      sessionStorage.setItem("otpExpiry", expiryTime.toString());
      setTimeLeft(120);
    }
  }, [name, email, navigate, isVerified]);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value && index < 5) {
      const nextInput =
        element.parentElement.nextElementSibling?.querySelector("input");
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        const prevInput =
          e.target.parentElement.previousElementSibling?.querySelector("input");
        if (prevInput) prevInput.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6).split("");
    const newOtp = [...otp];
    pastedData.forEach((char, index) => {
      if (index < 6 && !isNaN(char)) {
        newOtp[index] = char;
      }
    });
    setOtp(newOtp);
  };

  const handleVerify = async () => {
    const otpCode = otp.join("");

    if (otpCode.length !== 6 || timeLeft <= 0) return;

    try {
      const res = await verifyOtp({ email, otp: otpCode }).unwrap();

      if (res.success) {
        setIsVerified(true); // Set flag before clearing storage
        toast.success(
          <h1 className="text-center font-serif">
            Email verified successfully!
          </h1>,
          {
            position: "top-right",
          }
        );
        sessionStorage.removeItem("verifyData");
        sessionStorage.removeItem("otpExpiry");
        navigate("/login", { replace: true }); // Use replace to prevent back navigation
      }
    } catch (err) {
      toast.error(err?.data?.message || "Invalid OTP. Please try again.");
    }
  };

  const handleResend = async () => {
    if (timeLeft > 0) return;

    try {
      const res = await sendOtp({ email, name }).unwrap();

      if (res.success) {
        toast.success(
          <h1 className="text-center font-serif">
            New OTP sent to your email
          </h1>,
          {
            position: "top-right",
          }
        );
        setOtp(["", "", "", "", "", ""]);

        const newExpiry = Date.now() + 120000;
        sessionStorage.setItem("otpExpiry", newExpiry.toString());
        setTimeLeft(120);
      }
    } catch (err) {
      toast.error(
        err?.data?.message || "Failed to send OTP. Please try again."
      );
    }
  };

  const otpCode = otp.join("");
  const isComplete = otpCode.length === 6;
  const isExpired = timeLeft <= 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <Mail className="w-8 h-8 text-green-700" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Verify Your Email
          </h1>
          <p className="text-gray-600">
            We've sent a 6-digit code to <br />
            <span className="font-semibold text-gray-800">{email}</span>
          </p>
        </div>

        {/* Timer */}
        <div
          className={`flex items-center justify-center gap-2 mb-6 ${
            isExpired
              ? "text-red-600"
              : timeLeft <= 30
              ? "text-orange-600"
              : "text-green-700"
          }`}
        >
          <Clock className="w-5 h-5" />
          <span className="text-lg font-semibold">
            {isExpired ? "Code Expired" : `Expires in ${formatTime(timeLeft)}`}
          </span>
        </div>

        {/* OTP Input */}
        <div className="flex justify-center gap-2 mb-6" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <div key={index}>
              <input
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                disabled={isExpired || isVerifying}
                className={`w-12 h-14 text-center text-2xl font-semibold border-2 rounded-lg focus:outline-none transition-all ${
                  isExpired || isVerifying
                    ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                    : "border-gray-300 focus:border-green-700 hover:border-green-500"
                }`}
                autoFocus={index === 0}
              />
            </div>
          ))}
        </div>

        {/* Security Notice */}
        {!isExpired && (
          <div className="flex items-start gap-2 bg-green-50 border border-green-200 rounded-lg p-3 mb-6">
            <Shield className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-green-800">
              For your security, this code will expire in 2 minutes
            </p>
          </div>
        )}

        {/* Expired Notice */}
        {isExpired && (
          <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
            <Clock className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">
              This code has expired. Please request a new code.
            </p>
          </div>
        )}

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          disabled={!isComplete || isVerifying || isExpired}
          className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all ${
            isComplete && !isVerifying && !isExpired
              ? "bg-green-700 hover:bg-green-800"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          {isVerifying ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              Verifying...
            </span>
          ) : (
            "Verify Email"
          )}
        </button>

        {/* Resend Link */}
        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            Didn't receive the code?{" "}
            <button
              onClick={handleResend}
              disabled={timeLeft > 0 || isSending}
              className={`font-semibold ${
                timeLeft > 0 || isSending
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-green-700 hover:text-green-800 hover:underline"
              }`}
            >
              {isSending ? "Sending..." : "Resend Code"}
            </button>
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            Bangladesh Nationalist Party (BNP)
          </p>
        </div>
      </div>
    </div>
  );
}
