// show the messages in the chat

import moment from "moment";
import { useAppStore } from "@/store/store";
import { Message } from "@/types/messages/messages";
import { Contacts } from "@/types/contacts/contacts";

function DirectMessageView({
  message,
  selectedChatData,
}: {
  message: Message;
  selectedChatData: Contacts | undefined;
}) {
  return (
    <>
      <div
        className={`${message.sender === selectedChatData._id ? "text-left" : "text-right"}`}
      >
        {message.messageType === "text" && (
          <div
            className={`${message.sender !== selectedChatData._id ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50" : "bg-[#2a2b33]/5 text-white/80 border-white/20"} border inline-block p-4 rounded my-1 max-w[50%] break-words`}
          >
            {message.content}
          </div>
        )}
        <div className="text-xs text-gray-600">
          {moment(message.timestamp).format("LT")}
        </div>
      </div>
    </>
  );
}

export default function MessagesView() {
  const { selectedChatType, selectedChatData, selectedChatMessages, userInfo } =
    useAppStore();

  let lastDate: null | string = null;
  return (
    <>
      {selectedChatMessages.map((message, index) => {
        const messageDate = moment(message.timestamp).format("YYYY-MM-DD");
        const showDate = messageDate !== lastDate;
        lastDate = messageDate;
        return (
          <div key={index}>
            {showDate && (
              <div className="text-center text-gray-500 my-2">
                {moment(message.timestamp).format("LL")}
              </div>
            )}
            {selectedChatType === "contact" && (
              <DirectMessageView
                message={message}
                selectedChatData={selectedChatData}
              />
            )}
          </div>
        );
      })}
    </>
  );
}
