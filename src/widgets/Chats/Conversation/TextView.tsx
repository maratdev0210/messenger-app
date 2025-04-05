// Show text messages here

import { Message } from "@/types/messages/messages";
import { Contacts } from "@/types/contacts/contacts";

export default function TextView({
  message,
  selectedChatData,
}: {
  message: Message;
  selectedChatData: Contacts | undefined;
}) {
  return (
    <>
      <div
        className={`${
          message.sender !== selectedChatData._id
            ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
            : "bg-[#2a2b33]/5 text-white/80 border-white/20"
        } border inline-block p-4 rounded my-1 max-w[50%] break-words`}
      >
        {message.content}
      </div>
    </>
  );
}
