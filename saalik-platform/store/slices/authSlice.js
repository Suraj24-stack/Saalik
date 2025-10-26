// src/store/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../lib/api";

// ============================================
// ASYNC THUNKS
// ============================================

// Login User
export const LoginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      // FIXED: Changed /auth/Login to /auth/login (lowercase)
      const data = await api.post("/auth/login", credentials);

      // Store token in localStorage
      if (typeof window !== "undefined" && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        api.setAuthToken(data.token);
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Login failed");
    }
  }
);

// Register User
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const data = await api.post("/auth/register", userData);

      // Only store token if email is already verified
      if (
        typeof window !== "undefined" &&
        data.token &&
        data.user?.email_verified
      ) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        api.setAuthToken(data.token);
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Registration failed");
    }
  }
);

// Verify Email
export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (token, { rejectWithValue }) => {
    try {
      const data = await api.get(`/auth/verify-email?token=${token}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Email verification failed");
    }
  }
);

// Resend Verification Email
export const resendVerificationEmail = createAsyncThunk(
  "auth/resendVerificationEmail",
  async (email, { rejectWithValue }) => {
    try {
      const data = await api.post("/auth/resend-verification", { email });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Failed to resend verification email"
      );
    }
  }
);

// Forgot Password
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const data = await api.post("/auth/forgot-password", { email });
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to send reset email");
    }
  }
);

// Reset Password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, newPassword }, { rejectWithValue }) => {
    try {
      const data = await api.post("/auth/reset-password", {
        token,
        newPassword,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to reset password");
    }
  }
);

// Get Current User
export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found");
      }

      api.setAuthToken(token);
      const data = await api.get("/auth/me");
      return data;
    } catch (error) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        api.clearAuthToken();
      }
      return rejectWithValue(error.message || "Token verification failed");
    }
  }
);

// Refresh Token
export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found");
      }

      api.setAuthToken(token);
      const data = await api.post("/auth/refresh-token");

      if (data.token) {
        localStorage.setItem("token", data.token);
        api.setAuthToken(data.token);
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Token refresh failed");
    }
  }
);

// Logout User
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await api.post("/auth/logout");
      
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        api.clearAuthToken();
      }

      return null;
    } catch (error) {
      // Clear local storage even on error
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        api.clearAuthToken();
      }
      return rejectWithValue(error.message || "Logout failed");
    }
  }
);

// ============================================
// INITIAL STATE
// ============================================

const getInitialState = () => {
  if (typeof window === "undefined") {
    return {
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      initialized: false,
      emailVerification: {
        isLoading: false,
        success: false,
        error: null,
        message: null,
        registrationEmail: null,
      },
      passwordReset: {
        isLoading: false,
        emailSent: false,
        resetSuccess: false,
        error: null,
        message: null,
      },
    };
  }

  // Try to load from localStorage
  let user = null;
  let token = null;
  let isAuthenticated = false;

  try {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      token = storedToken;
      user = JSON.parse(storedUser);
      isAuthenticated = true;
      api.setAuthToken(storedToken);
    }
  } catch (error) {
    console.error("Error loading auth from storage:", error);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  return {
    user,
    token,
    isAuthenticated,
    isLoading: false,
    error: null,
    initialized: true,
    emailVerification: {
      isLoading: false,
      success: false,
      error: null,
      message: null,
      registrationEmail: null,
    },
    passwordReset: {
      isLoading: false,
      emailSent: false,
      resetSuccess: false,
      error: null,
      message: null,
    },
  };
};

const initialState = getInitialState();

// ============================================
// AUTH SLICE
// ============================================

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Initialize auth from localStorage
    initializeAuth: (state) => {
      if (typeof window !== "undefined" && !state.initialized) {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");

        if (token && user) {
          try {
            state.token = token;
            state.user = JSON.parse(user);
            state.isAuthenticated = true;
            api.setAuthToken(token);
          } catch (error) {
            console.error("Error loading auth from storage:", error);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            api.clearAuthToken();
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
          }
        }
        state.initialized = true;
      }
    },

    // Load user from localStorage
    loadUserFromStorage: (state) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");

        if (token && user) {
          try {
            state.token = token;
            state.user = JSON.parse(user);
            state.isAuthenticated = true;
            api.setAuthToken(token);
          } catch (error) {
            console.error("Error loading user from storage:", error);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            api.clearAuthToken();
          }
        }
      }
    },

    // Set auth data manually
    setAuthData: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;

      if (typeof window !== "undefined" && token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        api.setAuthToken(token);
      }
    },

    // Logout (synchronous)
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;

      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        api.clearAuthToken();
      }
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },

    // Clear email verification state
    clearEmailVerificationState: (state) => {
      state.emailVerification = {
        isLoading: false,
        success: false,
        error: null,
        message: null,
        registrationEmail: null,
      };
    },

    // Clear password reset state
    clearPasswordResetState: (state) => {
      state.passwordReset = {
        isLoading: false,
        emailSent: false,
        resetSuccess: false,
        error: null,
        message: null,
      };
    },

    // Update user
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },

    // Set email verified status
    setEmailVerified: (state, action) => {
      if (state.user) {
        state.user.email_verified = action.payload;
        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(state.user));
        }
      }
    },
  },

  extraReducers: (builder) => {
    builder
      // ============================================
      // LOGIN
      // ============================================
      .addCase(LoginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;

        if (action.payload.token) {
          api.setAuthToken(action.payload.token);
        }
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      })

      // ============================================
      // REGISTER
      // ============================================
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        // Only authenticate if email is verified
        if (action.payload.user?.email_verified) {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;

          if (action.payload.token) {
            api.setAuthToken(action.payload.token);
          }
        } else {
          // Don't authenticate if email not verified
          state.isAuthenticated = false;
          state.user = null;
          state.token = null;

          state.emailVerification.message =
            "Registration successful! Please check your email to verify your account.";
          state.emailVerification.registrationEmail =
            action.payload.user?.email;
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      })

      // ============================================
      // EMAIL VERIFICATION
      // ============================================
      .addCase(verifyEmail.pending, (state) => {
        state.emailVerification.isLoading = true;
        state.emailVerification.error = null;
        state.emailVerification.success = false;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.emailVerification.isLoading = false;
        state.emailVerification.success = true;
        state.emailVerification.message =
          action.payload.message || "Email verified successfully!";
        state.emailVerification.error = null;

        // Update user if logged in
        if (state.user) {
          state.user.email_verified = true;
          if (typeof window !== "undefined") {
            localStorage.setItem("user", JSON.stringify(state.user));
          }
        }
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.emailVerification.isLoading = false;
        state.emailVerification.success = false;
        state.emailVerification.error = action.payload;
      })

      // ============================================
      // RESEND VERIFICATION EMAIL
      // ============================================
      .addCase(resendVerificationEmail.pending, (state) => {
        state.emailVerification.isLoading = true;
        state.emailVerification.error = null;
      })
      .addCase(resendVerificationEmail.fulfilled, (state, action) => {
        state.emailVerification.isLoading = false;
        state.emailVerification.message =
          action.payload.message || "Verification email sent!";
        state.emailVerification.error = null;
      })
      .addCase(resendVerificationEmail.rejected, (state, action) => {
        state.emailVerification.isLoading = false;
        state.emailVerification.error = action.payload;
      })

      // ============================================
      // FORGOT PASSWORD
      // ============================================
      .addCase(forgotPassword.pending, (state) => {
        state.passwordReset.isLoading = true;
        state.passwordReset.error = null;
        state.passwordReset.emailSent = false;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.passwordReset.isLoading = false;
        state.passwordReset.emailSent = true;
        state.passwordReset.message =
          action.payload.message || "Password reset email sent!";
        state.passwordReset.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.passwordReset.isLoading = false;
        state.passwordReset.emailSent = false;
        state.passwordReset.error = action.payload;
      })

      // ============================================
      // RESET PASSWORD
      // ============================================
      .addCase(resetPassword.pending, (state) => {
        state.passwordReset.isLoading = true;
        state.passwordReset.error = null;
        state.passwordReset.resetSuccess = false;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.passwordReset.isLoading = false;
        state.passwordReset.resetSuccess = true;
        state.passwordReset.message =
          action.payload.message || "Password reset successfully!";
        state.passwordReset.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.passwordReset.isLoading = false;
        state.passwordReset.resetSuccess = false;
        state.passwordReset.error = action.payload;
      })

      // ============================================
      // GET CURRENT USER
      // ============================================
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user || action.payload;
        state.isAuthenticated = true;

        if (typeof window !== "undefined" && state.user) {
          localStorage.setItem("user", JSON.stringify(state.user));
        }
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = action.payload;
      })

      // ============================================
      // REFRESH TOKEN
      // ============================================
      .addCase(refreshToken.fulfilled, (state, action) => {
        if (action.payload.token) {
          state.token = action.payload.token;
          api.setAuthToken(action.payload.token);
        }
        if (action.payload.user) {
          state.user = action.payload.user;
        }
      })
      .addCase(refreshToken.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          api.clearAuthToken();
        }
      })

      // ============================================
      // LOGOUT
      // ============================================
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      });
  },
});

// ============================================
// ACTIONS & SELECTORS
// ============================================

export const {
  initializeAuth,
  loadUserFromStorage,
  logout,
  clearError,
  setAuthData,
  updateUser,
  clearEmailVerificationState,
  clearPasswordResetState,
  setEmailVerified,
} = authSlice.actions;

// Selectors
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectAuthError = (state) => state.auth.error;
export const selectIsInitialized = (state) => state.auth.initialized;

// Email verification selectors
export const selectEmailVerification = (state) => state.auth.emailVerification;
export const selectIsEmailVerified = (state) =>
  state.auth.user?.email_verified || false;
export const selectRegistrationEmail = (state) =>
  state.auth.emailVerification.registrationEmail;
export const selectRegistrationSuccess = (state) =>
  !!state.auth.emailVerification.registrationEmail;

// Password reset selectors
export const selectPasswordReset = (state) => state.auth.passwordReset;

export default authSlice.reducer;