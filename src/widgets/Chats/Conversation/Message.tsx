import { useAppStore } from "@/store/store";
import { useRef, useEffect, useState } from "react";
import MessagesView from "./MessagesView";
import { apiClient } from "@/lib/apiClient";
import { GET_ALL_MESSAGES_ROUTE } from "@/utils/constants";
import { HOST } from "@/utils/constants";
import { FileDown } from "lucide-react";

export default function Message() {
  const scrollRef = useRef(null);
  const {
    selectedChatType,
    selectedChatData,
    selectedChatMessages,
    userInfo,
    setSelectedChatMessages,
  } = useAppStore();

  const [showImage, setShowImage] = useState<boolean>(false);
  const [imageURL, setImageURL] = useState<string | undefined>(undefined);
  const imageRef = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      console.log(imageRef.current);
      console.log(imageRef.current.contains(event.target));
      console.log(showImage);
      if (
        imageRef.current !== null &&
        !imageRef.current.contains(event.target) && showImage
      ) {
        setShowImage(false);
        setImageURL(undefined);
      }
    };

    window.addEventListener("click", handleClick);

    return () => window.removeEventListener("click", handleClick);
  }, [imageRef]);

  const downloadFile = async (fileUrl: string | undefined) => {
    const response = await apiClient.get(`${HOST}/${fileUrl}`, {
      responseType: "blob",
    });
    const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = urlBlob;
    link.setAttribute("download", fileUrl.split("/").pop());
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(urlBlob);
    setImageURL(undefined);
    setShowImage(false);
  };

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
        <MessagesView setShowImage={setShowImage} setImageURL={setImageURL} />
        <div ref={scrollRef} />
        {showImage && (
          <div className="fixed bg-black/80 z-1000 top-0 left-0 h-[100vh] w-full flex items-center justify-center backdrop-blur-sm">
            <img
              ref={imageRef}
              src={`${HOST}/${imageURL}`}
              className="h-[80vh] w-1/2 bg-cover"
            />
            <div className="absolute translate-x-full -translate-y-1/2 top-8">
              <FileDown
                className="cursor-pointer size-16"
                onClick={() => downloadFile(imageURL)}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
