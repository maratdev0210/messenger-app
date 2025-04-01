import { StateCreator } from "zustand";

export interface AuthState {
  userInfo?: string; 
  setUserInfo: (userInfo: string | undefined) => void;
}

export const createAuthSlice: StateCreator<AuthState> = (set) => ({
  userInfo: undefined,
  setUserInfo: (userInfo) => set({ userInfo }),
});
