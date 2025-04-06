import { useAppStore } from "@/store/store";
import { X } from "lucide-react";
import { HOST } from "@/utils/constants";
import ProfilePicture from "@/pages/Profile/helpers/ProfilePicture";

export default function ChatHeader() {
  const { closeChat, selectedChatData, selectedChatType } = useAppStore();

  return (
    <>
      <div className="h-16 border-b-2 border-[#2f303b] flex items-center justify-between px-20">
        <div className="flex gap-5 items-center w-full justify-between">
          <div className="flex gap-3 items-center justify-center">
            <ProfilePicture
              profileColor={selectedChatData.profileColor}
              profilePicture={`${HOST}/${selectedChatData.image}`}
              isPictureSet={true}
              canChange={false}
            />
            <div className="cursor-pointer">
              {selectedChatType === "contact" && (
                <p className="text-lg text-black">
                  <span>{selectedChatData.firstName}</span>
                  <span className="ml-1">{selectedChatData.lastName}</span>
                </p>
              )}
            </div>
          </div>
          <div className="flex text-neutral-500 active:transition hover:-rotate-15 hover:duration-300 hover:transition active:duration-300 active:text-white items-center justify-center gap-5">
            <button onClick={closeChat} className="cursor-pointer">
              <X />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
