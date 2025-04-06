// show the messages in the chat

import moment from "moment";
import { useAppStore } from "@/store/store";
import { Message } from "@/types/messages/messages";
import { Contacts, DirectMessagesContacts } from "@/types/contacts/contacts";
import TextView from "./TextView";
import FileView from "./FileView";
import React from "react";

function DirectMessageView({
  message,
  selectedChatData,
  setShowImage,
  setImageURL,
}: {
  message: Message;
  selectedChatData: Contacts | DirectMessagesContacts | undefined;
  setShowImage: React.Dispatch<React.SetStateAction<boolean>>;
  setImageURL: React.Dispatch<React.SetStateAction<string | undefined>>;
}) {
  return (
    <>
      <div
        className={`${message.sender === selectedChatData._id ? "text-left" : "text-right"}`}
      >
        {message.messageType === "text" && (
          <TextView selectedChatData={selectedChatData} message={message} />
        )}
        {message.messageType === "file" && (
          <FileView
            setShowImage={setShowImage}
            setImageURL={setImageURL}
            selectedChatData={selectedChatData}
            message={message}
          />
        )}
        <div className="text-xs text-gray-600">
          {moment(message.timestamp).format("LT")}
        </div>
      </div>
    </>
  );
}

interface IMessageView {
  setShowImage: React.Dispatch<React.SetStateAction<boolean>>;
  setImageURL: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export default function MessagesView({
  setShowImage,
  setImageURL,
}: IMessageView) {
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
              <div className="text-center text-gray-900 my-2">
                {moment(message.timestamp).format("LL")}
              </div>
            )}
            {selectedChatType === "contact" && (
              <DirectMessageView
                setShowImage={setShowImage}
                setImageURL={setImageURL}
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
