import { StateCreator } from "zustand";
import { Contacts } from "@/types/contacts/contacts";

export interface ChatState {
  selectedChatType: string | undefined;
  selectedChatData: Contacts | undefined;
  selectedChatMessages: any[];
  setSelectedChatType: (selectedChatType: string | undefined) => void;
  setSelectedChatData: (selectedChatData: Contacts | undefined) => void;
  setSelectedChatMessages: (selectedChatMessages: any[]) => void;
  closeChat: () => void;
}

export const createChatSlice: StateCreator<ChatState> = (set) => ({
  selectedChatType: undefined,
  selectedChatData: undefined,
  selectedChatMessages: [],
  setSelectedChatType: (selectedChatType: string | undefined) =>
    set({ selectedChatType }),
  setSelectedChatData: (selectedChatData: Contacts | undefined) =>
    set({ selectedChatData }),
  setSelectedChatMessages: (selectedChatMessages: any[]) =>
    set({ selectedChatMessages }),
  closeChat: () =>
    set({
      selectedChatData: undefined,
      selectedChatType: undefined,
      selectedChatMessages: [],
    }),
});
