import { Plus, Trash } from "lucide-react";
import { useState, useRef } from "react";
import {
  ADD_PROFILE_IMAGE_ROUTE,
  REMOVE_PROFILE_IMAGE_ROUTE,
} from "../../../utils/constants";
import { apiClient } from "../../../lib/apiClient";
import { useAppStore } from "../../../store/store";

interface IProfilePicture {
  profilePicture: string;
  profileColor: string;
  isPictureSet: boolean;
}

const handleImageChange = async (event, setUserInfo: any, userInfo: any) => {
  const file = event.target.files[0];

  if (file) {
    const formData = new FormData();
    formData.append("profileImage", file);

    const response = await apiClient.post(ADD_PROFILE_IMAGE_ROUTE, formData, {
      withCredentials: true,
    });

    if (response.status === 200 && response.data.image) {
      setUserInfo({ ...userInfo, image: response.data.image });
    }
  }
};

const handleDeleteImage = async (setUserInfo: any, userInfo: any) => {
  try {
    const response = await apiClient.delete(REMOVE_PROFILE_IMAGE_ROUTE, {
      withCredentials: true,
    });

    if (response.status === 200) {
      setUserInfo({ ...userInfo, image: null });
    }
  } catch (error) {
    console.log(error);
  }
};

function IconDisplay({ isPictureSet }: { isPictureSet: boolean }) {
  const fileInputRef = useRef(null);
  const { userInfo, setUserInfo } = useAppStore();

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div
      onClick={
        isPictureSet
          ? () => handleDeleteImage(setUserInfo, userInfo)
          : handleFileInputClick
      }
      className="absolute top-1/2 translate-x-1/2 -translate-y-1/2"
    >
      {isPictureSet ? (
        <Trash className="text-white" />
      ) : (
        <Plus className="text-white" />
      )}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={(e) => handleImageChange(e, setUserInfo, userInfo)}
        name="profileImage"
        accept=".png, .jpg, .jpeg, .svg, .webp"
      />
    </div>
  );
}

export default function ProfilePicture({
  profilePicture,
  profileColor,
  isPictureSet,
}: IProfilePicture) {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  
  return (
    <>
      <div
        onMouseLeave={() => setIsHovered(false)}
        onMouseEnter={() => setIsHovered(true)}
        className={`${profileColor} ${isHovered ? "opacity-70 transition duration-300 ease-in-out" : ""} cursor-pointer relative size-12 mb-2 rounded-full `}
      >
        {isPictureSet && (
          <img className="size-full rounded-full" src={profilePicture} />
        )}
        {isHovered && <IconDisplay isPictureSet={isPictureSet} />}
      </div>
    </>
  );
}
