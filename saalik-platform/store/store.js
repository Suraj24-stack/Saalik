// store/store.js (or store/index.js)
import { configureStore } from "@reduxjs/toolkit";

// Import slices
import authSlice from "./slices/authSlice";
import userSlice from "./slices/userSlice";


export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice, // Fixed: removed duplicate
    // host: hostReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

// Export for use in useSelector hooks
export default store;