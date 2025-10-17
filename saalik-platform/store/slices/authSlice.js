

// store/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../lib/api";

// Initialize API token from localStorage immediately
if (typeof window !== "undefined") {
  const token = localStorage.getItem("token");
  if (token) {
    api.setAuthToken(token);
  }
}

// Login
export const LoginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await api.post("/auth/Login", credentials);

      // Store token in localStorage
      if (typeof window !== "undefined" && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        // Set token in api module for future requests
        api.setAuthToken(data.token);
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Login failed");
    }
  }
);

// Register
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const data = await api.post("/users", userData);

      // Don't store token or log user in automatically if email verification is required
      // Only store token if email is already verified (edge case)
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

// Forgot Password - Request Reset
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

// Get current user / Verify token
export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found");
      }

      // Set token in api module
      api.setAuthToken(token);

      const data = await api.get("/auth/verify");
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

// Refresh token
export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found");
      }

      api.setAuthToken(token);
      const data = await api.post("/auth/refresh");

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

// Initial state
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  initialized: false, // Track if we've checked localStorage

  // Email verification states
  emailVerification: {
    isLoading: false,
    success: false,
    error: null,
    message: null,
    registrationEmail: null, // Track email used for registration
  },

  // Password reset states
  passwordReset: {
    isLoading: false,
    emailSent: false,
    resetSuccess: false,
    error: null,
    message: null,
  },
};

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
            // Set token in api module
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

    // Load user from localStorage (backward compatibility)
    loadUserFromStorage: (state) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");

        if (token && user) {
          try {
            state.token = token;
            state.user = JSON.parse(user);
            state.isAuthenticated = true;
            // Set token in api module
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

    // Logout
    logout: (state) => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        // Clear token from api module
        api.clearAuthToken();
      }
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;

      // Reset verification and password reset states
      state.emailVerification = initialState.emailVerification;
      state.passwordReset = initialState.passwordReset;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },

    // Clear email verification state
    clearEmailVerificationState: (state) => {
      state.emailVerification = initialState.emailVerification;
    },

    // Clear password reset state
    clearPasswordResetState: (state) => {
      state.passwordReset = initialState.passwordReset;
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
      // Login
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

        // Ensure token is set in API client
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

      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        // Only set as authenticated if email is already verified
        if (action.payload.user?.email_verified) {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;

          if (action.payload.token) {
            api.setAuthToken(action.payload.token);
          }
        } else {
          // Don't authenticate user if email is not verified
          state.isAuthenticated = false;
          state.user = null;
          state.token = null;

          // Set registration success message
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

      // Email Verification
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

        // Update user's email_verified status if logged in
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

      // Resend Verification Email
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

      // Forgot Password
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

      // Reset Password
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

      // Get current user
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user || action.payload;
        state.isAuthenticated = true;

        // Update user in localStorage
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

      // Refresh token
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
        // If refresh fails, logout
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          api.clearAuthToken();
        }
      });
  },
});

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
