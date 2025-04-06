import { useState, useRef, useEffect } from "react";
import { Link, SmilePlus, SendHorizontal } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import { Theme } from "emoji-picker-react";
import { useAppStore } from "@/store/store";
import { useSocket } from "@/context/SocketContext";
import { apiClient } from "@/lib/apiClient";
import { UPLOAD_FILE_ROUTE } from "@/utils/constants";

export default function MessageBar() {
  const emojiRef = useRef(null);
  const socket = useSocket();
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState<string>("");
  const [emojiPickerOpen, setEmojiPickerOpen] = useState<boolean>(false);
  const { selectedChatType, selectedChatData, userInfo } = useAppStore();

  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setEmojiPickerOpen(false);
      }
    }

    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiRef]);

  const handleAddEmoji = (emoji) => {
    setMessage((msg) => msg + emoji.emoji);
  };

  const handleSendMessage = async () => {
    if (socket?.connected) {
      socket.emit("sendMessage", {
        sender: userInfo.id,
        content: message,
        recipient: selectedChatData?._id,
        messageType: "text",
        fileUrl: undefined,
      });
      setMessage("");
    } else {
      console.warn("Socket not connected");
    }
  };

  const handleAttachmentClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAttachmentChange = async (event) => {
    try {
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const response = await apiClient.post(UPLOAD_FILE_ROUTE, formData, {
          withCredentials: true,
        });

        if (response.status === 200 && response.data) {
          if (selectedChatType === "contact") {
            if (socket?.connected) {
              socket.emit("sendMessage", {
                sender: userInfo.id,
                content: undefined,
                recipient: selectedChatData?._id,
                messageType: "file",
                fileUrl: response.data.filePath,
              });
            } else {
              console.warn("Socket not connected");
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="h-[10vh] bg-gray-100 flex justify-center items-center px-8  gap-6">
        <div className="flex-1 flex bg-gray-900 rounded-md items-center gap-4 pr-5">
          <input
            type="text"
            className="flex-1 p-3 bg-transparent rounded-md focus:border-none focus:outline-none"
            placeholder="Введите сообщение"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={handleAttachmentClick}
            className="cursor-pointer text-neutral-500 hover:scale-110 hover:text-blue-500 hover:duration-300 hover:transition"
          >
            <Link />
          </button>
          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={handleAttachmentChange}
          />
          <div className="relative mt-1">
            <button
              onClick={() => setEmojiPickerOpen(true)}
              className="cursor-pointer text-neutral-500 hover:scale-110 hover:text-blue-500 hover:duration-300 hover:transition"
            >
              <SmilePlus />
            </button>
            <div ref={emojiRef} className="absolute bottom-16 right-8">
              <EmojiPicker
                theme={Theme.DARK}
                open={emojiPickerOpen}
                onEmojiClick={handleAddEmoji}
                autoFocusSearch={false}
              />
            </div>
          </div>
        </div>
        <button
          onClick={handleSendMessage}
          className="cursor-pointer text-blue-500 hover:scale-110 hover:text-blue-500 hover:duration-300 hover:transition"
        >
          <SendHorizontal />
        </button>
      </div>
    </>
  );
}
