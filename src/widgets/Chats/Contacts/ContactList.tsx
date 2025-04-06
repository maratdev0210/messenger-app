import { useAppStore } from "@/store/store";
import { DirectMessagesContacts } from "@/types/contacts/contacts";
import ProfilePicture from "@/pages/Profile/helpers/ProfilePicture";
import { HOST } from "@/utils/constants";

export default function ContactList({
  contacts,
  isChannel,
}: {
  contacts: DirectMessagesContacts[];
  isChannel: boolean;
}) {
  const {
    selectedChatData,
    setSelectedChatData,
    setSelectedChatType,
    selectedChatType,
    setSelectedChatMessages,
  } = useAppStore();

  const handleClick = (contact: DirectMessagesContacts) => {
    if (isChannel) {
      setSelectedChatType("channel");
    } else {
      setSelectedChatType("contact");
    }
    setSelectedChatData(contact);
    if (selectedChatData && selectedChatData._id !== contact._id) {
      setSelectedChatMessages([]);
    }
  };

  return (
    <>
      <div className="mt-4">
        {contacts.map((contact, index) => {
          return (
            <div
              key={index}
              onClick={() => handleClick(contact)}
              className={`pl-4 py-2 transition duration-300 cursor-pointer ${selectedChatData && selectedChatData._id === contact._id ? "bg-blue-700 hover:bg-[#8417ff]" : "hover:bg-blue-400"}`}
            >
              <div className="flex gap-4 items-center justify-start text-gray-700">
                {!isChannel && (
                  <div className="h-12">
                    <ProfilePicture
                      profilePicture={`${HOST}/${contact.image}`}
                      profileColor={contact.profileColor}
                      isPictureSet={true}
                      canChange={false}
                    />
                  </div>
                )}
                {isChannel && (
                  <div className="bg-[#ffff22] h-10 w-10 flex items-center justify-center rounded-full">
                    #
                  </div>
                )}
                {isChannel ? (
                  <span>{contact.firstName}</span>
                ) : (
                  <span>
                    {contact.firstName} + + {contact.lastName}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
