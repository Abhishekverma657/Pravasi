// import { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Eye, EyeOff } from 'lucide-react';
// import { AuthContext } from '../context/AuthContext';
// import { loginAdmin } from '../api/AuthApi'; // Add this at the top

// export default function LoginPage() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const { setIsAuthenticated } = useContext(AuthContext);

//   const validCredentials = {
//     email: 'admin@pravasi.com',
//     password: 'admin123'
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.email) newErrors.email = 'Email is required';
//     else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
//     if (!formData.password) newErrors.password = 'Password is required';
//     else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newErrors = validateForm();
//     if (Object.keys(newErrors).length === 0) {
//       setIsLoading(true);
//       try {
//         const res = await loginAdmin(formData);
//         if (res.success && res.data && res.data.admin) {
//           localStorage.setItem('isAuthenticated', '1');
//           // Optionally store admin info if needed:
//           localStorage.setItem('admin', JSON.stringify(res.data.admin));
//           if (setIsAuthenticated) setIsAuthenticated(true);
//           navigate('/dashboard');
//         } else {
//           setErrors({ login: res.message || 'Login failed' });
//         }
//       } catch (error) {
//         setErrors({
//           login:
//             error.response?.data?.message ||
//             'Invalid email or password',
//         });
//       }
//       setIsLoading(false);
//     } else {
//       setErrors(newErrors);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#ffe6eb] via-[#ffd1e3] to-[#ffb6c1] relative overflow-hidden">
//       {/* Soft glowing background */}
//       <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#ff69b4]/30 rounded-full blur-3xl animate-pulse"></div>
//       <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-[#ff69b4]/20 rounded-full blur-3xl animate-pulse"></div>

//       {/* Login Card */}
//       <div className="  relative z-10 w-[600px] mt-10 mb-10 bg-white backdrop-blur-2xl border border-white/50 p-10 rounded-3xl shadow-2xl hover:shadow-pink-200/60 transition-all duration-500">
//         {/* Logo */}
//         <div className="flex justify-center mb-6">
//           <div className=" ">
//             <div className="bg-white p-2 rounded-full">
//               <img
//                 src="/logo.jpeg"
//                 alt="Logo"
//                 className="h-30 w-fit rounded-sm object-contain shadow-md transition-all duration-500 hover:scale-105"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Header */}
//         <h2 className="text-center text-3xl font-bold text-[#ff4081]">Welcome </h2>
//         <p className="text-center text-gray-600 mt-2 mb-6 text-sm">
//           Sign in to access your dashboard
//         </p>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Email */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//             <input
//               type="email"
//               name="email"
//               placeholder="Enter your email"
//               value={formData.email}
//               onChange={handleChange}
//               className={`w-full px-4 py-3 rounded-xl bg-white border ${
//                 errors.email ? 'border-red-300' : 'border-pink-200'
//               } placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all`}
//             />
//             {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//             <div className="relative">
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 name="password"
//                 placeholder="Enter your password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className={`w-full px-4 py-3 pr-12 rounded-xl bg-white border ${
//                   errors.password ? 'border-red-300' : 'border-pink-200'
//                 } placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all`}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 transition-colors"
//                 title={showPassword ? 'Hide password' : 'Show password'}
//               >
//                 {showPassword ? (
//                   <EyeOff size={20} />
//                 ) : (
//                   <Eye size={20} />
//                 )}
//               </button>
//             </div>
//             {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
//           </div>

//           {/* Forgot Password Link */}
//           <div className="flex justify-end">
//             <button
//               type="button"
//               className="text-pink-500 hover:underline text-sm"
//               onClick={() => setShowForgotModal(true)}
//             >
//               Forgot Password?
//             </button>
//           </div>

//           {/* Login Error */}
//           {errors.login && (
//             <p className="text-red-500 text-center text-sm">{errors.login}</p>
//           )}

//           {/* Button */}
//           <button
//             type="submit"
//             disabled={isLoading}
//             className={`w-full py-3 rounded-xl text-white font-semibold text-lg shadow-md transition-all duration-300 ${
//               isLoading
//                 ? 'bg-pink-400/60 cursor-not-allowed'
//                 : 'bg-gradient-to-r from-[#ff69b4] to-[#ff85c1] hover:scale-105 hover:shadow-lg'
//             }`}
//           >
//             {isLoading ? (
//               <svg
//                 className="animate-spin h-5 w-5 mx-auto text-white"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                 ></circle>
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
//                 ></path>
//               </svg>
//             ) : (
//               'Sign In'
//             )}
//           </button>
//         </form>

