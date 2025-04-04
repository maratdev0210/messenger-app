import { create } from "zustand";
import { createAuthSlice } from "./slices/authSlice";
import { createChatSlice } from "./slices/chatSlice";
import { AuthState } from "./slices/authSlice";
import { ChatState } from "./slices/chatSlice";

type AppState = AuthState & ChatState; // TO-DO: add Record for extending the state

export const useAppStore = create<AppState>()((...a) => ({
  ...createAuthSlice(...a),
  ...createChatSlice(...a),
}));
