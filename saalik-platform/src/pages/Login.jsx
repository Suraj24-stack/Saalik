// src/auth/Login.jsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";

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
        // Replace current url params with clean /login
        navigate("/login", { replace: true });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, verificationSuccess, resetSuccess, navigate]);

  // Redirect when authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      const targetPath = user.role === "admin" ? "/admin_dashboard" : redirectPath;
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
        if (userData.role === "admin") targetPath = "/admin_dashboard";
        else if (userData.role === "moderator") targetPath = "/user_hostdashboard";
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
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          {/* Back Link */}
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 transition-all duration-200 hover:translate-x-1 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>

          {/* Success Message */}
          {displaySuccessMessage && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-start animate-fadeIn">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="text-green-700 text-sm font-medium">
                  {displaySuccessMessage}
                </p>
              </div>
            </div>
          )}

          {/* Login Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-3xl flex items-center justify-center mx-auto shadow-lg">
                <LogIn className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                <p className="text-gray-600 leading-relaxed">
                  Sign in to your account to continue your study abroad journey
                </p>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div
                className={`rounded-xl p-4 animate-fadeIn border ${
                  isEmailVerificationError
                    ? "bg-orange-50 border-orange-200"
                    : isAccountStatusError
                    ? "bg-yellow-50 border-yellow-200"
                    : "bg-red-50 border-red-200"
                }`}
              >
                <div className="flex items-start space-x-3">
                  {isEmailVerificationError ? (
                    <Mail className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  ) : isAccountStatusError ? (
                    <Shield className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p
                      className={`text-sm font-medium ${
                        isEmailVerificationError
                          ? "text-orange-700"
                          : isAccountStatusError
                          ? "text-yellow-700"
                          : "text-red-700"
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
                          ? "text-orange-600"
                          : isAccountStatusError
                          ? "text-yellow-600"
                          : "text-red-600"
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
                <label className="block text-sm font-semibold text-gray-700">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50/50 hover:bg-white text-gray-900 placeholder-gray-500"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-14 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50/50 hover:bg-white text-gray-900 placeholder-gray-500"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
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
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-3 text-sm text-gray-600 font-medium">Remember me</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
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
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
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
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">
                  New to Maansu Education?
                </span>
              </div>
            </div>

            {/* Sign Up */}
            <div className="space-y-4">
              <Link
                to="/register"
                className="inline-flex items-center justify-center w-full py-4 px-6 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-all"
              >
                <BookOpen className="w-5 h-5" />
                <span>Create New Account</span>
              </Link>

              {/* Demo Credentials */}
              <button
                type="button"
                onClick={() => setShowDemoCredentials(!showDemoCredentials)}
                className="inline-flex items-center justify-center w-full py-3 px-6 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 text-purple-600 font-medium rounded-xl hover:from-purple-100 hover:to-blue-100"
              >
                <Shield className="w-4 h-4" />
                <span>Quick Demo Login</span>
              </button>
            </div>

            {/* Demo Panel */}
            {showDemoCredentials && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-6 space-y-4 animate-fadeIn">
                <div className="flex items-center space-x-2 mb-3">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <h3 className="text-sm font-bold text-gray-700">Demo Credentials</h3>
                </div>
                <div className="grid gap-3">
                  {demoCredentials.map((cred, index) => {
                    const IconComponent = cred.icon;
                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => fillDemoCredentials(cred)}
                        className="text-left p-4 bg-white/60 hover:bg-white rounded-lg border border-white/40 hover:border-blue-200 group"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                            <IconComponent className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-700">{cred.type} Account</p>
                            <p className="text-xs text-gray-500 mt-1">{cred.description}</p>
                          </div>
                          <div className="text-xs text-blue-600 opacity-0 group-hover:opacity-100">
                            Click to use
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <div className="text-xs text-gray-500 text-center pt-2 border-t border-blue-100">
                  These are test accounts for demonstration purposes
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

   
       
 
    </main>
  );
}
