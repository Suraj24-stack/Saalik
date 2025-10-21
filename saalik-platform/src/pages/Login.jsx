// src/auth/Login.jsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  LoginUser,
  clearError,
  selectIsAuthenticated,
  selectIsLoading,
  selectAuthError,
  selectUser,
} from "../../store/slices/authSlice";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Loader2,
  Shield,
  BookOpen,
  User,
  Crown,
  Settings,
} from "lucide-react";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [showDemoCredentials, setShowDemoCredentials] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectAuthError);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  const successMessage = searchParams.get("message");
  const verificationSuccess = searchParams.get("verified") === "true";
  const resetSuccess = searchParams.get("reset") === "true";
  const redirectPath = searchParams.get("redirect") || "/admin";

  const isEmailVerificationError =
    !!error &&
    (error.toLowerCase().includes("verify") ||
      error.toLowerCase().includes("verification"));

  const isAccountStatusError =
    !!error &&
    (error.toLowerCase().includes("inactive") ||
      error.toLowerCase().includes("suspended") ||
      error.toLowerCase().includes("locked"));

  // Auto-clear banners after success flows
  useEffect(() => {
    if (successMessage || verificationSuccess || resetSuccess) {
      const timer = setTimeout(() => {
        navigate("/login", { replace: true });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, verificationSuccess, resetSuccess, navigate]);

  // Redirect when authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      const targetPath = user.role === "admin" ? "/admin" : redirectPath;
      navigate(targetPath);
    }
  }, [isAuthenticated, user, navigate, redirectPath]);

  // Clear any lingering error on unmount
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  // Simple form validation
  useEffect(() => {
    const emailValid =
      formData.email.length > 0 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    const passwordValid = formData.password.length >= 6;
    setIsFormValid(emailValid && passwordValid);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) dispatch(clearError());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      const result = await dispatch(
        LoginUser({
          ...formData,
          rememberMe,
        })
      );

      if (result.type === "auth/loginUser/fulfilled") {
        const userData = result.payload.user;
        let targetPath = redirectPath;
        if (userData.role === "super_admin") targetPath = "/admin";
        else if (userData.role === "moderator") targetPath = "/user";
        navigate(targetPath);
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const demoCredentials = [
    {
      type: "Admin",
      email: "admin@experience.com",
      password: "admin123",
      icon: Crown,
      description: "Full system access",
    },
    {
      type: "User",
      email: "user@example.com",
      password: "user123",
      icon: User,
      description: "Standard user access",
    },
    {
      type: "User_host",
      email: "mod@example.com",
      password: "mod123",
      icon: Settings,
      description: "Content management",
    },
  ];

  const fillDemoCredentials = (credentials) => {
    setFormData({ email: credentials.email, password: credentials.password });
    setShowDemoCredentials(false);
    setTimeout(() => {
      const form = document.getElementById("loginForm");
      if (form) form.requestSubmit();
    }, 500);
  };

  const getSuccessMessage = () => {
    if (verificationSuccess) return "Email verified successfully! You can now log in.";
    if (resetSuccess) return "Password reset successfully! You can now log in with your new password.";
    return successMessage;
  };

  const displaySuccessMessage = getSuccessMessage();

  return (
    <>
     <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <Navbar/>
      <div className="pt-20 mt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          {/* Back Link */}
          <Link
            to="/"
            className="inline-flex items-center text-emerald-400 hover:text-emerald-300 mb-8 transition-all duration-200 hover:translate-x-1 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>

          {/* Success Message */}
          {displaySuccessMessage && (
            <div className="bg-emerald-900/30 border border-emerald-500/50 rounded-xl p-4 mb-6 flex items-start animate-fadeIn backdrop-blur-sm">
              <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="text-emerald-300 text-sm font-medium">
                  {displaySuccessMessage}
                </p>
              </div>
            </div>
          )}

          {/* Login Card */}
          <div className="bg-gradient-to-br from-gray-800/90 via-gray-900/90 to-black/90 backdrop-blur-sm rounded-3xl shadow-2xl border-2 border-emerald-500/30 p-8 space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-3xl flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/50">
                <LogIn className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                <p className="text-gray-400 leading-relaxed">
                  Sign in to your account to continue your study abroad journey
                </p>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div
                className={`rounded-xl p-4 animate-fadeIn border backdrop-blur-sm ${
                  isEmailVerificationError
                    ? "bg-orange-900/30 border-orange-500/50"
                    : isAccountStatusError
                    ? "bg-yellow-900/30 border-yellow-500/50"
                    : "bg-red-900/30 border-red-500/50"
                }`}
              >
                <div className="flex items-start space-x-3">
                  {isEmailVerificationError ? (
                    <Mail className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  ) : isAccountStatusError ? (
                    <Shield className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p
                      className={`text-sm font-medium ${
                        isEmailVerificationError
                          ? "text-orange-300"
                          : isAccountStatusError
                          ? "text-yellow-300"
                          : "text-red-300"
                      }`}
                    >
                      {isEmailVerificationError
                        ? "Email Verification Required"
                        : isAccountStatusError
                        ? "Account Status Issue"
                        : "Login Failed"}
                    </p>
                    <p
                      className={`text-sm mt-1 ${
                        isEmailVerificationError
                          ? "text-orange-400"
                          : isAccountStatusError
                          ? "text-yellow-400"
                          : "text-red-400"
                      }`}
                    >
                      {error}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Login Form */}
            <form id="loginForm" onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-emerald-400">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-4 border-2 border-emerald-500/30 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-900/50 hover:bg-gray-900/70 text-white placeholder-gray-500 transition-all"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-emerald-400">Password *</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-14 py-4 border-2 border-emerald-500/30 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-900/50 hover:bg-gray-900/70 text-white placeholder-gray-500 transition-all"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-emerald-400 p-1 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 border-gray-600 rounded focus:ring-emerald-500 bg-gray-800"
                  />
                  <span className="ml-3 text-sm text-gray-300 font-medium">Remember me</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading || !isFormValid}
                className={`w-full font-semibold py-4 px-6 rounded-xl flex items-center justify-center space-x-2 shadow-lg transition-all ${
                  isLoading || !isFormValid
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white hover:from-emerald-500 hover:to-emerald-600 shadow-emerald-500/50"
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    <span>Sign In</span>
                  </>
                )}
              </button>
            </form>

            {/* Sign Up */}
            <div className="space-y-4">
              {/* <Link
                to="/register"
                className="inline-flex items-center justify-center w-full py-4 px-6 border-2 border-emerald-500/50 text-emerald-400 font-semibold rounded-xl hover:bg-emerald-500/10 hover:border-emerald-400 transition-all space-x-2"
              >
                <BookOpen className="w-5 h-5" />
                <span>Create New Account</span>
              </Link> */}

             
            </div>    
          </div>
        </div>
      </div>
    </main>
    <Footer/>
    </>
  );
}