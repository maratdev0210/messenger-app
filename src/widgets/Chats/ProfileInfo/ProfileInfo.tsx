import ProfilePicture from "../../../pages/Profile/helpers/ProfilePicture";
import { useAppStore } from "../../../store/store";
import { useState, useEffect } from "react";
import { HOST } from "../../../utils/constants";
import TooltipProfile from "./TooltipProfile";
import { useNavigate } from "react-router-dom";

export default function ProfileInfo() {
  const { userInfo } = useAppStore();
  const [profilePicture, setProfilePicture] = useState<string>("");
  const [isPictureSet, setIsPictureSet] = useState<boolean>(false);
  const [profileColor, setProfileColor] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    setProfileColor(userInfo.profileColor);

    if (userInfo.image) {
      setProfilePicture(`${HOST}/${userInfo.image}`);
      setIsPictureSet(true);
    } else {
      setProfilePicture("");
      setIsPictureSet(false);
    }
  }, [userInfo]);

  return (
    <>
      <div className="absolute bottom-0 h-16 flex items-center justify-between px-10 w-full bg-[#2a2b33]">
        <div className="flex gap-3 items-center justify-between">
          <div>
            <ProfilePicture
              profilePicture={profilePicture}
              profileColor={profileColor}
              isPictureSet={true}
            />
          </div>
          <div>
            <span className="text-lg">{userInfo.username}</span>
          </div>
        </div>
        <div className="flex gap-5 cursor-pointer">
          <TooltipProfile text="Edit profile" iconCode={0} />
          <TooltipProfile text="Sign out" iconCode={1} />
        </div>
      </div>
    </>
  );
}
