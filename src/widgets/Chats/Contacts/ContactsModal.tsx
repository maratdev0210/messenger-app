// Selecting the Contacts for messaging
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import Loading from "@/features/global/Loading";

interface IContactsModal {
  openNewContactModal: boolean;
  setOpenNewContactModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ContactsModal({
  openNewContactModal,
  setOpenNewContactModal,
}: IContactsModal) {
  const searchContacts = async (search) => {};
  const [searchedContacts, setSearchedContacts] = useState<string[]>([]);

  return (
    <>
      <Dialog onOpenChange={setOpenNewContactModal} open={openNewContactModal}>
        <DialogContent className="bg-[#181920] z-100 border-none text-white w-[400px] h-[400px] flex flex-col">
          <DialogHeader>
            <DialogTitle>Выберите контакты</DialogTitle>
            <DialogDescription>Выберите контакты</DialogDescription>
          </DialogHeader>
          <div>
            <Input
              onChange={(event) => searchContacts(event.target.value)}
              placeholder="Search Contacts"
              className="rounded-lg p-4 bg-[#2c2e3b] border-none"
            />
          </div>
          {searchedContacts.length <= 0 && <Loading />}
        </DialogContent>
      </Dialog>
    </>
  );
}
