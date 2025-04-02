import { useAppStore } from "../../store/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Contacts, Conversation, EmptyChat } from "../../widgets/Chats/index";

export default function Chat() {
  return (
    <>
      <div className="flex h-[100vh] text-white overflow-hidden">
        <Contacts />
        {/* <EmptyChat /> */}
        <Conversation />
      </div>
    </>
  );
}
