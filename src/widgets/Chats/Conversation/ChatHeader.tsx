import { X } from "lucide-react";

export default function ChatHeader() {
  return (
    <>
      <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between px-20">
        <div className="flex gap-5 items-center">
          <div className="flex gap-3 items-center justify-center">
            {/* Selected chat */}
          </div>
          <div className="flex text-neutral-500 active:transition hover:-rotate-15 hover:duration-300 hover:transition active:duration-300 active:text-white items-center justify-center gap-5">
            <button className="cursor-pointer">
              <X /> {/* Closing the Chat */}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
