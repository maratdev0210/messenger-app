import { create } from "zustand";
import { createAuthSlice } from "./slices/authSlice";
import { AuthState } from "./slices/authSlice";

type AppState = AuthState; // TO-DO: add Record for extending the state

export const useAppStore = create<AppState>()((...a) => ({
  ...createAuthSlice(...a),
}));
