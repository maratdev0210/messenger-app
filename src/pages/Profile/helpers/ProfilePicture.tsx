import { Plus, Trash } from "lucide-react";
import { useState } from "react";

interface IProfilePicture {
  profileColor: string;
  isPictureSet: boolean;
}

function IconDisplay({ isPictureSet }: { isPictureSet: boolean }) {
  return (
    <div className="absolute translate-x-1/2 translate-y-1/2">
      {isPictureSet ? (
        <Trash className="text-white" />
      ) : (
        <Plus className="text-white" />
      )}
    </div>
  );
}

export default function ProfilePicture({
  profileColor,
  isPictureSet,
}: IProfilePicture) {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  return (
    <>
      <div
        onMouseLeave={() => setIsHovered(false)}
        onMouseEnter={() => setIsHovered(true)}
        className={`${profileColor} ${isHovered ? "opacity-70 transition duration-300 ease-in-out" : ""} cursor-pointer size-12 mb-2 rounded-full `}
      >
        {isHovered && <IconDisplay isPictureSet={isPictureSet} />}
      </div>
    </>
  );
}
