import { useAppStore } from "@/store/store";
import { useRef, useEffect } from "react";
import moment from "moment";
import MessagesView from "./MessagesView";

export default function Message() {
  const scrollRef = useRef(null);
  const { selectedChatType, selectedChatData, selectedChatMessages, userInfo } =
    useAppStore();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessages]);

  return (
    <>
      <div className="flex-1 overflow-y-auto scrollbar-hidden py-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full">
        <MessagesView />
        <div ref={scrollRef} />
      </div>
    </>
  );
}
