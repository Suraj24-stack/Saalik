// src/auth/Login.jsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { mockData } from "../data/MockData";

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
      error.toLowerCase().includes("locked") ||
      error.toLowerCase().includes("disabled"));

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
      const targetPath = 
        user.role === "admin" || user.role === "super_admin" 
          ? "/admin" 
          : redirectPath;
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
          email: formData.email,
          password: formData.password,
          rememberMe,
        })
      );

      if (LoginUser.fulfilled.match(result)) {
        const userData = result.payload.user;
        let targetPath = redirectPath;
        
        if (userData.role === "super_admin" || userData.role === "admin") {
          targetPath = "/admin";
        } else if (userData.role === "moderator") {
          targetPath = "/user";
        }
        
        navigate(targetPath);
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const demoCredentials = [
    {
      type: "Admin",
      email: "admin@example.com",
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
      type: "Moderator",
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
    if (verificationSuccess)
      return "Email verified successfully! You can now log in.";
    if (resetSuccess)
      return "Password reset successfully! You can now log in with your new password.";
    return successMessage;
  };

  const displaySuccessMessage = getSuccessMessage();

  return (
    <>
      <main className="min-h-screen bg-black">
        <Navbar />
        
        {/* Background Effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            {/* Back Link */}
            <Link
              to="/"
              className="inline-flex items-center text-green-400 hover:text-green-300 mb-8 transition-all duration-200 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
              <span className="font-medium">Back to Home</span>
            </Link>

            {/* Success Message */}
            {displaySuccessMessage && (
              <div className="bg-green-500/10 border border-green-500/50 rounded-xl p-4 mb-6 flex items-start animate-fadeIn backdrop-blur-sm">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-green-300 text-sm font-medium">
                    {displaySuccessMessage}
                  </p>
                </div>
              </div>
            )}

            {/* Login Card */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-green-500/20 p-8 md:p-10">
              {/* Logo & Header */}
              <div className="text-center space-y-6 mb-8">
                <div className="flex justify-center">
                  <img 
                    src={mockData.navbar.logo} 
                    alt={`${mockData.navbar.brandName} Logo`}
                    className="h-16 w-auto object-contain"
                  />
                </div>
                
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: "'League Spartan', sans-serif", fontWeight: 700 }}>
                    <span className="text-white">WELCOME </span>
                    <span className="text-green-400">BACK</span>
                  </h1>
                  <p className="text-gray-400">
                    Sign in to access your dashboard
                  </p>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div
                  className={`rounded-xl p-4 animate-fadeIn border backdrop-blur-sm mb-6 ${
                    isEmailVerificationError
                      ? "bg-orange-500/10 border-orange-500/50"
                      : isAccountStatusError
                      ? "bg-yellow-500/10 border-yellow-500/50"
                      : "bg-red-500/10 border-red-500/50"
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
                        className={`text-sm font-semibold mb-1 ${
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
                        className={`text-sm ${
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
              <form id="loginForm" onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 border border-green-500/30 rounded-lg focus:ring-2 focus:ring-green-400/50 focus:border-green-400 bg-black/50 text-white placeholder-gray-500 transition-all"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Password <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-14 py-3 border border-green-500/30 rounded-lg focus:ring-2 focus:ring-green-400/50 focus:border-green-400 bg-black/50 text-white placeholder-gray-500 transition-all"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-400 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-green-600 border-gray-600 rounded focus:ring-green-500 bg-gray-800"
                    />
                    <span className="ml-2 text-gray-300 group-hover:text-white transition-colors">
                      Remember me
                    </span>
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-green-400 hover:text-green-300 font-medium transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading || !isFormValid}
                  className={`w-full font-bold py-3.5 rounded-lg flex items-center justify-center space-x-2 transition-all ${
                    isLoading || !isFormValid
                      ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/30 hover:shadow-green-500/50"
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

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-gray-900/50 text-gray-400">or</span>
                </div>
              </div>

              {/* Demo Credentials Toggle */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setShowDemoCredentials(!showDemoCredentials)}
                  className="text-sm text-gray-400 hover:text-green-400 transition-colors font-medium"
                >
                  {showDemoCredentials ? "Hide" : "Show"} Demo Credentials
                </button>
              </div>

              {/* Demo Credentials */}
              {showDemoCredentials && (
                <div className="mt-4 space-y-3 animate-fadeIn">
                  {demoCredentials.map((cred, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => fillDemoCredentials(cred)}
                      className="w-full p-4 bg-black/30 hover:bg-black/50 border border-green-500/20 hover:border-green-500/40 rounded-lg transition-all text-left group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                          <cred.icon className="w-5 h-5 text-green-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-semibold">{cred.type}</p>
                          <p className="text-xs text-gray-400">{cred.description}</p>
                        </div>
                        <div className="text-right text-xs text-gray-500">
                          <div className="font-mono">{cred.email}</div>
                          <div className="mt-1 font-mono">{cred.password}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Sign Up Link */}
              <div className="mt-6 text-center">
                <p className="text-gray-400 text-sm">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-green-400 hover:text-green-300 font-semibold transition-colors">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}