import { useState } from "react";
import { changePassword } from "../api/AuthApi";

function Eye({ open }) {
  return open ? (
    // Eye icon (visible)
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M1.5 12s3.5-7 10.5-7 10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12z"
      />
      <circle
        cx="12"
        cy="12"
        r="3.5"
        stroke="currentColor"
        strokeWidth={2}
      />
    </svg>
  ) : (
    // Eye-off icon (hidden)
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.94 17.94A10.97 10.97 0 0112 19.5c-7 0-10.5-7-10.5-7a21.77 21.77 0 014.22-5.94M6.1 6.1A10.97 10.97 0 0112 4.5c7 0 10.5 7 10.5 7a21.77 21.77 0 01-4.22 5.94M1 1l22 22"
      />
    </svg>
  );
}

export default function ChangePassword() {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Visibility toggles
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.oldPassword || !form.newPassword || !form.confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (form.newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const admin = JSON.parse(localStorage.getItem("admin") || "{}");
    const adminId = admin._id;
    if (!adminId) {
      setError("Admin ID not found. Please login again.");
      return;
    }

    setLoading(true);
    try {
      const res = await changePassword({
        adminId,
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
        confirmPassword: form.confirmPassword,
      });
      if (res.success) {
        setSuccess("Password changed successfully!");
        setForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        setError(res.message || "Failed to change password.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to change password. Please try again."
      );
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-pink-50 via-white to-pink-100">
      <div
        className="
          relative w-full max-w-xl
          bg-white/70 backdrop-blur-2xl
          border border-white/50
          rounded-3xl
          shadow-[0_25px_70px_rgba(0,0,0,0.12)]
          p-8 sm:p-10
        "
      >
        <h2 className="text-center text-3xl font-bold text-[#ff4081]">
          Change Password
        </h2>
        <p className="text-center text-gray-500 mt-2 mb-8 text-sm">
          Secure your account by updating your password
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Old Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Old Password
            </label>
            <div className="relative">
              <input
                type={showOld ? "text" : "password"}
                name="oldPassword"
                placeholder="Enter old password"
                value={form.oldPassword}
                onChange={handleChange}
                className="
                  w-full px-5 py-3 rounded-2xl
                  bg-white/80
                  border border-pink-200/70
                  focus:ring-2 focus:ring-pink-400
                  outline-none transition
                  pr-12
                "
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-pink-500"
                tabIndex={-1}
                onClick={() => setShowOld((v) => !v)}
                aria-label={showOld ? "Hide password" : "Show password"}
              >
                <Eye open={showOld} />
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                name="newPassword"
                placeholder="Enter new password"
                value={form.newPassword}
                onChange={handleChange}
                className="
                  w-full px-5 py-3 rounded-2xl
                  bg-white/80
                  border border-pink-200/70
                  focus:ring-2 focus:ring-pink-400
                  outline-none transition
                  pr-12
                "
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-pink-500"
                tabIndex={-1}
                onClick={() => setShowNew((v) => !v)}
                aria-label={showNew ? "Hide password" : "Show password"}
              >
                <Eye open={showNew} />
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm new password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="
                  w-full px-5 py-3 rounded-2xl
                  bg-white/80
                  border border-pink-200/70
                  focus:ring-2 focus:ring-pink-400
                  outline-none transition
                  pr-12
                "
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-pink-500"
                tabIndex={-1}
                onClick={() => setShowConfirm((v) => !v)}
                aria-label={showConfirm ? "Hide password" : "Show password"}
              >
                <Eye open={showConfirm} />
              </button>
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-center text-sm">{error}</p>
          )}
          {success && (
            <p className="text-green-600 text-center text-sm">{success}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`
              w-full py-3 rounded-2xl
              text-white font-semibold text-lg
              transition-all duration-300
              ${
                loading
                  ? "bg-pink-400/60 cursor-not-allowed"
                  : "bg-gradient-to-r from-pink-500 to-pink-600 hover:scale-[1.03] hover:shadow-xl"
              }
            `}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 mx-auto text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            ) : (
              "Change Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
