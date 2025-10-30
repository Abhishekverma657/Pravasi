 
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { setIsAuthenticated } = useContext(AuthContext);

  const validCredentials = {
    email: 'admin@pravasi.com',
    password: 'admin123'
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (formData.email === validCredentials.email && formData.password === validCredentials.password) {
        localStorage.setItem('isAuthenticated', '1');
        if (setIsAuthenticated) setIsAuthenticated(true);
        navigate('/dashboard');
      } else {
        setErrors({ login: 'Invalid email or password' });
      }
      setIsLoading(false);
    } else {
      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#ffe6eb] via-[#ffd1e3] to-[#ffb6c1] relative overflow-hidden">
      {/* Soft glowing background */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#ff69b4]/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-[#ff69b4]/20 rounded-full blur-3xl animate-pulse"></div>

      {/* Login Card */}
      <div className="  relative z-10 w-[600px] mt-10 mb-10 bg-white backdrop-blur-2xl border border-white/50 p-10 rounded-3xl shadow-2xl hover:shadow-pink-200/60 transition-all duration-500">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className=" ">
            <div className="bg-white p-2 rounded-full">
              <img
                src="/logo.jpeg"
                alt="Logo"
                className="h-30 w-fit rounded-sm object-contain shadow-md transition-all duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Header */}
        <h2 className="text-center text-3xl font-bold text-[#ff4081]">Welcome Back 💖</h2>
        <p className="text-center text-gray-600 mt-2 mb-6 text-sm">
          Sign in to access your dashboard
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl bg-white border ${
                errors.email ? 'border-red-300' : 'border-pink-200'
              } placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl bg-white border ${
                errors.password ? 'border-red-300' : 'border-pink-200'
              } placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Login Error */}
          {errors.login && (
            <p className="text-red-500 text-center text-sm">{errors.login}</p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-xl text-white font-semibold text-lg shadow-md transition-all duration-300 ${
              isLoading
                ? 'bg-pink-400/60 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#ff69b4] to-[#ff85c1] hover:scale-105 hover:shadow-lg'
            }`}
          >
            {isLoading ? (
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
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>© 2025 Rajasthan Pravasi Foundation</p>
        </div>
      </div>
    </div>
  );
}
