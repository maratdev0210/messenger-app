import UserData from "./helpers/UserData";
import ProfileColor from "./helpers/ProfileColor";
import ProfilePicture from "./helpers/ProfilePicture";
import { useAppStore } from "../../store/store";
import { USER_LABELS, PROFILE_COLORS } from "../../types/profile/profile";
import { useEffect, useState, useRef } from "react";
import { HOST, UPDATE_PROFILE_ROUTE } from "../../utils/constants";
import { apiClient } from "../../lib/apiClient";
import Success from "../../widgets/Toasts/Success";

export default function Profile() {
  const { userInfo, setUserInfo } = useAppStore();
  const [profileColor, setProfileColor] = useState<string>("bg-black");
  const [isPictureSet, setIsPictureSet] = useState<boolean>(false);
  const [isProfileUpdated, setIsProfileUpdated] = useState<boolean>(false);
  const [profilePicture, setProfilePicture] = useState<string>("");

  const USER_DATA = [userInfo.username, userInfo.firstName, userInfo.lastName];

  console.log(userInfo);

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

  const saveChanges = async () => {
    try {
      const response = await apiClient.post(
        UPDATE_PROFILE_ROUTE,
        { profileColor },
        { withCredentials: true }
      );
      setIsProfileUpdated(true);
      setTimeout(() => {
        setIsProfileUpdated(false);
      }, 5000);
      if (response.status === 200 && response.data) {
        setUserInfo({ ...response.data });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isProfileUpdated && <Success message="Данные профиля обновлены" />}
      <div>
        <div className="w-75 flex flex-col items-center py-2  h-auto border-1 border-blue-200 rounded-md mx-auto">
          <div className="w-full border-b-1 border-b-gray-200 flex justify-center">
            <ProfilePicture
              profilePicture={profilePicture}
              profileColor={profileColor}
              isPictureSet={isPictureSet}
              canChange={true}
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            {USER_DATA.map((data, index) => {
              return (
                <UserData
                  key={index}
                  userData={data}
                  profileColor={profileColor}
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
