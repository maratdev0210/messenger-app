import { StateCreator } from "zustand";
import { Contacts, DirectMessagesContacts } from "@/types/contacts/contacts";

export interface ChatState {
  selectedChatType: string | undefined;
  selectedChatData: Contacts | DirectMessagesContacts | undefined;
  selectedChatMessages: any[];
  directMessagesContacts: DirectMessagesContacts[];
  setDirectMessagesContacts: (
    directMessagesContacts: DirectMessagesContacts[]
  ) => void;
  setSelectedChatType: (selectedChatType: string | undefined) => void;
  setSelectedChatData: (
    selectedChatData: Contacts | DirectMessagesContacts | undefined
  ) => void;
  setSelectedChatMessages: (selectedChatMessages: any[]) => void;
  closeChat: () => void;
  addMessage: (message: any) => void;
}

export const createChatSlice: StateCreator<ChatState> = (set, get) => ({
  selectedChatType: undefined,
  selectedChatData: undefined,
  selectedChatMessages: [],
  directMessagesContacts: [],
  setDirectMessagesContacts: (directMessagesContacts) => {
    set({ directMessagesContacts });
  },
  setSelectedChatType: (selectedChatType: string | undefined) =>
    set({ selectedChatType }),
  setSelectedChatData: (
    selectedChatData: Contacts | DirectMessagesContacts | undefined
  ) => set({ selectedChatData }),
  setSelectedChatMessages: (selectedChatMessages: any[]) =>
    set({ selectedChatMessages }),
  closeChat: () =>
    set({
      selectedChatData: undefined,
      selectedChatType: undefined,
      selectedChatMessages: [],
    }),
  addMessage: (message) => {
    const selectedChatMessages = get().selectedChatMessages;
    const selectedChatType = get().selectedChatType;

    set({
      selectedChatMessages: [
        ...selectedChatMessages,
        {
          ...message,
          recipient:
            selectedChatType === "channel"
              ? message.recipient
              : message.recipient._id,
          sender:
            selectedChatType === "channel"
              ? message.sender
              : message.sender._id,
        },
      ],
    });
  },
});
