// List of contacts after the user searches for them inside a contacts modal

import { ScrollArea } from "@/components/ui/scroll-area";
import { Contacts } from "@/types/contacts/contacts";
import ProfilePicture from "@/pages/Profile/helpers/ProfilePicture";
import { HOST } from "@/utils/constants";
import { useAppStore } from "@/store/store";

interface IShowContacts {
  searchedContacts: Contacts[];
  setSearchedContacts: React.Dispatch<React.SetStateAction<Contacts[]>>;
  setOpenNewContactModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ShowContacts({
  searchedContacts,
  setSearchedContacts,
  setOpenNewContactModal,
}: IShowContacts) {
  const { setSelectedChatType, setSelectedChatData } = useAppStore();

  const selectNewContact = (contact: Contacts) => {
    setOpenNewContactModal(false);
    setSelectedChatType("contact");
    setSelectedChatData(contact);
    setSearchedContacts([]);
  };

  return (
    <>
      <ScrollArea className="h-[250px]">
        <div className="flex flex-col gap-4">
          {searchedContacts.map((contact, index) => {
            return (
              <div
                onClick={() => selectNewContact(contact)}
                key={index}
                className="flex gap-2 items-center cursor-pointer"
              >
                <div>
                  <ProfilePicture
                    profilePicture={`${HOST}/${contact.image}`}
                    profileColor={contact.profileColor}
                    isPictureSet={true}
                    canChange={false}
                  />
                </div>
                <div>
                  <span className="text-lg">{contact.username}</span>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </>
  );
}
