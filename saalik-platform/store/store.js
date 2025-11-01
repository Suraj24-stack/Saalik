// store/store.js (or store/index.js) - CORRECTED VERSION
import { configureStore } from "@reduxjs/toolkit";

// Import slices
import authSlice from "./slices/authSlice";
import userSlice from "./slices/userSlice";
import storySlice from "./slices/storySlice";
import storysuggestion from "./slices/storysuggestionSlice";
import initiative from "./slices/initiativeSlice";
import partner from "./slices/partnerSlice";
import waitlist from "./slices/waitlistSlice";
import setting from "./slices/settingSlice";
import contact from "./slices/contactSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    story: storySlice,
    storySuggestion: storysuggestion,  // ✅ FIXED: Changed from 'storysuggestion' to 'storySuggestion'
    initiative: initiative,
    partner: partner,
    waitlist: waitlist,
    setting: setting,
    contact: contact,
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