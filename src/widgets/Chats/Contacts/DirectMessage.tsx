// Direct Messaging (one on one chats)

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Plus } from "lucide-react";
import { useState } from "react";
import ContactsModal from "./ContactsModal";

export default function DirectMessage() {
  const [openNewContactModal, setOpenNewContactModal] =
    useState<boolean>(false);
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Plus
              onClick={() => setOpenNewContactModal(true)}
              className="text-opacity-90 text-sm cursor-pointer hover:transition hover:duration-300 hover:scale-105"
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none p-3 text-white">
            Выбрать новый контакт
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <ContactsModal
        openNewContactModal={openNewContactModal}
        setOpenNewContactModal={setOpenNewContactModal}
      />
    </>
  );
}
