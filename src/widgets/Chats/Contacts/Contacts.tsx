import Logo from "../../../assets/Logo";
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import DirectMessage from "./DirectMessage";
import { useEffect } from "react";
import { apiClient } from "@/lib/apiClient";
import { GET_DM_CONTACTS_ROUTES } from "@/utils/constants";
import { useAppStore } from "@/store/store";
import ContactList from "./ContactList";

interface ITitle {
  text: string;
}

export default function Contacts() {
  const { setDirectMessagesContacts, directMessagesContacts } = useAppStore();
  useEffect(() => {
    const getContacts = async () => {
      try {
        const response = await apiClient.get(GET_DM_CONTACTS_ROUTES, {
          withCredentials: true,
        });

        if (response.data.contacts) {
          setDirectMessagesContacts(response.data.contacts);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getContacts();
  }, []);

  return (
    <>
      <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full">
        <div className="pt-3">
          <div className="size-16">
            <Logo animate={false} />
          </div>
          <div className="my-5">
            <div className="flex items-center justify-between pr-2">
              <Title text="Личные сообщения" />
              <DirectMessage />
            </div>
            <div className="max-h-[30vh] overflow-y-auto scrollbar-hidden">
              <ContactList
                contacts={directMessagesContacts}
                isChannel={false}
              />
            </div>
          </div>
          <div className="my-2">
            <Title text="Каналы" />
          </div>
        </div>
        <ProfileInfo />
      </div>
    </>
  );
}

function Title({ text }: ITitle) {
  return (
    <div className="my-5 cursor-pointer">
      <div className="flex items-center justify-between pr-10">
        <h6 className="uppercase tracking-widest text-neutral-400 pl-4 font-light text-opacity-90 text-sm">
          {text}
        </h6>
      </div>
    </div>
  );
}
