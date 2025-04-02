import Logo from "../../../assets/Logo";
import ProfileInfo from "../ProfileInfo/ProfileInfo";

interface ITitle {
  text: string;
}

export default function Contacts() {
  return (
    <>
      <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full">
        <div className="pt-3">
          <div className="size-16">
            <Logo animate={false} />
          </div>
          <div>
            <Title text="Личные сообщения" />
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
