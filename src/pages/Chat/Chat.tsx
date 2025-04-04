import { useAppStore } from "../../store/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Contacts, Conversation, EmptyChat } from "../../widgets/Chats/index";

export default function Chat() {
  const { userInfo, selectedChatType } = useAppStore();

  return (
    <>
      <div className="flex h-[100vh] text-white overflow-hidden">
        <Contacts />
        {selectedChatType === undefined ? <EmptyChat /> : <Conversation />}
      </div>
    </>
  );
}
