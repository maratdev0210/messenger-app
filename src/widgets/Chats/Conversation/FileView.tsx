// Show files here

import { Message } from "@/types/messages/messages";
import { Contacts } from "@/types/contacts/contacts";
import { HOST } from "@/utils/constants";
import { FileArchive, FileDown } from "lucide-react";
import { apiClient } from "@/lib/apiClient";

function isImage(filePath: string | undefined): boolean {
  const imageRegex =
    /\.(jpg|jpeg|png|gif|bmp|tiff|tif|webp|svg|ico|heic|heif)$/i;

  return imageRegex.test(filePath);
}

export default function FileView({
  message,
  selectedChatData,
  setShowImage,
  setImageURL,
}: {
  message: Message;
  selectedChatData: Contacts | undefined;
  setShowImage: React.Dispatch<React.SetStateAction<boolean>>;
  setImageURL: React.Dispatch<React.SetStateAction<string | undefined>>;
}) {
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
  };

  const handleImageClick = () => {
    setShowImage(true);
    setImageURL(message.fileUrl);
  };

  return (
    <>
      <div
        className={`${
          message.sender !== selectedChatData._id
            ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
            : "bg-[#2a2b33]/5 text-white/80 border-white/20"
        } cursor-pointer border inline-block p-2 rounded my-1 break-words`}
      >
        {isImage(message.fileUrl) ? (
          <div>
            <img
              onClick={() => handleImageClick()}
              src={`${HOST}/${message.fileUrl}`}
              className="size-48"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center gap-4">
            <span>{message.fileUrl?.split("/").pop()}</span>
            <span
              onClick={() => downloadFile(message.fileUrl)}
              className="bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition duration-300"
            >
              <FileDown />
            </span>
          </div>
        )}
      </div>
    </>
  );
}