//         {/* Forgot Password Modal */}
//         {showForgotModal && (
//           <div className="fixed inset-0 flex items-center justify-center z-50">
//             {/* Glassmorphism overlay */}
//             <div className="absolute inset-0 bg-white/30 backdrop-blur-md"></div>
//             <div className="relative bg-white/80 backdrop-blur-2xl p-6 rounded-xl shadow-lg w-full max-w-sm">
//               <h3 className="text-lg font-bold mb-2">Forgot Password</h3>
//               <form onSubmit={handleForgotSubmit} className="space-y-3">
//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   value={forgotEmail}
//                   onChange={e => setForgotEmail(e.target.value)}
//                   className="w-full px-3 py-2 border rounded"
//                   required
//                 />
//                 {forgotMsg && <p className="text-pink-500 text-sm">{forgotMsg}</p>}
//                 <div className="flex justify-end space-x-2">
//                   <button
//                     type="button"
//                     className="px-3 py-1 rounded bg-gray-200"
//                     onClick={() => {
//                       setShowForgotModal(false);
//                       setForgotMsg('');
//                     }}
//                     disabled={forgotLoading}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-3 py-1 rounded bg-pink-500 text-white flex items-center justify-center"
//                     disabled={forgotLoading}
//                   >
//                     {forgotLoading ? (
//                       <svg className="animate-spin h-4 w-4 mr-1" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
//                       </svg>
//                     ) : null}
//                     Send OTP
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         {/* Reset Password Modal */}
//         {showResetModal && (
//           <div className="fixed inset-0 flex items-center justify-center z-50">
//             {/* Glassmorphism overlay */}
//             <div className="absolute inset-0 bg-white/30 backdrop-blur-md"></div>
//             <div className="relative bg-white/80 backdrop-blur-2xl p-6 rounded-xl shadow-lg w-full max-w-sm">
//               <h3 className="text-lg font-bold mb-2">Reset Password</h3>
//               <form onSubmit={handleResetSubmit} className="space-y-3">
//                 <input
//                   type="email"
//                   value={resetData.email}
//                   readOnly
//                   className="w-full px-3 py-2 border rounded bg-gray-100"
//                 />
//                 <input
//                   type="text"
//                   name="token"
//                   placeholder="Enter OTP"
//                   value={resetData.token}
//                   onChange={handleResetChange}
//                   className="w-full px-3 py-2 border rounded"
//                   required
//                 />
//                 <input
//                   type="password"
//                   name="newPassword"
//                   placeholder="New Password"
//                   value={resetData.newPassword}
//                   onChange={handleResetChange}
//                   className="w-full px-3 py-2 border rounded"
//                   required
//                 />
//                 <input
//                   type="password"
//                   name="confirmPassword"
//                   placeholder="Confirm Password"
//                   value={resetData.confirmPassword}
//                   onChange={handleResetChange}
//                   className="w-full px-3 py-2 border rounded"
//                   required
//                 />
//                 {resetError && <p className="text-red-500 text-sm">{resetError}</p>}
//                 {resetMsg && <p className="text-green-600 text-sm">{resetMsg}</p>}
//                 <div className="flex justify-end space-x-2">
//                   <button
//                     type="button"
//                     className="px-3 py-1 rounded bg-gray-200"
//                     onClick={() => {
//                       setShowResetModal(false);
//                       setResetMsg('');
//                       setResetError('');
//                     }}
//                     disabled={resetLoading}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-3 py-1 rounded bg-pink-500 text-white flex items-center justify-center"
//                     disabled={resetLoading}
//                   >
//                     {resetLoading ? (
//                       <svg className="animate-spin h-4 w-4 mr-1" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
//                       </svg>
//                     ) : null}
//                     Reset Password
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         {/* Footer */}
//         <div className="text-center mt-6 text-sm text-gray-500">
//           <p>© 2025 Rajasthan Pravasi Foundation</p>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { loginAdmin, forgotPassword, resetPassword } from '../api/AuthApi';

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setIsAuthenticated } = useContext(AuthContext);

  // Forgot/Reset password states
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotMsg, setForgotMsg] = useState('');
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetData, setResetData] = useState({
    email: '',
    token: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [resetMsg, setResetMsg] = useState('');
  const [resetError, setResetError] = useState('');

  // Add loading states for forgot/reset
  const [forgotLoading, setForgotLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

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
      try {
        const res = await loginAdmin(formData);
        if (res.success && res.data && res.data.admin) {
          localStorage.setItem('isAuthenticated', '1');
          // Optionally store admin info if needed:
          localStorage.setItem('admin', JSON.stringify(res.data.admin));
          if (setIsAuthenticated) setIsAuthenticated(true);
          navigate('/dashboard');
        } else {
          setErrors({ login: res.message || 'Login failed' });
        }
      } catch (error) {
        setErrors({
          login:
            error.response?.data?.message ||
            'Invalid email or password',
        });
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

  // Forgot Password Handlers
  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setForgotMsg('');
    setForgotLoading(true);
    if (!forgotEmail) {
      setForgotMsg('Please enter your email.');
      setForgotLoading(false);
      return;
    }
    try {
      const res = await forgotPassword(forgotEmail);
      if (res.success) {
        setForgotMsg('OTP sent to your email.');
        setShowForgotModal(false);
        setResetData((prev) => ({ ...prev, email: forgotEmail }));
        setShowResetModal(true);
      } else {
        setForgotMsg(res.message || 'Failed to send OTP.');
      }
    } catch (err) {
      setForgotMsg(
        err.response?.data?.message || 'Failed to send OTP.'
      );
    }
    setForgotLoading(false);
  };

  // Reset Password Handlers
  const handleResetChange = (e) => {
    const { name, value } = e.target;
    setResetData((prev) => ({ ...prev, [name]: value }));
    setResetError('');
    setResetMsg('');
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setResetMsg('');
    setResetError('');
    setResetLoading(true);
    if (
      !resetData.token ||
      !resetData.newPassword ||
      !resetData.confirmPassword
    ) {
      setResetError('All fields are required.');
      setResetLoading(false);
      return;
    }
    if (resetData.newPassword !== resetData.confirmPassword) {
      setResetError('Passwords do not match.');
      setResetLoading(false);
      return;
    }
    try {
      const res = await resetPassword(resetData);
      if (res.success) {
        setResetMsg('Password reset successful! Please login.');
        setShowResetModal(false);
      } else {
        setResetError(res.message || 'Failed to reset password.');
      }
    } catch (err) {
      setResetError(
        err.response?.data?.message || 'Failed to reset password.'
      );
    }
    setResetLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#ffe6eb] via-[#ffd1e3] to-[#ffb6c1] relative overflow-hidden">
      {/* Soft glowing background */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#ff69b4]/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-[#ff69b4]/20 rounded-full blur-3xl animate-pulse"></div>

      {/* Login Card */}
      <div className="relative z-10 w-[600px] mt-10 mb-10 bg-white backdrop-blur-2xl border border-white/50 p-10 rounded-3xl shadow-2xl hover:shadow-pink-200/60 transition-all duration-500">
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
        <h2 className="text-center text-3xl font-bold text-[#ff4081]">Welcome </h2>
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
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 pr-12 rounded-xl bg-white border ${
                  errors.password ? 'border-red-300' : 'border-pink-200'
                } placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 transition-colors"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <button
              type="button"
              className="text-pink-500 hover:underline text-sm"
              onClick={() => setShowForgotModal(true)}
            >
              Forgot Password?
            </button>
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

        {/* Forgot Password Modal */}
        {showForgotModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Glassmorphism overlay */}
            <div className="absolute inset-0 bg-white/30 backdrop-blur-md"></div>
            <div className="relative bg-white/80 backdrop-blur-2xl p-6 rounded-xl shadow-lg w-full max-w-sm">
              <h3 className="text-lg font-bold mb-2">Forgot Password</h3>
              <form onSubmit={handleForgotSubmit} className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={forgotEmail}
                  onChange={e => setForgotEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
                {forgotMsg && <p className="text-pink-500 text-sm">{forgotMsg}</p>}
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    className="px-3 py-1 rounded bg-gray-200"
                    onClick={() => {
                      setShowForgotModal(false);
                      setForgotMsg('');
                    }}
                    disabled={forgotLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1 rounded bg-pink-500 text-white flex items-center justify-center"
                    disabled={forgotLoading}
                  >
                    {forgotLoading ? (
                      <svg className="animate-spin h-4 w-4 mr-1" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                      </svg>
                    ) : null}
                    Send OTP
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Reset Password Modal */}
        {showResetModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Glassmorphism overlay */}
            <div className="absolute inset-0 bg-white/30 backdrop-blur-md"></div>
            <div className="relative bg-white/80 backdrop-blur-2xl p-6 rounded-xl shadow-lg w-full max-w-sm">
              <h3 className="text-lg font-bold mb-2">Reset Password</h3>
              <form onSubmit={handleResetSubmit} className="space-y-3">
                <input
                  type="email"
                  value={resetData.email}
                  readOnly
                  className="w-full px-3 py-2 border rounded bg-gray-100"
                />
                <input
                  type="text"
                  name="token"
                  placeholder="Enter OTP"
                  value={resetData.token}
                  onChange={handleResetChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
                <input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  value={resetData.newPassword}
                  onChange={handleResetChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={resetData.confirmPassword}
                  onChange={handleResetChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
                {resetError && <p className="text-red-500 text-sm">{resetError}</p>}
                {resetMsg && <p className="text-green-600 text-sm">{resetMsg}</p>}
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    className="px-3 py-1 rounded bg-gray-200"
                    onClick={() => {
                      setShowResetModal(false);
                      setResetMsg('');
                      setResetError('');
                    }}
                    disabled={resetLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1 rounded bg-pink-500 text-white flex items-center justify-center"
                    disabled={resetLoading}
                  >
                    {resetLoading ? (
                      <svg className="animate-spin h-4 w-4 mr-1" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                      </svg>
                    ) : null}
                    Reset Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>© 2025 Rajasthan Pravasi Foundation</p>
        </div>
      </div>
    </div>
  );
}