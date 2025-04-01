import UserData from "./helpers/UserData";
import ProfileColor from "./helpers/ProfileColor";
import ProfilePicture from "./helpers/ProfilePicture";
import { useAppStore } from "../../store/store";
import { USER_LABELS, PROFILE_COLORS } from "../../types/profile/profile";
import { useState } from "react";

export default function Profile() {
  const { userInfo } = useAppStore();
  const [profileColor, setProfileColor] = useState<string>("bg-black");
  const [isPictureSet, setIsPictureSet] = useState<boolean>(false);
  const USER_DATA = [userInfo.username, userInfo.firstName, userInfo.lastName];

  const saveChanges = async () => {}; // TO-DO: Write backend logic for changing the user data

  return (
    <>
      <div>
        <div className="w-75 flex flex-col items-center py-2  h-auto border-1 border-blue-200 rounded-md mx-auto">
          <div className="w-full border-b-1 border-b-gray-200 flex justify-center">
            <ProfilePicture
              profileColor={profileColor}
              isPictureSet={isPictureSet}
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            {USER_DATA.map((data, index) => {
              return (
                <UserData
                  key={index}
                  userData={data}
                  label={USER_LABELS[index]}
                />
              );
            })}
          </div>
          <div className="mt-8 w-2/3 mx-auto gap-2">
            <div>
              <p className="text-center text-gray-400 text-lg">
                Change profile color
              </p>
            </div>
            <div className="flex gap-2 mt-4 justify-center">
              {PROFILE_COLORS.map((color, index) => {
                return (
                  <ProfileColor
                    key={index}
                    color={color}
                    profileColor={profileColor}
                    setProfileColor={setProfileColor}
                  />
                );
              })}
            </div>
          </div>
          <div className="mt-8">
            <button
              onClick={() => saveChanges()}
              className="cursor-pointer rounded-lg bg-blue-500 text-white px-1 py-1"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
