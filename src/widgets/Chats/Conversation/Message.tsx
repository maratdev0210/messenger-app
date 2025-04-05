import { useAppStore } from "@/store/store";
import { useRef, useEffect } from "react";
import MessagesView from "./MessagesView";
import { apiClient } from "@/lib/apiClient";
import { GET_ALL_MESSAGES_ROUTE } from "@/utils/constants";

export default function Message() {
  const scrollRef = useRef(null);
  const {
    selectedChatType,
    selectedChatData,
    selectedChatMessages,
    userInfo,
    setSelectedChatMessages,
  } = useAppStore();

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await apiClient.post(
          GET_ALL_MESSAGES_ROUTE,
          {
            id: selectedChatData._id,
          },
          {
            withCredentials: true,
          }
        );

        if (response.data.messages) {
          setSelectedChatMessages(response.data.messages);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (selectedChatData._id) {
      if (selectedChatType === "contact") {
        getMessages();
      }
    }
  }, [selectedChatData, selectedChatType, setSelectedChatMessages]);

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
