import { useState, useRef, useEffect } from "react";
import { Link, SmilePlus, SendHorizontal } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import { Theme } from "emoji-picker-react";

export default function MessageBar() {
  const emojiRef = useRef(null);
  const [message, setMessage] = useState<string>("");
  const [emojiPickerOpen, setEmojiPickerOpen] = useState<boolean>(false);

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

  const handleSendMessage = async () => {};

  return (
    <>
      <div className="h-[10vh] bg-[#1c1d25] flex justify-center items-center px-8 mb-6 gap-6">
        <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center gap-4 pr-5">
          <input
            type="text"
            className="flex-1 p-3 bg-transparent rounded-md focus:border-none focus:outline-none"
            placeholder="Введите сообщение"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="cursor-pointer text-neutral-500 hover:scale-110 hover:text-blue-500 hover:duration-300 hover:transition">
            <Link />
          </button>
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
