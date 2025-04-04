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
import { apiClient } from "@/lib/apiClient";
import { SEARCH_CONTACTS_ROUTES } from "@/utils/constants";
import { Contacts } from "@/types/contacts/contacts";
import ShowContacts from "./ShowContacts";

interface IContactsModal {
  openNewContactModal: boolean;
  setOpenNewContactModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ContactsModal({
  openNewContactModal,
  setOpenNewContactModal,
}: IContactsModal) {
  const [searchedContacts, setSearchedContacts] = useState<Contacts[]>([]);
  const searchContacts = async (searchTerm: string) => {
    try {
      if (searchTerm.length > 0) {
        const response = await apiClient.post(
          SEARCH_CONTACTS_ROUTES,
          { searchTerm },
          { withCredentials: true }
        );
        console.log(response);
        if (response.status === 200 && response.data.contacts) {
          setSearchedContacts(response.data.contacts);
        }
      } else {
        setSearchedContacts([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          {searchedContacts.length > 0 && (
            <ShowContacts
              setSearchedContacts={setSearchedContacts}
              searchedContacts={searchedContacts}
              setOpenNewContactModal={setOpenNewContactModal}
            />
          )}
          {searchedContacts.length <= 0 && <Loading />}
        </DialogContent>
      </Dialog>
    </>
  );
}
