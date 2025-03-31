/* Showcasing the chat interface between two users */

import ProfilePicture from "../../../assets/profile.png";
import Message from "./Message";

export default function Conversation() {
  return (
    <>
      <div className="w-72 scale-x-90 h-80 shadow-lg rounded-sm ml-4 py-2">
        <div className="flex pb-3 items-center shadow-xs gap-2 border-b-gray-100 border-b-1 px-4">
          <div className="overflow-hidden">
            <img src={ProfilePicture} className="size-8 rounded-full" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-black text-sm">John Snow</span>
            <span className="text-xs text-gray-400">Messenger</span>
          </div>
        </div>
        <div className="px-4 mt-4 flex flex-col gap-3">
          <Message message="Do you know what time is it?" sentByMe={false} />
          <Message message="It's morning in Tokyo!" sentByMe={true} />
        </div>
      </div>
    </>
  );
}
